import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";

export default function App() {
  return (
    <div>
      <header id="header">
        <Header />
      </header>

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>

      <footer className="container-fluid mt-4">
        <h3>Footer component here!</h3>
      </footer>
    </div>
  );
}
