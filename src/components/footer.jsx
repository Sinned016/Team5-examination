import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer-items">
        {/* <div>
                    <div className="footer-item"> 
                        <ul className="list-unstyled mb-0">
                            <li><a>Om oss</a></li>
                        </ul>
                    </div>
                    <div className="footer-item"> 
                        <ul className="list-unstyled mb-0">
                            <li><a>Kontakt</a></li>
                        </ul>
                    </div>
                    <div className="footer-item"> 
                        <ul className="list-unstyled mb-0">
                            <li><a>Hitta hit</a></li>
                        </ul>
                    </div>
                </div> */}
        <p className="footer-item">Om oss</p>
        <p className="footer-item">Kontakt</p>
        <Link to="/location" className="footer-item text-decoration-none text-primary">
          Hitta hit
        </Link>
      </Container>
      <div className="text-center p-3">© Filmvisarna</div>
    </footer>
  );
}
