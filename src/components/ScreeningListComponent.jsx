import { useStates } from "react-easier";
import { useState } from "react";

export default function screeningList() {
    const movieFetch = useStates('globalMovieState')
    const [selectedScreening, setSelectedScreening] = useState(null);
    
    const movieDetails = movieFetch.movieDetails[0];

    if (!movieDetails) {
        console.log("Laddar...");
        return;
    }

    return (
        <form className="screening-list">
            {movieDetails.screenings.map((screening, i) => {
                return (
                    <div key={i}>
                        <label>
                            <input 
                                type="radio"
                                name="selectedScreening" 
                                value={screening._id} 
                                checked={selectedScreening === screening._id} 
                                onChange={() => setSelectedScreening(screening._id)}
                            />
                            {`${screening.date}, ${screening.time}, ${movieDetails.language.slice(0, 3)} tal, ${movieDetails.subtitles.slice(0, 3)} text. `}
                        </label>
                    </div>
            )})}

            <button type="submit" className="btn login-btn ms-2">Submit</button>
        </form>
    );
}