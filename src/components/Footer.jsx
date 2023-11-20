import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer-items">
      <Link to="/om-oss" className="footer-item text-decoration-none text-primary">
          Om oss</Link>
        <Link to="/kontakt" className="footer-item text-decoration-none text-primary">
          Kontakt</Link>
        <Link to="/hitta-hit" className="footer-item text-decoration-none text-primary">
          Hitta hit
        </Link>
      </Container>
      <div className="text-center pb-3">© Filmvisarna</div>
    </footer>
  );
}
