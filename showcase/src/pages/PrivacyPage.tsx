import Privacy from "../components/Privacy";
import { Link } from "react-router-dom";
import "./PrivacyPage.css";

function PrivacyPage() {
  return (
    <div className="privacy-page">
      <nav className="privacy-nav">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </nav>
      <Privacy />
    </div>
  );
}

export default PrivacyPage;
