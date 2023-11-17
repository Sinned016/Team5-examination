import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer-items">
      <Link to="/aboutUs" className="footer-item text-decoration-none text-primary">
          Om oss</Link>
        <Link to="/contact" className="footer-item text-decoration-none text-primary">
          Kontakt</Link>
        <Link to="/location" className="footer-item text-decoration-none text-primary">
          Hitta hit
        </Link>
      </Container>
      <div className="text-center pb-3">© Filmvisarna</div>
    </footer>
  );
}
