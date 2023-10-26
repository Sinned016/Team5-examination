import { Outlet } from "react-router-dom";
// import Header from "./components/header";
import Footer from "./components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import MovieBookingComponent from "./components/MovieBookingComponent";

export default function App() {
  return (
    <div>
      <header id="header">
        {/* <Header /> */}
        <h1>Header component here!</h1>
      </header>

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
