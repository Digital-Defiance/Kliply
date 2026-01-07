import SwiftUI
import AppKit

extension Notification.Name {
    static let hidePopup = Notification.Name("hidePopup")
}

@main
struct KliplyApp: App {
    @State private var appState = AppState.shared
    @State private var settings = AppSettings.shared
    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    
    var body: some Scene {
        // Menu Bar App - no main window
        MenuBarExtra("Kliply", systemImage: "clipboard") {
            MenuBarView()
                .environment(appState)
                .environment(settings)
        }
        .menuBarExtraStyle(.menu)
        
        // Settings window - use AppDelegate to set window level on older macOS
        Settings {
            SettingsView()
                .environment(settings)
        }
    }
}

@MainActor
class AppDelegate: NSObject, NSApplicationDelegate {
    var popupWindow: NSWindow?
    private var windowLevelTimer: Timer?
    private var lastFrontmostApp: NSRunningApplication?
    
    func applicationDidFinishLaunching(_ notification: Notification) {
        // Start the app state
        AppState.shared.start()
        
        // Hide from Dock
        NSApp.setActivationPolicy(.accessory)
        
        // Register for Services menu
        NSApp.servicesProvider = self
        NSUpdateDynamicServices()
        
        // Monitor for popup visibility changes
        setupPopupMonitoring()
        
        // Monitor all windows to set proper level for settings
        setupWindowLevelMonitoring()
        
        // Track app activation to capture the previously frontmost app
        setupAppActivationTracking()
        #if DEBUG
        print("applicationDidFinishLaunching: App started")
        #endif
        
        // Observe hidePopup notification
        NotificationCenter.default.addObserver(
            forName: .hidePopup,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            Task { @MainActor in
                self?.hidePopup()
            }
        }
    }
    
    private func setupAppActivationTracking() {
        // Seed with current frontmost app
        let currentFrontmost = NSWorkspace.shared.frontmostApplication
        self.lastFrontmostApp = currentFrontmost
        #if DEBUG
        print("setupAppActivationTracking: Current frontmost = \(currentFrontmost?.localizedName ?? "nil")")
        #endif
        
        // Listen for when apps become active
        NotificationCenter.default.addObserver(
            forName: NSWorkspace.didActivateApplicationNotification,
            object: NSWorkspace.shared,
            queue: .main
        ) { [weak self] notification in
            guard let self = self else { return }
            
            if let app = notification.userInfo?[NSWorkspace.applicationUserInfoKey] as? NSRunningApplication {
                #if DEBUG
                print("didActivateApplicationNotification: \(app.localizedName ?? "unknown")")
                #endif
                // Store ANY app that isn't Kliply as the potential previous app
                if app.bundleIdentifier != Bundle.main.bundleIdentifier {
                    self.lastFrontmostApp = app
                    #if DEBUG
                    print("Updating lastFrontmostApp to: \(app.localizedName ?? "unknown")")
                    #endif
                }
            }
        }
        #if DEBUG
        print("setupAppActivationTracking: Observer registered")
        #endif
    }
    
    /// Services menu handler invoked from the Services menu.
    @objc func showClipboardHistory(_ pboard: NSPasteboard, userData: String, error: AutoreleasingUnsafeMutablePointer<NSString?>) {
        // Use the tracked frontmost app
        #if DEBUG
        print("=== SERVICE HANDLER CALLED ===")
        print("showClipboardHistory: lastFrontmostApp = \(lastFrontmostApp?.localizedName ?? "nil")")
        #endif
        if let prevApp = lastFrontmostApp, 
           prevApp.bundleIdentifier != Bundle.main.bundleIdentifier {
            #if DEBUG
            print("showClipboardHistory: Storing previous app: \(prevApp.localizedName ?? "nil")")
            #endif
            AppState.shared.updatePreviousApp(prevApp)
        }
        
        // Show the popup
        DispatchQueue.main.async {
            if !AppState.shared.isPopupVisible {
                AppState.shared.togglePopup()
            }
        }
    }
    
    func applicationWillTerminate(_ notification: Notification) {
        AppState.shared.stop()
    }
    
    private func setupPopupMonitoring() {
        Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { [weak self] timer in
            guard self != nil else {
                timer.invalidate()
                return
            }
            
            Task { @MainActor [weak self] in
                guard let self = self else { return }
                let shouldShow = AppState.shared.isPopupVisible
                
                if shouldShow && self.popupWindow == nil {
                    self.showPopup()
                } else if !shouldShow && self.popupWindow != nil {
                    self.hidePopup()
                }
            }
        }
    }
    
    private func setupWindowLevelMonitoring() {
        windowLevelTimer = Timer.scheduledTimer(withTimeInterval: 0.5, repeats: true) { [weak self] timer in
            guard self != nil else {
                timer.invalidate()
                return
            }
            
            Task { @MainActor in
                // Find and update all Settings windows
                for window in NSApplication.shared.windows {
                    // Check if this is a Settings window by looking for typical settings window characteristics
                    if window.title.contains("Settings") || window.title.contains("Preferences") {
                        if window.level != .floating {
                            window.level = .floating
                        }
                    }
                }
            }
        }
    }
    
    @MainActor
    private func showPopup() {
        #if DEBUG
        print("=== showPopup() called ===")
        #endif
        let contentView = PopupWindow()
            .environment(AppState.shared)
        
        let hostingController = NSHostingController(rootView: contentView)
        
        // Create a normal window that will activate
        let window = NSWindow(contentViewController: hostingController)
        window.styleMask = [.titled, .closable, .fullSizeContentView]
        window.titlebarAppearsTransparent = true
        window.titleVisibility = .hidden
        window.isMovableByWindowBackground = true
        window.backgroundColor = NSColor.windowBackgroundColor
        window.isOpaque = true
        
        // Appear above fullscreen apps
        window.level = NSWindow.Level(rawValue: Int(CGWindowLevelForKey(.screenSaverWindow)) - 1)
        window.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .stationary, .ignoresCycle]
        window.hidesOnDeactivate = false
        
        // Center on the screen where the mouse currently is
        let mouseLocation = NSEvent.mouseLocation
        let targetScreen = NSScreen.screens.first { NSMouseInRect(mouseLocation, $0.frame, false) } ?? NSScreen.main
        
        if let screen = targetScreen {
            let screenRect = screen.visibleFrame
            let windowRect = window.frame
            let x = screenRect.midX - windowRect.width / 2
            let y = screenRect.midY - windowRect.height / 2
            window.setFrameOrigin(NSPoint(x: x, y: y))
        }
        
        self.popupWindow = window
        
        // Show and activate
        window.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
        #if DEBUG
        print("Popup window shown and activated")
        #endif
        
    }
    
    @MainActor
    private func hidePopup() {
        #if DEBUG
        print("hidePopup: Closing window")
        #endif
        popupWindow?.close()
        popupWindow = nil
        NSApp.deactivate()
        #if DEBUG
        print("hidePopup: previousApp = \(AppState.shared.getPreviousAppName())")
        print("hidePopup: Deactivating Kliply")
        #endif
        AppState.shared.restoreFocusToPreviousApp()
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.05) {
            #if DEBUG
            print("hidePopup: Restoring focus immediately")
            #endif
            AppState.shared.restoreFocusToPreviousApp()
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            #if DEBUG
            print("hidePopup: Second focus restore attempt")
            #endif
            if NSApp.isActive {
                NSApp.deactivate()
                AppState.shared.restoreFocusToPreviousApp()
            }
        }
    }
}

struct MenuBarView: View {
    @Environment(AppState.self) private var appState
    @Environment(\.openSettings) private var openSettings
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Button("Show Clipboard") {
                appState.togglePopup()
            }
            .keyboardShortcut("v", modifiers: [.command, .shift])
            
            Divider()
            
            if appState.clipboardHistory.isEmpty {
                Text("No History")
                    .foregroundStyle(.secondary)
                    .padding(.horizontal)
            } else {
                Text("\(appState.clipboardHistory.count) items in history")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal)
                
                Button("Clear History") {
                    appState.clearHistory()
                }
                .disabled(appState.clipboardHistory.isEmpty)
            }
            
            Divider()
            
            Button("Settings...") {
                NSApp.activate(ignoringOtherApps: true)
                openSettings()
            }
            .keyboardShortcut(",")
            
            Divider()
            
            // Show appropriate message based on mode
            if appState.isSandboxed {
                VStack(alignment: .leading, spacing: 4) {
                    HStack {
                        Image(systemName: "keyboard")
                            .foregroundStyle(.blue)
                        Text("Set up keyboard shortcut")
                            .font(.caption)
                    }
                    Text("Go to Settings → Hotkey")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                }
                .padding(.horizontal)
                
                Divider()
            } else if !appState.isAccessibilityPermissionGranted {
                HStack {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .foregroundStyle(.yellow)
                    Text("Accessibility permission required")
                        .font(.caption)
                }
                .padding(.horizontal)
                
                Divider()
            }
            
            Button("Quit Kliply") {
                NSApplication.shared.terminate(nil)
            }
            .keyboardShortcut("q")
        }
        .padding(.vertical, 4)
    }
}
