import { useParams } from "react-router-dom";
import { useStates, useFetch } from "react-easier";
import MovieDetailsComponent from "../components/MovieDetailsComponent.jsx";

export default function movieDetailPage() {
    
  const routeParams = useParams();
  const id = routeParams.id;

  const movieFetch = useStates('globalMovieState', {
    movieDetails: useFetch(`/api/movie/${id}`)
})

  return (
    <MovieDetailsComponent />
  )
}
