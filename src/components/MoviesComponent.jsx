import { useStates } from "react-easier"
import { Container, Row, Col, } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Movies() {

    const g = useStates('globalMovies');
    console.log(g.moviesAndScreenings);
    const navigate = useNavigate();

    function navigateToMovie(movieId) {
        navigate(`/movieDetailPage/${movieId}`)
    }

    let previousMovieDetails = [];
    const movies = g.moviesAndScreenings.map((movieScreening) => {
        const currentMovieDetails = movieScreening.movieDetails[0];

        // Checking if it's a duplicate
        const isDuplicate = previousMovieDetails.some((prevMovieDetails) => {
            return prevMovieDetails.title === currentMovieDetails.title;
        });

        // If it's a duplicate, skip rendering this movie
        if (isDuplicate) {
            return null;
        }

        // Update the previously rendered movie details array
        previousMovieDetails.push(currentMovieDetails);

        return (
            <Col onClick={() => navigateToMovie(movieScreening.movieId)} className="card" key={movieScreening._id} xs={6} sm={6} md={4} lg={3} >
                <div>
                    <img className="movie-images" src={movieScreening.movieDetails[0].movieImg} alt={`Picture of the movie ${movieScreening.movieDetails[0].title}`} />
                    <p>{movieScreening.movieDetails[0].title}</p>
                </div>
            </Col>
        )
    })

  return (
    <Container>
        <Row>
        {movies}
        </Row>
    </Container>
  )
}
