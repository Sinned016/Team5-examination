import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/header";

export default function App() {

  return (
    <div>
      <header className="container-fixed mt-3">
        <Header />
      </header>

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>

      <footer className="container-fixed mt-4">
        <Footer />
      </footer>
    </div>
  );
}
