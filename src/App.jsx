import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Outlet } from "react-router-dom";

export default function App() {
  const [socket, setSocket] = useState(null);

  // Setup the socket
  useEffect(() => {
    const newSocket = socketIOClient("http://localhost:5003");
    setSocket(newSocket);

    // Clean up: Disconnect the socket as the component unmounts
    return () => newSocket.disconnect();
  }, []);

  return (
    <>
      <header>
        <h1>Header component here</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="container-fluid mt-4">
        <h3>Footer component here</h3>
      </footer>
    </>
  );
}
