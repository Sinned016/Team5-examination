import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/main.scss'
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MovieDetailPage from './pages/MovieDetailPage';



export const pages = [
  { path: '/', label: 'LandingPage', element: <LandingPage /> },
  { path: '/movieDetailPage/:id', label: 'LandingPage', element:  <MovieDetailPage />},
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: pages
  }
]);

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
