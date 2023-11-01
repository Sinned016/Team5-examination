import Container from "react-bootstrap/Container";

export default function Footer() {
    return (
        <footer className="footer py-2">
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
                <p className="footer-item">Hitta hit</p>
            </Container>
            <div className="text-center">
                 © Filmvisarna
            </div>

        </footer>
    )
}
