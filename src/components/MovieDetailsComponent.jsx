import { useParams } from "react-router-dom";
import { useStates, useFetch } from "react-easier"

export default function MovieCard() {
    
    const routeParams = useParams();
    const id = routeParams.id;

    const movieDetails = useStates({
        movieDetails: useFetch(`/api/movie/${id}`)
    })
    
    return (
            <div>
            </div>
    );
}