import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/main.scss";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MemberBookingsPage from "./pages/MemberBookingsPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import MapPage from "./pages/MapPage";
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutUs";

export const pages = [
  { path: "/", label: "LandingPage", element: <LandingPage /> },
  { path: "/filmbokning/:id", label: "LandingPage", element: <MovieDetailPage /> },
  { path: "/logga-in", element: <LoginPage /> },
  { path: "/registrera", element: <RegisterPage /> },
  { path: "/bokningar", element: <MemberBookingsPage /> },
  { path: "/bokningsbekraftelse", element: <BookingConfirmationPage /> },
  { path: "/hitta-hit", element: <MapPage /> },
  { path: "/kontakt", element: <ContactPage /> },
  { path: "/om-oss", element: <AboutUsPage /> }
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: pages,
  },
]);

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
