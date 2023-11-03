import { useStates } from "react-easier"
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import getFormattedDate from "../service/getFormattedDate";

export default function ScreeningsComponent() {
  const g = useStates('globalMovies');
  const [selectedFilter, setSelectedFilter] = useState('first');
  const navigate = useNavigate();

  function navigateToMovie(movieId) {
    navigate(`/movieDetailPage/${movieId}`)
  }

  let sortedData;

  if(selectedFilter === "first") {
    sortedData = [...g.moviesAndScreenings].sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (selectedFilter === "last") {
    sortedData = [...g.moviesAndScreenings].sort((a, b) => new Date(a.date) - new Date(b.date)).slice().reverse();
  }

   // Group the screenings by date
   const groupedData = sortedData.reduce((acc, screening) => {
    const date = screening.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(screening);
    return acc;
  }, {});

  const screenings = Object.entries(groupedData).map(([date, screenings]) => {
    
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

  function handleDropdownSelect(eventKey) {
    setSelectedFilter(eventKey);
  }

  return (
    <Container>
      <Dropdown className="text-center" onSelect={handleDropdownSelect}>
        <Dropdown.Toggle id="dropdown-basic">
          Filter
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="first">Första till sista dagen</Dropdown.Item>
          <Dropdown.Item eventKey="last">Sista till första dagen</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

        <Row>
          {screenings}
        </Row>
    </Container>
  )
}
