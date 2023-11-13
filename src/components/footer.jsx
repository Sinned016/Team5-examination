import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer-items">
        <p className="footer-item">Om oss</p>
        <Link to="/contact" className="footer-item text-decoration-none text-primary">
          Kontakt</Link>
        <Link to="/location" className="footer-item text-decoration-none text-primary">
          Hitta hit
        </Link>
      </Container>
      <div className="text-center p-3">© Filmvisarna</div>
    </footer>
  );
}