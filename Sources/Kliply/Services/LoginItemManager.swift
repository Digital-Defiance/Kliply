import Foundation
import ServiceManagement

/// Manages the app's login item status
@MainActor
class LoginItemManager {
    static let shared = LoginItemManager()
    
    private var service: SMAppService {
        SMAppService.mainApp
    }
    
    private init() {}
    
    /// Check if the app is registered as a login item
    func isEnabled() async -> Bool {
        return service.status == .enabled
    }
    
    /// Set the app's login item status
    /// - Parameter enabled: Whether to enable or disable launch at login
    func setLaunchAtLogin(_ enabled: Bool) async {
        do {
            if enabled {
                if service.status == .enabled {
                    // Already enabled
                    return
                }
                try service.register()
                #if DEBUG
                print("✅ Registered as login item")
                #endif
            } else {
                if service.status == .notRegistered {
                    // Already not registered
                    return
                }
                try await service.unregister()
                #if DEBUG
                print("✅ Unregistered from login items")
                #endif
            }
        } catch let error as NSError {
            // In sandbox/test environments, operations may fail with "Operation not permitted"
            // This is expected and not a critical error
            if error.domain == NSCocoaErrorDomain && error.code == NSFeatureUnsupportedError {
                #if DEBUG
                print("⚠️ Login item operation not permitted in current environment")
                #endif
            } else {
                print("⚠️ Could not update login item status: \(error.localizedDescription)")
            }
        }
    }
    
    /// Get the current status of the login item
    func getStatus() -> SMAppService.Status {
        return service.status
    }
}
