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

    
    let screeningList = [];

    function createScreeningList(){
        for (let i = 0; i < movieDetails.screenings.length; i++) {
            screeningList.push(`${movieDetails.screenings[0].date}, ${movieDetails.screenings[0].time}, ${movieDetails.screenings[0].theater}. `);
        }

        return screeningList;
    }

    createScreeningList();

    return (
        <form className="screening-list">
            {movieDetails.screenings.map((screening, i) => {
                return (
                    <div key={i}>
                        <input 
                            type="radio"
                            name="selectedScreening" 
                            value={screening._id} 
                            checked={selectedScreening === screening._id} 
                            onChange={() => setSelectedScreening(screening._id)}
                        />
                        <label>{`${screening.date}, ${screening.time}, ${screening.theater}. `}</label>
                    </div>
            )})}

            <button type="submit">Submit</button>
        </form>
    );
}