import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

export default function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <div className="aboutUs d-flex justify-content-center">
      <div className="about m-3 ">
        <div className="aboutUs">
          <h1>Om oss</h1>
          <p>
            Välkommen till oss på Filmvisarnas biograf!
            <br />
            Vi är en liten biograf med två salonger där vi visar olika filmer,
            <br />
            allt från gamla godingar till nya storfilmer.
          </p>
        </div>

        <div className="shop">
          <h3>Filmvisarnas shop</h3>
          <p>Vi har försäljning av popcorn, chips, godis och dricka .</p>
        </div>
        <div className="mt-3">
          <br />
          <button onClick={() => navigate("/")} className="about-us-btn">
            Tillbaka till filmer
          </button>
        </div>
      </div>
    </div>
  );
}
