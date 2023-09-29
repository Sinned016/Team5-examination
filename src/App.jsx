// Only import your sass in App (not every component)
import "./sass/main.scss";

// Import some Bootstrap components
import MainMenu from './MainMenu';
import { Container, Row, Col, } from 'react-bootstrap';

export default function App() {
  return <>
    <MainMenu />
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>Hello!</h1>
          <p>There you are...</p>
        </Col>
      </Row>
    </Container>
  </>;
}