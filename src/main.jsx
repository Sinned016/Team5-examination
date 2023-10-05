import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/main.scss'
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



export const pages = [
  //{ path: '/', label: 'Start', element: <StartPage /> }
  
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
