import { useStates, useFetch } from "react-easier"
import Movies from "../components/Movies";



export default function LandingPage() {

    // Fetching all the movies and all the screenings and sharing this useStates with all child components.
    const g = useStates('globalMovies', {
        moviesAndScreenings: useFetch('/api/screeningsAndMovies')
    });

    
  return (
    <>
        < Movies />
    </>
  )
}
