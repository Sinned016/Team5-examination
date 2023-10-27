import { useStates } from "react-easier";
import { useState } from "react";

export default function ScreeningList() {
    const movieFetch = useStates('globalMovieState');
    const selectedScreening = useStates('globalSelectedScreening');
    
    const movieDetails = movieFetch.movieDetails[0];

    if (!movieDetails) {
        console.log("Laddar...");
        return;
    }
    
    console.log(selectedScreening);

    return (
        <form className="screening-list" onSubmit={(event) => { event.preventDefault(); }}>
            {movieDetails.screenings.map((screening, i) => {
                return (
                    <div key={i}>
                        <label>
                            <input 
                                type="radio"
                                name="selectedScreening" 
                                value={screening._id} 
                                onChange={() => { selectedScreening.selectedScreening = screening._id}}
                            />
                            {`${screening.date}, ${screening.time}, ${movieDetails.language.slice(0, 3)} tal, ${movieDetails.subtitles.slice(0, 3)} text. `}
                        </label>
                    </div>
            )})}

            <button type="submit" className="btn login-btn ms-2">Submit</button>
        </form>
    );
}