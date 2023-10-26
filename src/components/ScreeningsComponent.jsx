import { useStates } from "react-easier"
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

  const screenings = sortedData.map((screening) => {
    return (
      <Col className="screeningsContainer" key={screening._id} xs={12} sm={12} md={12} lg={12}>
        <h3 className="screeningsDate text-center">{screening.date}</h3>
        <p>{screening.movieDetails[0].title}</p>
        <button onClick={() =>navigateToMovie(screening.movieId)} className="screeningsBtn important">{screening.time}</button>
      </Col>
    )
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
