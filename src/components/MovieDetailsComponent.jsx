import { useStates } from "react-easier";

export default function MovieCard() {
  const movieFetch = useStates("globalMovieState");

  const movieDetails = movieFetch.movieDetails[0];

  if (!movieDetails) {
    return;
  }

  const movieTrailerLink = `https://www.youtube.com/embed/${movieDetails.link}`;

  const hours = Math.floor(movieDetails.runtimeMin / 60);
  const minutes = movieDetails.runtimeMin % 60;
  const formattedTime = `${hours} tim ${minutes} min`;

  return (
    <div className="movie-details-component">
      <div>
        <h1 className="text-center">{movieDetails.title}</h1>
      </div>
      <div className="movie-details-trailer">
        <iframe src={movieTrailerLink} title="YouTube video player"></iframe>
      </div>
      <hr />
      <div className="movie-details-box">
        <div className="movie-details-age-rest">
          <p className="text-primary-detail-color">Åldersgräns</p>
          <p>{movieDetails.ageRestriction} år</p>
        </div>
        <div className="movie-details-subs">
          <p className="text-primary-detail-color">Undertexter</p>
          <p>{movieDetails.subtitles}</p>
        </div>
        <div className="movie-details-lang">
          <p className="text-primary-detail-color">Språk</p>
          <p>{movieDetails.language}</p>
        </div>
        <div className="movie-details-runtime">
          <p className="text-primary-detail-color">Längd</p>
          <p>{formattedTime}</p>
        </div>
      </div>
      <hr />
      <div className="movie-details-desc">{movieDetails.description}</div>
      <hr />
      <div>
        <p>
          <span className="text-secondary-detail-color">Genre:</span>{" "}
          {movieDetails.genre.join(",  ")}
        </p>
      </div>
      <div className="movie-details-actors">
        <p>
          <span className="text-secondary-detail-color">Skådespelare:</span>{" "}
          {movieDetails.actors.join(",  ")}
        </p>
      </div>
      <div className="movie-details-director">
        <p>
          <span className="text-secondary-detail-color">Regissör:</span>{" "}
          {movieDetails.director}
        </p>
      </div>
    </div>
  );
}
