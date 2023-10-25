import { useParams } from "react-router-dom";
import { useStates, useFetch } from "react-easier"
import "../sass/variables.scss";
import "../sass/movieDetailsComponent.scss";

export default function MovieCard() {
    
    const routeParams = useParams();
    const id = routeParams.id;

    const movieFetch = useStates({
        movieDetails: useFetch(`/api/movie/${id}`)
    })
    
    const movieDetails = movieFetch.movieDetails[0];
    const movieTrailerLink = `https://www.youtube.com/embed/${movieDetails.link}`;

    return (
            <div className="movie-details-component">
                <div className="movie-details-trailer">
                    <iframe src={movieTrailerLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div><hr />
                <div className="movie-details-box">
                    <div className="movie-details-age-rest">
                        <p class="text-primary-detail-color">Åldersgräns</p>
                        <p>{movieDetails.ageRestriction}</p>
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
                        <p>{movieDetails.runtimeMin}</p>
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