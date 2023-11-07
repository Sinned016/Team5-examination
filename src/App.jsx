import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/header";

export default function App() {
  return (
    <div>
      <header className="sticky-top">
        <Header />
      </header>

      <main>
        <Container fluid>
          <Outlet />
        </Container>
      </main>

      <footer className="container-fixed">
        <Footer />
      </footer>
    </div>
  );
}
