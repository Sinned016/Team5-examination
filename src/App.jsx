import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import { Container, Row, Col, } from 'react-bootstrap';
=======
import MovieBookingComponent from "./components/MovieBookingComponent";
>>>>>>> dev

export default function App() {
  return (
    <>
      <header>
        <h1>Header component here!</h1>
      </header>
<<<<<<< HEAD
      <Container className="fluid mt-3">
        <Row>
          <Col>
            <main>
              <Outlet />
            </main>
          </Col>
        </Row>

      </Container>
=======
      <main>
        <Outlet />
      </main>
      <MovieBookingComponent />
>>>>>>> dev
      <footer className="container-fluid mt-4">
        <h3>Footer component here!</h3>
      </footer>
    </>
  );
}
