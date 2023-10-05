import { Outlet } from 'react-router-dom';


export default function App() {

  return <>
    <header>
      <h1>Header component here</h1>
    </header>
    <main>
      <Outlet />
    </main>
    <footer className='container-fluid mt-4'>
      <h3>Footer component here</h3>
    </footer>
  </>
}