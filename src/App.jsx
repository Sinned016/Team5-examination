import { Outlet } from "react-router-dom";
import MovieBookingComponent from "./components/MovieBookingComponent";

export default function App() {
  return (
    <>
      <header>
        <h1>Header component here!</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <MovieBookingComponent />
      <footer className="container-fluid mt-4">
        <h3>Footer component here!</h3>
      </footer>
    </>
  );
}
