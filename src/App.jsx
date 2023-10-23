import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Outlet } from "react-router-dom";
import MovieBookingComponent from "./components/MovieBookingComponent";

export default function App() {
  const [socket, setSocket] = useState(null);

  // Setup a socket connection
  useEffect(() => {
    const newSocket = socketIOClient("http://localhost:5003"); // Initialize the socket, establish socket connection to server
    setSocket(newSocket); // Hold the active socket connection

    // Clean up: Disconnect the socket as the component unmounts
    return () => newSocket.disconnect();
  }, []);

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
