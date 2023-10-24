import { useStates } from "react-easier"
import { Container, Row, Col, } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function ScreeningsComponent() {
    const g = useStates('globalMovies');
    console.log(g.moviesAndScreenings);
    const navigate = useNavigate();



  return (
    <Container>
        <Row>
            <h1>hello</h1>
        </Row>
    </Container>
  )
}
