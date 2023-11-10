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

export const pages = [
  { path: "/", label: "LandingPage", element: <LandingPage /> },
  { path: "/movieDetailPage/:id", label: "LandingPage", element: <MovieDetailPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/bookings", element: <MemberBookingsPage /> },
  { path: "/bookingConfirmation", element: <BookingConfirmationPage /> },
  { path: "/location", element: <MapPage /> },
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
