import { useNavigate } from "react-router-dom";


export default function AboutUsPage() {
    const navigate = useNavigate();

    return (
        <div className="about-us-page d-flex row m-2">
            <div className="">
                <h1>Om oss</h1>
                <p>Välkommen till oss på Filmvisarnas bio!
                    <br/>
                    Vi är en liten bio med två salonger där vi visar olika filmer, allt från gamla godingar till nya storfilmer.
                </p>
            </div>

            <div>
                <h3>Filmvisarnas shop</h3>
                <p>Vi har försäljning av popcorn, chips, godis och dricka .</p>
                <div className="candy-shop border">                    
                    {/* shop images */}
                    <p> Bilder på vad vi säljer kommer</p>
                </div>
            </div>
            <div className="mt-3">
                    <p>Se vad vi visar på bio just nu
                        <br/>
                        <button onClick={() => navigate ("/")} className="about-us-btn">Tillbaka till filmer</button>
                    </p>
                    <h2>Varmt välkomna till oss</h2>
                </div>
        </div>
    )
}