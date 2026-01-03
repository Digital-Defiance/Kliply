import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaShieldAlt,
  FaMemory,
  FaNetworkWired,
  FaLock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import "./Privacy.css";

const Privacy = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="privacy section" id="privacy" ref={ref}>
      <motion.div
        className="privacy-container"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          Privacy <span className="gradient-text">First</span>
        </h2>
        <p className="privacy-subtitle">
          Your clipboard history stays private. Always.
        </p>

        <div className="privacy-hero card">
          <FaShieldAlt className="privacy-icon" />
          <h3>Complete Data Privacy</h3>
          <p className="privacy-hero-text">
            All clipboard data is stored <strong>in memory only</strong>. No
            disk writes, no network transmission, no third-party access. When
            you quit Kliply, your clipboard history is permanently gone.
          </p>
        </div>

        <div className="privacy-grid">
          <motion.div
            className="privacy-card card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="privacy-card-header">
              <FaMemory className="privacy-card-icon" />
              <h3>Memory-Only Storage</h3>
            </div>
            <ul className="privacy-list">
              <li>
                <FaCheckCircle className="check-icon" />
                All data stored in RAM
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                No disk persistence
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                Deleted on app quit
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                No database files
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="privacy-card card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="privacy-card-header">
              <FaNetworkWired className="privacy-card-icon" />
              <h3>Zero Network Access</h3>
            </div>
            <ul className="privacy-list">
              <li>
                <FaCheckCircle className="check-icon" />
                No internet connection
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                No cloud sync
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                No data transmission
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                Works 100% offline
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="privacy-card card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="privacy-card-header">
              <FaLock className="privacy-card-icon" />
              <h3>Required Permissions</h3>
            </div>
            <ul className="privacy-list">
              <li>
                <FaCheckCircle className="check-icon" />
                <strong>Accessibility:</strong> For global hotkey
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                <strong>Clipboard:</strong> To monitor changes
              </li>
              <li className="no-permission">
                <FaTimesCircle className="times-icon" />
                No location access
              </li>
              <li className="no-permission">
                <FaTimesCircle className="times-icon" />
                No contacts access
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="privacy-guarantees card"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3>What We DON'T Collect</h3>
          <div className="guarantees-grid">
            <div className="guarantee-item">
              <FaTimesCircle className="times-icon" />
              <span>No personal information</span>
            </div>
            <div className="guarantee-item">
              <FaTimesCircle className="times-icon" />
              <span>No usage analytics</span>
            </div>
            <div className="guarantee-item">
              <FaTimesCircle className="times-icon" />
              <span>No crash reports</span>
            </div>
            <div className="guarantee-item">
              <FaTimesCircle className="times-icon" />
              <span>No advertising data</span>
            </div>
            <div className="guarantee-item">
              <FaTimesCircle className="times-icon" />
              <span>No third-party trackers</span>
            </div>
            <div className="guarantee-item">
              <FaTimesCircle className="times-icon" />
              <span>No telemetry</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="privacy-cta card"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3>Open Source Transparency</h3>
          <p>
            Don't take our word for it. Kliply is fully open source. Review the
            code yourself and verify our privacy practices.
          </p>
          <a
            href="https://github.com/digitaldefiance/kliply"
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source Code
          </a>
        </motion.div>

        <div className="privacy-footer">
          <p>
            <strong>Last Updated:</strong> January 3, 2026
          </p>
          <p>
            Questions? Contact us or read our{" "}
            <a
              href="https://github.com/digitaldefiance/kliply/blob/main/PRIVACY_POLICY.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              full privacy policy
            </a>
            .
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Privacy;
