import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { Container, Row, Col } from "react-bootstrap";
import MovieBookingComponent from "./components/MovieBookingComponent";

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

      <MovieBookingComponent />

      <footer className="container-fluid mt-4">
        <h3>Footer component here!</h3>
      </footer>
    </div>
  );
}
