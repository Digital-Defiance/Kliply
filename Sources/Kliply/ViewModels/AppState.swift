import Foundation
import SwiftUI

/// Main application state manager
@Observable
@MainActor
class AppState {
    static let shared = AppState()
    
    // Services
    private let clipboardMonitor: ClipboardMonitor
    private let hotkeyManager = HotkeyManager()
    private let settings = AppSettings.shared
    
    // State
    var clipboardHistory: [ClipboardItem] = []
    var isPopupVisible: Bool = false
    var isAccessibilityPermissionGranted: Bool = false
    var selectedItemIndex: Int = 0
    var searchQuery: String = ""
    var selectedFilter: ContentFilter = .all
    var showSettings: Bool = false
    private var previousApp: NSRunningApplication?
    private var isPasting: Bool = false
    
    /// Whether the app is running in a sandboxed environment
    var isSandboxed: Bool {
        return ProcessInfo.processInfo.environment["APP_SANDBOX_CONTAINER_ID"] != nil
    }
    
    /// Whether auto-paste functionality is available
    var canAutoPaste: Bool {
        return !isSandboxed && isAccessibilityPermissionGranted
    }
    
    init() {
        self.clipboardMonitor = ClipboardMonitor(appSettings: settings)
        setupClipboardMonitor()
        setupHotkeyManager()
    }
    
    // Computed
    var filteredHistory: [ClipboardItem] {
        var items = clipboardHistory
        
        // Apply filter
        if selectedFilter != .all {
            items = items.filter { item in
                switch selectedFilter {
                case .text:
                    if case .text = item.content { return true }
                    if case .richText = item.content { return true }
                    return false
                case .images:
                    if case .image = item.content { return true }
                    return false
                case .urls:
                    if case .url = item.content { return true }
                    return false
                case .files:
                    if case .fileURLs = item.content { return true }
                    return false
                case .all:
                    return true
                }
            }
        }
        
        // Apply search
        if !searchQuery.isEmpty {
            items = items.filter { item in
                item.content.previewText.localizedCaseInsensitiveContains(searchQuery)
            }
        }
        
        return items
    }
    
    func start() {
        // In sandbox mode, auto-paste is disabled, but hotkeys can still be registered
        if isSandboxed {
            #if DEBUG
            print("Running in sandbox mode - auto-paste disabled, hotkeys enabled")
            #endif
            isAccessibilityPermissionGranted = false
            // Register hotkey without accessibility permission (allowed)
            registerHotkey()
        } else {
            // Check permissions for non-sandboxed builds
            isAccessibilityPermissionGranted = hotkeyManager.isPermissionGranted()
            
            if !isAccessibilityPermissionGranted {
                // This will trigger the permission prompt
                _ = hotkeyManager.checkAccessibilityPermissions()
                
                // Start polling for permission grant
                startPermissionPolling()
            } else {
                registerHotkey()
            }
        }
        
        // Clipboard monitoring works in both modes
        clipboardMonitor.startMonitoring()
    }
    
    func stop() {
        clipboardMonitor.stopMonitoring()
        hotkeyManager.unregisterHotkey()
    }
    
    private func setupClipboardMonitor() {
        clipboardMonitor.onClipboardChange = { [weak self] content in
            guard let self = self, let content = content else { return }
            Task { @MainActor in
                self.addToHistory(content: content)
            }
        }
    }
    
    private func setupHotkeyManager() {
        hotkeyManager.onHotkeyPressed = { [weak self] in
            Task { @MainActor in
                guard let self = self else { return }
                // Store the currently active app BEFORE opening popup
                let workspace = NSWorkspace.shared
                let frontmost = workspace.frontmostApplication
                #if DEBUG
                print("=== HOTKEY PRESSED ===")
                print("Frontmost app: \(frontmost?.localizedName ?? "nil")")
                print("Frontmost bundle: \(frontmost?.bundleIdentifier ?? "nil")")
                print("Our bundle: \(Bundle.main.bundleIdentifier ?? "nil")")
                #endif
                
                // Only store if it's not Kliply itself
                if let frontmost = frontmost, frontmost.bundleIdentifier != Bundle.main.bundleIdentifier {
                    self.previousApp = frontmost
                    #if DEBUG
                    print("Stored previous app: \(self.previousApp?.localizedName ?? "nil")")
                    #endif
                }
                
                self.togglePopup()
            }
        }
    }
    
    private func registerHotkey() {
        let success = hotkeyManager.registerHotkey(
            keyCode: settings.hotkeyKeyCode,
            modifiers: settings.hotkeyModifiers
        )
        
        #if DEBUG
        if success {
            print("Hotkey registered: \(settings.hotkeyDescription)")
        } else {
            print("Failed to register hotkey")
        }
        #endif
    }
    
    /// Update the hotkey registration with current settings
    /// Called when user changes the hotkey in settings
    func updateHotkey() {
        hotkeyManager.unregisterHotkey()
        registerHotkey()
    }
    
    private var permissionTimer: Timer?
        /// Temporarily disable the global hotkey (used during rebind capture)
        func suspendHotkey() {
            // Only relevant outside sandbox
            guard !isSandboxed else { return }
            hotkeyManager.unregisterHotkey()
        }

        /// Re-enable the global hotkey using current settings
        func resumeHotkey() {
            // Only relevant outside sandbox
            guard !isSandboxed else { return }
            _ = hotkeyManager.registerHotkey(
                keyCode: settings.hotkeyKeyCode,
                modifiers: settings.hotkeyModifiers
            )
        }
    
    private func startPermissionPolling() {
        permissionTimer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] _ in
            guard let self = self else { return }
            
            Task { @MainActor [weak self] in
                guard let self = self else { return }
                
                if self.hotkeyManager.isPermissionGranted() {
                    self.isAccessibilityPermissionGranted = true
                    self.registerHotkey()
                    self.stopPermissionPolling()
                }
            }
        }
    }
    
    private func stopPermissionPolling() {
        permissionTimer?.invalidate()
        permissionTimer = nil
    }
    
    func addToHistory(content: ClipboardContent) {
        let newItem = ClipboardItem(content: content)
        
        // Skip if it's a duplicate of the most recent item
        if let lastItem = clipboardHistory.first, lastItem.content == content {
            return
        }
        
        clipboardHistory.insert(newItem, at: 0)
        
        // Trim to history depth
        if clipboardHistory.count > settings.historyDepth {
            clipboardHistory.removeLast(clipboardHistory.count - settings.historyDepth)
        }
    }
    
    func togglePopup() {
        isPopupVisible.toggle()
        
        if isPopupVisible {
            selectedItemIndex = 0
            searchQuery = ""
        }
    }
    
    /// Close popup - window close and focus restoration happens in AppDelegate.hidePopup()
    func closePopup() {
        // Close the popup
        isPopupVisible = false
        
        // Notify AppDelegate to close window and restore focus
        NotificationCenter.default.post(name: Notification.Name("hidePopup"), object: nil)
    }
    
    func storePreviousAppAndToggle(_ app: NSRunningApplication?) {
        previousApp = app
        #if DEBUG
        print("storePreviousAppAndToggle: Stored \(app?.localizedName ?? "nil")")
        #endif
        togglePopup()
    }
    
    func updatePreviousApp(_ app: NSRunningApplication) {
        #if DEBUG
        print("updatePreviousApp: Changing from \(previousApp?.localizedName ?? "nil") to \(app.localizedName ?? "nil")")
        #endif
        previousApp = app
    }
    
    /// Reactivates the previously frontmost app to preserve user focus
    func restoreFocusToPreviousApp() {
        if let prevApp = previousApp {
            #if DEBUG
            print("restoreFocusToPreviousApp: Activating \(prevApp.localizedName ?? "unknown")")
            #endif
            let success = prevApp.activate()
            #if DEBUG
            print("restoreFocusToPreviousApp: activate returned \(success)")
            #endif
        } else {
            #if DEBUG
            print("restoreFocusToPreviousApp: previousApp is nil!")
            #endif
        }
    }
    
    /// For debugging: get the name of the previous app
    func getPreviousAppName() -> String {
        return previousApp?.localizedName ?? "nil"
    }
    
    func selectItem(at index: Int) {
        #if DEBUG
        print("selectItem called with index: \(index)")
        print("selectItem: previousApp = \(previousApp?.localizedName ?? "nil")")
        #endif
        guard index < filteredHistory.count else {
            return
        }
        let item = filteredHistory[index]
        #if DEBUG
        print("Selected item: \(item.content.previewText.prefix(50))")
        #endif
        
        // Write to clipboard
        clipboardMonitor.writeToClipboard(item.content)
        
        // Move item to top of history if setting is enabled
        if settings.moveSelectedPastesToTop {
            moveItemToTop(item)
        }
        
        // Check if we can auto-paste (not sandboxed and has accessibility permission)
        let shouldPaste = canAutoPaste
        
        // Close popup - focus restoration happens in hidePopup
        isPopupVisible = false
        NotificationCenter.default.post(name: Notification.Name("hidePopup"), object: nil)
        #if DEBUG
        print("Popup closed, will paste: \(shouldPaste)")
        #endif

        // Trigger paste for download build when permitted
        if shouldPaste {
            simulatePaste()
        }
    }
    
    /// Moves an item to the top of the clipboard history
    private func moveItemToTop(_ item: ClipboardItem) {
        guard let currentIndex = clipboardHistory.firstIndex(where: { $0.id == item.id }) else { return }
        guard currentIndex > 0 else { return } // Already at top
        
        clipboardHistory.remove(at: currentIndex)
        clipboardHistory.insert(item, at: 0)
        #if DEBUG
        print("Moved item to top of history")
        #endif
    }
    
    func clearHistory() {
        clipboardHistory.removeAll()
    }
    
    func removeItem(at index: Int) {
        guard index < clipboardHistory.count else { return }
        clipboardHistory.remove(at: index)
    }
    
    private func simulatePaste() {
        // Prevent multiple simultaneous paste operations
        guard !isPasting else {
            return
        }
        
        isPasting = true
        #if DEBUG
        print("simulatePaste: Starting paste sequence")
        #endif
        
        // If we have a previous app, activate it first
        if let prevApp = previousApp {
            #if DEBUG
            print("simulatePaste: Activating \(prevApp.localizedName ?? "unknown") (bundle: \(prevApp.bundleIdentifier ?? "nil"))")
            #endif
            
            // Use activate to bring app to foreground
            prevApp.activate()
            
            // Wait longer for activation and window focus, then paste using CGEvent
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in
                #if DEBUG
                print("simulatePaste: Executing paste command")
                let currentFrontmost = NSWorkspace.shared.frontmostApplication
                print("simulatePaste: Current frontmost app: \(currentFrontmost?.localizedName ?? "nil")")
                #endif
                
                // Use CGEvent to simulate Cmd+V (more reliable than AppleScript)
                let source = CGEventSource(stateID: .hidSystemState)
                
                // Key code 0x09 is 'V'
                let keyVDown = CGEvent(keyboardEventSource: source, virtualKey: 0x09, keyDown: true)
                keyVDown?.flags = .maskCommand
                keyVDown?.post(tap: .cghidEventTap)
                
                let keyVUp = CGEvent(keyboardEventSource: source, virtualKey: 0x09, keyDown: false)
                keyVUp?.flags = .maskCommand
                keyVUp?.post(tap: .cghidEventTap)
                #if DEBUG
                print("Paste command sent via CGEvent")
                #endif
                
                // Reset pasting flag
                self?.isPasting = false
            }
        } else {
            isPasting = false
        }
    }
}

enum ContentFilter: String, CaseIterable {
    case all = "All"
    case text = "Text"
    case images = "Images"
    case urls = "URLs"
    case files = "Files"
}
