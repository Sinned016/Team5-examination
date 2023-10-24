import { useStates, useFetch } from "react-easier"
import Movies from "../components/MoviesComponent";



export default function LandingPage() {

    // Fetching all the movies and all the screenings and sharing this useStates with all child components.
    const g = useStates('globalMovies', {
        moviesAndScreenings: useFetch('/api/screeningsAndMovies')
    });

    
  return (
    <>
      <h2 className="text-center mb-4">På bio just nu</h2>
      <div className="d-flex justify-content-center mb-3">
        <button className="nav-btn important">KALENDER</button>
      </div>
      < Movies />
    </>
  )
}
