import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaHeart,
  FaCode,
  FaUsers,
  FaRocket,
  FaLightbulb,
} from "react-icons/fa";
import "./About.css";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="about section" id="about" ref={ref}>
      <motion.div
        className="about-container"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          Built with <span className="gradient-text">❤️</span> by Digital
          Defiance
        </h2>
        <p className="about-subtitle">
          Open source excellence in AI development tools
        </p>

        <div className="about-content">
          <motion.div
            className="about-main card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="about-heading">
              <FaRocket /> Our Mission
            </h3>
            <p>
              At <strong>Digital Defiance</strong>, we believe in empowering
              users with tools that enhance productivity and improve daily
              workflows through thoughtful design and intelligent automation.
            </p>
            <p>
              We've built <strong>Kliply</strong> to bring the beloved Windows
              clipboard history feature (Win+V) to macOS—complete with instant
              search, smart tracking, keyboard-first navigation, rich previews,
              and privacy-focused design that never writes to disk.
            </p>
            <p className="highlight-text">
              <FaCode /> <strong>100% Open Source.</strong> Kliply is freely
              available under the MIT License. We believe in empowering the
              entire Mac community.
            </p>

            <div className="version-comparison">
              <h4>📥 Choose Your Version</h4>
              <div className="comparison-table">
                <div className="comparison-row header">
                  <div className="col-label"></div>
                  <div className="col-github"><strong>GitHub Version</strong></div>
                  <div className="col-appstore"><strong>App Store</strong></div>
                </div>
                <div className="comparison-row">
                  <div className="col-label">Auto-Paste</div>
                  <div className="col-github">✓ Full auto-paste</div>
                  <div className="col-appstore">Copy to clipboard</div>
                </div>
                <div className="comparison-row">
                  <div className="col-label">Global Hotkey</div>
                  <div className="col-github">✓ Direct hotkey</div>
                  <div className="col-appstore">Services menu</div>
                </div>
                <div className="comparison-row">
                  <div className="col-label">Direct Download</div>
                  <div className="col-github">✓ GitHub Releases</div>
                  <div className="col-appstore">Mac App Store</div>
                </div>
              </div>
              <p className="comparison-note">
                Both versions offer the same core clipboard history, search, and privacy features.
                The GitHub version includes enhanced automation for power users, while the App Store
                version provides additional sandbox security and system integration.
              </p>
            </div>
          </motion.div>

          <div className="about-features">
            <motion.div
              className="feature-card card"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="feature-icon">
                <FaHeart />
              </div>
              <h4>Open Source First</h4>
              <p>
                MIT licensed and community-driven. Every line of code is open
                for inspection, improvement, and contribution.
              </p>
            </motion.div>

            <motion.div
              className="feature-card card"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="feature-icon">
                <FaCode />
              </div>
              <h4>Enterprise Quality</h4>
              <p>
                Built with Swift 6 and SwiftUI for native macOS performance.
                Code signed, notarized, and tested for reliability.
              </p>
            </motion.div>

            <motion.div
              className="feature-card card"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="feature-icon">
                <FaUsers />
              </div>
              <h4>Community Driven</h4>
              <p>
                Built for Mac users, by Mac users. We listen to feedback and
                continuously improve based on real-world needs.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="about-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3>Join the Community</h3>
          <p>
            Help us make the best clipboard manager for macOS. Contribute to
            Kliply, report issues, or star us on GitHub to show your support.
          </p>
          <div className="cta-buttons">
            <a
              href="https://digitaldefiance.org"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <FaLightbulb />
              Learn More
            </a>
            <a
              href="https://github.com/Digital-Defiance"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <FaGithub />
              Visit Digital Defiance on GitHub
            </a>
            <a
              href="https://github.com/Digital-Defiance/Kliply"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <FaCode />
              Contribute to Kliply
            </a>
          </div>
        </motion.div>

        <div className="about-footer">
          <p>
            © {new Date().getFullYear()} Digital Defiance. Made with{" "}
            <span className="heart">❤️</span> for the Mac community.
          </p>
          <p className="footer-links">
            <a
              href="https://github.com/Digital-Defiance/Kliply/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT License
            </a>
            {" • "}
            <Link to="/privacy">Privacy Policy</Link>
            {" • "}
            <a
              href="https://github.com/Digital-Defiance/Kliply"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            {" • "}
            <a
              href="https://github.com/Digital-Defiance/Kliply/releases"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
