import { useStates } from "react-easier"
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import getFormattedDate from "../service/getFormattedDate";
import FilterDateComponent from "./FilterDateComponent";
import getCurrentDate from "../service/getCurrentDate";

export default function ScreeningsComponent() {
  const g = useStates('globalMovies');
  const navigate = useNavigate();
  

  function navigateToMovie(movieId) {
    navigate(`/movieDetailPage/${movieId}`)
  }

  let sortedData = [...g.moviesAndScreenings].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Group the screenings by date
  const groupedData = sortedData.reduce((acc, screening) => {
    const date = screening.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(screening);
    return acc;
  }, {});

  const dates = Object.keys(groupedData);
  const earliestDate = dates[0];
  const latestDate = dates[dates.length - 1];
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  const filteredScreenings = Object.entries(groupedData)
    .filter(([date]) => new Date(date) >= new Date(selectedDate))
    .map(([date, screenings]) => {
      let formattedDate = getFormattedDate(date);

    return (
      <div className="screeningsContainer" key={date}>
        <h3 className="underline text-center">{formattedDate}</h3>
        {screenings.map((screening) => (
          <Col className="screeningContainer" key={screening._id} xs={12} sm={12} md={12} lg={12}>
            <p>{screening.movieDetails[0].title}</p>
            <button onClick={() => navigateToMovie(screening.movieId)} className="screeningsBtn important">{screening.time}</button>
          </Col>
        ))}
      </div>
    );
  });
  
  return (
    <Container>
      <FilterDateComponent earliestDate={earliestDate} latestDate={latestDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> 

      <Row>
        {filteredScreenings}
      </Row>
    </Container>
  )
}
