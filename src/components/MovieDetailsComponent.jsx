import { useParams } from "react-router-dom";
import { useStates, useFetch } from "react-easier";

export default function MovieCard() {
    
    const routeParams = useParams();
    const id = routeParams.id;

    const movieFetch = useStates({
        movieDetails: useFetch(`/api/movie/${id}`)
    })
    
    const movieDetails = movieFetch.movieDetails[0];

    if (!movieDetails) {
        console.log("Laddar...");
        return;
    }

    const movieTrailerLink = `https://www.youtube.com/embed/${movieDetails.link}`;

    const hours = Math.floor(movieDetails.runtimeMin / 60);
    const minutes = movieDetails.runtimeMin % 60;
    const formattedTime = `${hours}:${minutes}`;

    return (
            <div className="movie-details-component">
                <div className="movie-details-trailer">
                    <iframe src={movieTrailerLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div><hr />
                <div className="movie-details-box">
                    <div className="movie-details-age-rest">
                        <p class="text-primary-detail-color">Åldersgräns</p>
                        <p>{movieDetails.ageRestriction} år</p>
                    </div>
                    <div className="movie-details-subs">
                        <p class="text-primary-detail-color">Undertexter</p>
                        <p>{movieDetails.subtitles}</p>
                    </div>
                    <div className="movie-details-lang">
                        <p class="text-primary-detail-color">Språk</p>
                        <p>{movieDetails.language}</p>
                    </div>
                    <div className="movie-details-runtime">
                        <p class="text-primary-detail-color">Längd</p>
                        <p>{formattedTime}</p>
                    </div>
                </div><hr />
                <div className="movie-details-desc">
                    {movieDetails.description}
                </div><hr />
                <div className="movie-details-actors">
                    <p><span className="text-secondary-detail-color">Skådespelare:</span> {movieDetails.actors.join(", ")}</p>
                </div>
                <div className="movie-details-director">
                    <p><span className="text-secondary-detail-color">Regisör:</span> {movieDetails.director}</p>
                </div>
            </div>
    );
}