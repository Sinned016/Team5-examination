import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MovieBookingComponent from "./components/MovieBookingComponent";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <div>
      <header>
        <h1>Header component here!</h1>{" "}
      </header>

      {/* <Container className="fluid mt-3">
        <Row>
          <Col>
            <main>
              <Outlet />
            </main>
          </Col>
        </Row>
      </Container> */}

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>

      <MovieBookingComponent />
      <LoginPage />

      <footer className="container-fluid mt-4">
        <h3>Footer component here!</h3>
      </footer>
    </div>
  );
}
