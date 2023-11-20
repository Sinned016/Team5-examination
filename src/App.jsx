import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { createContext, useState, useEffect } from "react";
import memoryService from "./service/memoryService";

export const AuthContext = createContext({
  loggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export default function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!memoryService.getLocalValue("JWT_TOKEN"));
  }, []);

  const logIn = (token) => {
    memoryService.saveLocalValue("JWT_TOKEN", token);
    setLoggedIn(true);
    setTimeout(() => {
      logOut();
      alert("Du har varit inaktiv under lång tid. Vänligen logga in igen!");
      navigate("/login");
    }, 2700000);
  };

  const logOut = () => {
    memoryService.clearLocalValue("JWT_TOKEN");
    setLoggedIn(false);
  };

  return (
    <div>
      <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
        <header className="sticky-top">
          <Header />
        </header>

        <main>
          <Container fluid>
            <Outlet />
          </Container>
        </main>

        <footer>
          <Footer />
        </footer>
      </AuthContext.Provider>
    </div>
  );
}
