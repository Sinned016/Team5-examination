import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import MovieBookingComponent from "./components/MovieBookingComponent";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

export default function App() {
  return (
    <div>
      <header id="header">
        <Header />
      </header>

      <LoginPage />

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>

      <MovieBookingComponent />

      <footer className="container-fluid mt-4">
        <Footer />
      </footer>
    </div>
  );
}
