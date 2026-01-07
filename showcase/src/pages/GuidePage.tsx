import { Link } from "react-router-dom";
import "./GuidePage.css";

function GuidePage() {
  return (
    <div className="guide-page">
      <nav className="guide-nav">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </nav>

      <main className="guide-content">
        <header className="guide-header">
          <h1>Kliply User Guide</h1>
          <p className="guide-subtitle">
            Complete instructions for getting the most out of your clipboard manager
          </p>
        </header>

        {/* Getting Started */}
        <section className="guide-section">
          <h2>🚀 Getting Started</h2>
          
          <div className="guide-card">
            <h3>Installation</h3>
            <ol>
              <li>Download Kliply from the <a href="https://github.com/Digital-Defiance/Kliply/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a> page or the Mac App Store</li>
              <li>Open the DMG file and drag Kliply to your Applications folder</li>
              <li>Launch Kliply from Applications or Spotlight</li>
              <li>Look for the clipboard icon (📋) in your menu bar</li>
            </ol>
          </div>

          <div className="guide-card">
            <h3>First-Time Setup</h3>
            
            <div className="setup-variant">
              <h4>📦 Direct Download Version</h4>
              <p>When you first launch Kliply, you'll be prompted to grant accessibility permissions:</p>
              <ol>
                <li>Click "Open System Settings" when prompted</li>
                <li>Navigate to <strong>Privacy & Security → Accessibility</strong></li>
                <li>Enable the toggle next to Kliply</li>
                <li>Kliply will automatically activate once permissions are granted</li>
              </ol>
            </div>

            <div className="setup-variant">
              <h4>🍎 App Store Version</h4>
              <p>Set up your keyboard shortcut (one-time setup):</p>
              <ol>
                <li>Open <strong>System Settings</strong></li>
                <li>Go to <strong>Keyboard → Keyboard Shortcuts</strong></li>
                <li>Select <strong>Services → General</strong></li>
                <li>Find <strong>"Show Kliply Clipboard"</strong> and click to add a shortcut</li>
                <li>Press your desired shortcut (recommended: <kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>V</kbd>)</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Basic Usage */}
        <section className="guide-section">
          <h2>📋 Basic Usage</h2>

          <div className="guide-card">
            <h3>How Kliply Works</h3>
            <p>
              Kliply runs quietly in your menu bar, automatically tracking everything you copy.
              When you need to access something you copied earlier, just press the hotkey to
              open the clipboard history popup.
            </p>
            <div className="workflow-steps">
              <div className="workflow-step">
                <span className="step-number">1</span>
                <span className="step-text">Copy anything (text, images, URLs, files)</span>
              </div>
              <div className="workflow-step">
                <span className="step-number">2</span>
                <span className="step-text">Press <kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>V</kbd> to open history</span>
              </div>
              <div className="workflow-step">
                <span className="step-number">3</span>
                <span className="step-text">Use arrow keys to select an item</span>
              </div>
              <div className="workflow-step">
                <span className="step-number">4</span>
                <span className="step-text">Press <kbd>Enter</kbd> to select</span>
              </div>
              <div className="workflow-step">
                <span className="step-number">5</span>
                <span className="step-text"><strong>Direct Download:</strong> Auto-pastes | <strong>App Store:</strong> Press <kbd>⌘</kbd> + <kbd>V</kbd></span>
              </div>
            </div>
          </div>

          <div className="guide-card">
            <h3>Supported Content Types</h3>
            <div className="content-types-grid">
              <div className="content-type">
                <span className="type-icon">📝</span>
                <strong>Plain Text</strong>
                <p>Regular text from any application</p>
              </div>
              <div className="content-type">
                <span className="type-icon">📄</span>
                <strong>Rich Text</strong>
                <p>Formatted text with styles preserved</p>
              </div>
              <div className="content-type">
                <span className="type-icon">🖼️</span>
                <strong>Images</strong>
                <p>Screenshots, copied images with thumbnails</p>
              </div>
              <div className="content-type">
                <span className="type-icon">🔗</span>
                <strong>URLs</strong>
                <p>Web links with automatic title fetching</p>
              </div>
              <div className="content-type">
                <span className="type-icon">📁</span>
                <strong>Files</strong>
                <p>File paths from Finder copies</p>
              </div>
            </div>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="guide-section">
          <h2>⌨️ Keyboard Shortcuts</h2>

          <div className="guide-card">
            <h3>Global Shortcuts</h3>
            <table className="shortcuts-table">
              <thead>
                <tr>
                  <th>Shortcut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>V</kbd></td>
                  <td>Open/close clipboard history popup</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="guide-card">
            <h3>Popup Navigation</h3>
            <table className="shortcuts-table">
              <thead>
                <tr>
                  <th>Shortcut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><kbd>↑</kbd> / <kbd>↓</kbd></td>
                  <td>Navigate through clipboard items</td>
                </tr>
                <tr>
                  <td><kbd>Enter</kbd></td>
                  <td>Select item (auto-paste on Direct Download, copy to clipboard on App Store)</td>
                </tr>
                <tr>
                  <td><kbd>⇧</kbd> + <kbd>Enter</kbd></td>
                  <td>Select as plain text (strips formatting)</td>
                </tr>
                <tr>
                  <td><kbd>Tab</kbd></td>
                  <td>Cycle through category filters</td>
                </tr>
                <tr>
                  <td><kbd>Delete</kbd></td>
                  <td>Remove selected item from history</td>
                </tr>
                <tr>
                  <td><kbd>Esc</kbd></td>
                  <td>Close popup without pasting</td>
                </tr>
                <tr>
                  <td><kbd>⌘</kbd> + <kbd>,</kbd></td>
                  <td>Open Settings</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Popup Window Features */}
        <section className="guide-section">
          <h2>🔍 Popup Window Features</h2>

          <div className="guide-card">
            <h3>Search</h3>
            <p>
              The search bar at the top of the popup lets you quickly find items in your history.
              Just start typing to filter results in real-time. Search is case-insensitive and
              works across all content types.
            </p>
            <div className="tip-box">
              <strong>💡 Tip:</strong> The search bar is automatically focused when you open
              the popup, so you can start typing immediately.
            </div>
          </div>

          <div className="guide-card">
            <h3>Category Filters</h3>
            <p>
              Use the filter pills below the search bar to show only specific types of content:
            </p>
            <ul className="filter-list">
              <li><strong>All</strong> — Shows all clipboard items</li>
              <li><strong>Text</strong> — Plain and rich text only</li>
              <li><strong>Images</strong> — Screenshots and copied images</li>
              <li><strong>URLs</strong> — Web links</li>
              <li><strong>Files</strong> — File paths</li>
            </ul>
            <p>Press <kbd>Tab</kbd> to quickly cycle through filters.</p>
          </div>

          <div className="guide-card">
            <h3>Item Preview</h3>
            <p>Each clipboard item shows:</p>
            <ul>
              <li>Content type icon (📝 text, 🖼️ image, 🔗 URL, 📁 file)</li>
              <li>Preview of the content (up to 3 lines for text)</li>
              <li>Content type label and relative timestamp</li>
            </ul>
            <p>Selected items are highlighted and show a delete button (×) on the right.</p>
          </div>
        </section>

        {/* Settings */}
        <section className="guide-section">
          <h2>⚙️ Settings</h2>
          <p className="section-intro">
            Access settings by clicking the Kliply menu bar icon and selecting "Settings..."
            or pressing <kbd>⌘</kbd> + <kbd>,</kbd> while the popup is open.
          </p>

          <div className="guide-card">
            <h3>General Settings</h3>
            <dl className="settings-list">
              <dt>History Depth</dt>
              <dd>
                Number of clipboard items to keep (1-100, default: 10).
                Higher values use more memory.
              </dd>
              
              <dt>Launch at Login</dt>
              <dd>
                Automatically start Kliply when you log in to your Mac.
              </dd>
              
              <dt>Always Paste as Plain Text</dt>
              <dd>
                When enabled, always strips formatting when pasting.
                Useful if you frequently paste into plain text fields.
              </dd>
              
              <dt>Move Selected Pastes to Top</dt>
              <dd>
                When enabled (default), pasting an item from history moves it to
                the top of the list, keeping frequently-used items easily accessible.
              </dd>
              
              <dt>Show Image Previews</dt>
              <dd>
                Display thumbnail previews for copied images in the history.
              </dd>
            </dl>
          </div>

          <div className="guide-card">
            <h3>Hotkey Settings</h3>
            <p>
              <strong>Direct Download version:</strong> Customize your global hotkey by clicking
              "Change" and pressing your desired key combination.
            </p>
            <p>
              <strong>App Store version:</strong> Follow the on-screen instructions to set up
              your shortcut via System Settings → Keyboard → Keyboard Shortcuts → Services.
            </p>
            <div className="tip-box">
              <strong>💡 Tip:</strong> Avoid shortcuts that conflict with common system or app
              shortcuts. <kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>V</kbd> works well because regular
              paste is <kbd>⌘</kbd> + <kbd>V</kbd>.
            </div>
          </div>

          <div className="guide-card">
            <h3>App Exclusions</h3>
            <p>
              Prevent sensitive apps from having their clipboard content recorded.
              This is essential for password managers and banking apps.
            </p>
            
            <h4>Auto-Detected Apps</h4>
            <p>
              Click "Detect Sensitive Apps" to automatically find common password managers
              and security apps installed on your Mac, including:
            </p>
            <ul className="app-list">
              <li>1Password</li>
              <li>LastPass</li>
              <li>Dashlane</li>
              <li>Bitwarden</li>
              <li>Keychain Access</li>
              <li>And more...</li>
            </ul>

            <h4>Manual Exclusion</h4>
            <p>
              Add apps manually by entering their name or bundle identifier
              (e.g., "com.agilebits.onepassword7").
            </p>
            
            <div className="warning-box">
              <strong>⚠️ Important:</strong> Clipboard changes from excluded apps are
              never recorded, keeping your passwords and sensitive data private.
            </div>
          </div>
        </section>

        {/* Menu Bar */}
        <section className="guide-section">
          <h2>📍 Menu Bar</h2>

          <div className="guide-card">
            <h3>Menu Bar Options</h3>
            <p>Click the clipboard icon (📋) in your menu bar to access:</p>
            <ul>
              <li><strong>Show Clipboard</strong> — Opens the clipboard history popup</li>
              <li><strong>Clear History</strong> — Removes all items from history</li>
              <li><strong>Settings...</strong> — Opens the settings window</li>
              <li><strong>Quit Kliply</strong> — Exits the application</li>
            </ul>
            <p>
              The menu also shows the current number of items in your history and any
              status messages (like permission requirements).
            </p>
          </div>
        </section>

        {/* Privacy */}
        <section className="guide-section">
          <h2>🔒 Privacy & Security</h2>

          <div className="guide-card">
            <h3>Your Data Stays Private</h3>
            <ul className="privacy-list">
              <li>
                <strong>Memory-only storage:</strong> All clipboard history is stored in RAM only.
                Nothing is ever written to disk.
              </li>
              <li>
                <strong>No data collection:</strong> Kliply doesn't collect any analytics or
                send any data over the network (except optional URL title fetching).
              </li>
              <li>
                <strong>Auto-clear on quit:</strong> Your entire clipboard history is cleared
                when you quit Kliply.
              </li>
              <li>
                <strong>App exclusions:</strong> Sensitive apps can be excluded so their
                clipboard data is never recorded.
              </li>
            </ul>
            <p>
              <Link to="/privacy">Read our full Privacy Policy →</Link>
            </p>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="guide-section">
          <h2>🔧 Troubleshooting</h2>

          <div className="guide-card">
            <h3>Hotkey Not Working?</h3>
            <div className="troubleshoot-item">
              <h4>Direct Download Version</h4>
              <ol>
                <li>Open <strong>System Settings → Privacy & Security → Accessibility</strong></li>
                <li>Make sure Kliply is in the list and enabled</li>
                <li>If it's enabled but not working, remove it and re-add it</li>
                <li>Restart Kliply</li>
              </ol>
            </div>
            <div className="troubleshoot-item">
              <h4>App Store Version</h4>
              <ol>
                <li>Open <strong>System Settings → Keyboard → Keyboard Shortcuts → Services</strong></li>
                <li>Find "Show Kliply Clipboard" under General</li>
                <li>Make sure a shortcut is assigned</li>
                <li>Try a different shortcut if there's a conflict</li>
              </ol>
            </div>
          </div>

          <div className="guide-card">
            <h3>Items Not Appearing in History?</h3>
            <ul>
              <li>Make sure Kliply is running (check for the icon in your menu bar)</li>
              <li>Check that the source app isn't in your exclusion list</li>
              <li>Verify the history depth setting isn't set too low</li>
              <li>Some apps use non-standard clipboard methods that may not be detected</li>
            </ul>
          </div>

          <div className="guide-card">
            <h3>Paste Not Working?</h3>
            <div className="troubleshoot-item">
              <h4>App Store Version</h4>
              <p>
                The App Store version copies your selection to the clipboard but <strong>does not auto-paste</strong> due to macOS sandbox restrictions.
                After selecting an item, press <kbd>⌘</kbd> + <kbd>V</kbd> to paste it into your app.
              </p>
            </div>
            <div className="troubleshoot-item">
              <h4>Direct Download Version</h4>
              <p>
                Auto-paste requires accessibility permissions. If paste isn't working:
              </p>
              <ol>
                <li>Open <strong>System Settings → Privacy & Security → Accessibility</strong></li>
                <li>Ensure Kliply is enabled</li>
                <li>If already enabled, try removing and re-adding it</li>
                <li>Restart Kliply</li>
              </ol>
            </div>
          </div>

          <div className="guide-card">
            <h3>Still Having Issues?</h3>
            <p>
              <a href="https://github.com/Digital-Defiance/Kliply/issues" target="_blank" rel="noopener noreferrer">
                Report an issue on GitHub →
              </a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="guide-footer">
          <p>
            Kliply is open source software released under the MIT License.
          </p>
          <div className="guide-footer-links">
            <a href="https://github.com/Digital-Defiance/Kliply" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/">Home</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default GuidePage;
