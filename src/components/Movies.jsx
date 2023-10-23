import { useStates } from "react-easier"

export default function Movies() {

    const g = useStates('globalMovies')
    console.log(g.moviesAndScreenings)

    let previousMovieDetails = [];

    
    const movies = g.moviesAndScreenings.map((movieScreening) => {
        const currentMovieDetails = movieScreening.movieDetails[0];

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
            <div key={movieScreening._id}>
                <h2>{movieScreening.movieDetails[0].title}</h2>
                <p>{movieScreening.movieDetails[0].description}</p>
            </div>
        )
    })

  return (
    <>
        {movies}
    </>
  )
}
