import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MovieBookingComponent from "./components/MovieBookingComponent";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <div>
      <header id="header">
        {/* <Header /> */}
        <h1>Header component here!</h1>
      </header>

      <LoginPage />

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
