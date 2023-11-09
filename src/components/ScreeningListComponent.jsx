import { useFetch, useStates } from "react-easier";
import { useState } from "react";
import getFormattedDate from "../service/getFormattedDate";

export default function ScreeningList({ setScreening, setActiveItem }) {
    const movieFetch = useStates('globalMovieState');
    const selectedScreening = useStates('globalSelectedScreening');
    const [screeningSelection, setScreeningSelection] = useState();
    
    const movieDetails = movieFetch.movieDetails[0];

    if (!movieDetails) {
        console.log("Laddar...");
        return;
    }

    async function onScreenSubmit(e) {
        e.preventDefault();

        if(screeningSelection === undefined) {
            return;
        }

        const result = await fetch(`/api/screening/${screeningSelection}`);
        const data = await result.json();

        setScreening(data);
        setActiveItem(1);
    }

    

    return (
        <form className="screening-list" onSubmit={(e) => onScreenSubmit(e)}>
            {movieDetails.screenings.map((screening, i) => {

                let formattedDateString = getFormattedDate(screening.date);

                return (
                    <div key={i}>
                        <label className="choose-screening">
                            <input
                                className="choose-screening"
                                type="radio"
                                name="selectedScreening" 
                                value={screening._id} 
                                onChange={() => setScreeningSelection(screening._id)}
                            />
                            {`${formattedDateString}, ${screening.time}, ${movieDetails.language.slice(0, 3)} tal, ${movieDetails.subtitles.slice(0, 3)} text `}
                        </label>
                    </div>
            )})}

            <button type="submit" name="selectedScreening" className="confirm-button">Gå vidare</button>
        </form>
    );
}