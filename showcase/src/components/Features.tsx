import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub } from "react-icons/fa";
import "./Features.css";

interface Feature {
  title: string;
  description: string;
  icon: string;
  tech: string[];
  github?: string;
  npm?: string;
  stats?: {
    tests?: string;
    coverage?: string;
  };
  highlights: string[];
  category:
    | "Core"
    | "Interface"
    | "Privacy"
    | "Productivity";
}

const features: Feature[] = [
  {
    title: "Global Hotkey Access",
    icon: "🔥",
    description:
      "Instant access to your clipboard history with Cmd+Shift+V from anywhere in macOS. Customizable hotkey integration using Carbon API with accessibility permissions.",
    tech: [
      "Carbon API",
      "Global Hotkeys",
      "Accessibility",
      "Event Handler",
    ],
    category: "Core",
    highlights: [
      "System-wide hotkey (Cmd+Shift+V by default)",
      "Works across all applications",
      "Customizable keyboard shortcut",
      "Requires accessibility permissions for security",
      "Instant popup activation from any context",
    ],
  },
  {
    title: "Smart Clipboard Tracking",
    icon: "📋",
    description:
      "Automatically captures text, rich text, images, URLs, and files as you copy them. Intelligent deduplication prevents repeated entries and keeps your history clean.",
    tech: [
      "NSPasteboard",
      "NSImage",
      "NSURL",
      "Change Monitoring",
    ],
    category: "Core",
    highlights: [
      "Captures text, rich text, images, URLs, and file paths",
      "Automatic deduplication of repeated copies",
      "Preserves original content formatting",
      "Real-time monitoring with efficient polling",
      "Configurable history depth (default: 10 items)",
    ],
  },
  {
    title: "Instant Search",
    icon: "🔍",
    description:
      "Find any clipboard item instantly with fast, case-insensitive search. Search works across all content types including text within images and URL titles.",
    tech: [
      "Real-time Filtering",
      "Case-insensitive",
      "Multi-field Search",
    ],
    category: "Interface",
    highlights: [
      "Real-time search as you type",
      "Searches across all clipboard content",
      "Case-insensitive matching",
      "Works with text, URLs, and file names",
      "Instant results with no lag",
    ],
  },
  {
    title: "Category Filters",
    icon: "🏷️",
    description:
      "Filter your clipboard history by content type: All, Text, Images, URLs, or Files. Quick pills at the top let you instantly focus on what you need.",
    tech: [
      "Type Detection",
      "Filter Pills",
      "Tab Navigation",
    ],
    category: "Interface",
    highlights: [
      "Five filter categories: All, Text, Images, URLs, Files",
      "Visual pill indicators for active filter",
      "Tab key cycles through filters",
      "Instant filtering without delays",
      "Preserves search while filtering",
    ],
  },
  {
    title: "Keyboard Navigation",
    icon: "⌨️",
    description:
      "Complete keyboard-first interface. Navigate with arrow keys, select with Enter, paste as plain text with Shift+Enter, delete items, and close with Esc.",
    tech: [
      "Arrow Keys",
      "Enter/Return",
      "Modifier Keys",
      "Delete Key",
    ],
    category: "Interface",
    highlights: [
      "↑/↓ arrow keys navigate items",
      "Enter pastes and closes popup",
      "Shift+Enter pastes as plain text",
      "Delete key removes selected item",
      "Esc closes popup without pasting",
      "Tab cycles through category filters",
    ],
  },
  {
    title: "Rich Previews",
    icon: "🎨",
    description:
      "Beautiful previews for all content types. See image thumbnails, formatted text with syntax highlighting, URL metadata with favicons, and file type indicators.",
    tech: [
      "SwiftUI",
      "NSImage",
      "URL Metadata",
      "Custom Views",
    ],
    category: "Interface",
    highlights: [
      "Image thumbnails with proper scaling",
      "Rich text with formatting preserved",
      "URL titles fetched automatically",
      "File path indicators with icons",
      "Dark mode support throughout",
    ],
  },
  {
    title: "Smart Paste",
    icon: "🎯",
    description:
      "Automatically returns focus to your previous application and pastes the selected content. Tracks window focus changes to ensure paste goes to the right place.",
    tech: [
      "NSWorkspace",
      "App Tracking",
      "AppleScript",
      "Focus Management",
    ],
    category: "Productivity",
    highlights: [
      "Remembers your previous application",
      "Automatically switches focus back",
      "Simulates paste with Cmd+V",
      "Updates target when you click elsewhere",
      "Prevents multiple simultaneous pastes",
    ],
  },
  {
    title: "Smart App Exclusions",
    icon: "🛡️",
    description:
      "Auto-detect and exclude password managers and sensitive apps from clipboard monitoring. Keep your passwords, authentication codes, and banking info completely private.",
    tech: [
      "App Detection",
      "NSWorkspace",
      "Bundle ID Matching",
      "User Preferences",
    ],
    category: "Privacy",
    highlights: [
      "Auto-detect 1Password, LastPass, Dashlane, Bitwarden, and more",
      "Exclude browsers, authenticators, and dev tools",
      "Manually add apps by name or bundle ID",
      "Clipboard changes from excluded apps never recorded",
      "Persistent exclusion list across app restarts",
    ],
  },
  {
    title: "Privacy-Focused Design",
    icon: "🔒",
    description:
      "All clipboard history stored in memory only—nothing written to disk. No analytics, no tracking, no network requests (except optional URL title fetching). History clears on quit.",
    tech: [
      "In-Memory Storage",
      "No Disk Writes",
      "No Analytics",
      "Privacy First",
    ],
    category: "Privacy",
    highlights: [
      "100% in-memory storage—no disk writes",
      "History cleared automatically on app quit",
      "No analytics or user tracking",
      "Optional URL title fetching only",
      "Full PrivacyInfo.xcprivacy disclosure",
    ],
  },
  {
    title: "Menu Bar Integration",
    icon: "📍",
    description:
      "Clean menu bar presence with clipboard icon. Access Show Clipboard, Clear History, Settings, and Quit actions. Uses NSMenu for reliability in accessory apps.",
    tech: [
      "NSMenu",
      "NSStatusItem",
      "Menu Bar Extra",
      "AppKit",
    ],
    category: "Interface",
    highlights: [
      "Unobtrusive clipboard icon in menu bar",
      "Show Clipboard History command",
      "Clear History with one click",
      "Settings window access (Cmd+,)",
      "Quit application option",
    ],
  },
  {
    title: "Swift 6 & Modern macOS",
    icon: "⚡",
    description:
      "Built with Swift 6.2 and SwiftUI for modern macOS. Strict concurrency for thread safety, @Observable for reactive state, and native APIs for optimal performance.",
    tech: [
      "Swift 6.2",
      "SwiftUI",
      "Strict Concurrency",
      "macOS 13.0+",
    ],
    category: "Core",
    highlights: [
      "Swift 6 strict concurrency compliance",
      "@Observable for reactive state management",
      "SwiftUI for native interface",
      "Universal binary (Apple Silicon + Intel)",
      "Code signed and notarized for security",
    ],
  },
];

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="features section" id="features" ref={ref}>
      <motion.div
        className="features-container"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          Key <span className="gradient-text">Features</span>
        </h2>
        <p className="features-subtitle">
          A powerful clipboard manager that brings Windows Win+V functionality to macOS
        </p>

        <motion.div
          className="suite-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>
            Supercharge your productivity with{" "}
            <em>instant clipboard access</em>, <em>smart search</em>,
            and <em>keyboard-first navigation</em>
          </h3>
          <p>
            <strong>
              Kliply brings the beloved Windows clipboard history feature to macOS.
            </strong>{" "}
            Never lose copied content again—access your full clipboard history with a single hotkey,
            search through it instantly, and paste exactly what you need with{" "}
            <strong>keyboard navigation</strong> and{" "}
            <strong>rich previews</strong>.
          </p>
          <div className="problem-solution">
            <div className="problem">
              <h4>❌ The Problem: Lost Clipboard History</h4>
              <ul>
                <li>Copy something important, then accidentally copy over it</li>
                <li>Need to switch between multiple copied items</li>
                <li>Can't remember what you copied 5 minutes ago</li>
                <li>No way to search through previous clipboard content</li>
                <li>Images and formatted text lost after next copy</li>
              </ul>
              <p>
                <strong>Result:</strong> You waste time re-copying content and
                lose productivity switching between apps.
              </p>
            </div>
            <div className="solution">
              <h4>✅ The Solution: Kliply Clipboard History</h4>
              <p>
                <strong>Kliply</strong> automatically tracks everything you copy—text,
                images, URLs, files—and lets you access it all with{" "}
                <strong>Cmd+Shift+V</strong>. Search instantly, filter by type,
                navigate with keyboard, and paste to the right place every time.
              </p>
              <p>
                Built with Swift 6 and SwiftUI for native macOS performance.
                Privacy-focused with <strong>in-memory storage</strong> only—no
                disk writes, no tracking, no analytics. Just fast, reliable
                clipboard management.
              </p>
            </div>
          </div>
          <div className="value-props">
            <div className="value-prop">
              <strong>🔥 Global Hotkey</strong>
              <p>
                Instant access with Cmd+Shift+V from anywhere in macOS
              </p>
            </div>
            <div className="value-prop">
              <strong>📋 Smart Tracking</strong>
              <p>
                Captures text, images, URLs, and files automatically with deduplication
              </p>
            </div>
            <div className="value-prop">
              <strong>🔍 Instant Search</strong>
              <p>
                Find any clipboard item in milliseconds with real-time filtering
              </p>
            </div>
            <div className="value-prop">
              <strong>🔒 Privacy First</strong>
              <p>
                All history in memory only—no disk writes, no tracking, clears on quit
              </p>
            </div>
          </div>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="feature-header">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <span
                  className={`feature-badge ${feature.category.toLowerCase()}`}
                >
                  {feature.category}
                </span>
              </div>

              <p className="feature-description">{feature.description}</p>

              <ul className="feature-highlights">
                {feature.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>

              <div className="feature-tech">
                {feature.tech.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              {feature.github && (
                <div className="feature-links">
                  <a
                    href={feature.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="feature-link"
                  >
                    <FaGithub />
                    GitHub
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
