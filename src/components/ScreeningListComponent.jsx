import { useFetch, useStates } from "react-easier";
import { useState } from "react";
import getFormattedDate from "../utils/getFormattedDate";

export default function ScreeningList({ setScreening, setActiveItem, screeningSelection, setScreeningSelection }) {
    const movieFetch = useStates('globalMovieState');
    const selectedScreening = useStates('globalSelectedScreening');
    
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
                                className="screening-input"
                                type="radio"
                                name="selectedScreening" 
                                value={screening._id} 
                                onChange={() => setScreeningSelection(screening._id)}
                            />
                            <div className="custom-radio-button">
                            {`${formattedDateString}, ${screening.time}, ${movieDetails.language.slice(0, 3)} tal, ${movieDetails.subtitles.slice(0, 3)} text `}
                            </div>
                        </label>
                    </div>
            )})}

            <button type="submit" name="selectedScreening" className="confirm-button">Gå vidare</button>
        </form>
    );
}