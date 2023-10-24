import { useStates } from "react-easier"
import { Container, Row, Col, } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function ScreeningsComponent() {
    const g = useStates('globalMovies');
    console.log(g.moviesAndScreenings);
    const navigate = useNavigate();


    const sortedData = [...g.moviesAndScreenings].sort((a, b) => new Date(a.date) - new Date(b.date));
    const screenings = sortedData.map((screening) => {

      return (
        <Col key={screening._id} xs={12} sm={12} md={12} lg={12}>
          <h3>{screening.date}</h3>
          <p>{screening.movieDetails[0].title}</p>
          <p>{screening.time}</p>
        </Col>
      )
    })

  return (
    <Container>
      {/* Filter option here */}
        <Row>
          
          {screenings}
        </Row>
    </Container>
  )
}
