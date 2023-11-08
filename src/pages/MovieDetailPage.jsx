import { useParams } from "react-router-dom";
import { useStates, useFetch } from "react-easier";
import MovieDetailsComponent from "../components/MovieDetailsComponent.jsx";
import MovieBookingComponent from "../components/MovieBookingComponent.jsx";

export default function MovieDetailPage() {
  const routeParams = useParams();
  const id = routeParams.id;

  const movieFetch = useStates("globalMovieState", {
    movieDetails: useFetch(`/api/movie/${id}`),
  });

  const selectedScreening = useStates("globalSelectedScreening", {
    selectedScreening: "",
  });

  return (
    <div className="container-xl">
      <div className="row">
        <div className="col-lg-6 col-xl-7 col-xxl-8">
          <MovieDetailsComponent />
        </div>
        <div className="col-lg-6 col-xl-5 col-xxl-4">
          <MovieBookingComponent />
        </div>
      </div>
    </div>
  );
}
