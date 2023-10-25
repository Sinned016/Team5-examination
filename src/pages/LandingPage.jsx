import { useStates, useFetch } from "react-easier"
import MoviesComponent from "../components/MoviesComponent";
import ScreeningsComponent from "../components/ScreeningsComponent";


export default function LandingPage() {


    // Fetching all the movies and all the screenings and sharing this useStates with all child components.
    const g = useStates('globalMovies', {
        moviesAndScreenings: useFetch('/api/screeningsAndMovies')
    });


    const handleScrollToScreenings = () => {
      const screeningsComponentBtn = document.getElementById("screeningsComponentBtn");
      if (screeningsComponentBtn) {
        window.scrollTo({
          top: screeningsComponentBtn.offsetTop,
          behavior: "smooth",
        });
      }
    };

    const handleScrollToMovies = () => {
      const moviesComponentBtn = document.getElementById("moviesComponentBtn");
      if (moviesComponentBtn) {
        window.scrollTo({
          top: moviesComponentBtn.offsetTop,
          behavior: "smooth",
        });
      }
    };
    
  return (
    <>
      <h2 className="text-center mb-4">På bio just nu</h2>
      <div className="d-flex justify-content-center mb-3">
        <button 
          className="nav-btn important" 
          id="moviesComponentBtn"
          onClick={handleScrollToScreenings}>
          KALENDER
        </button>
      </div>

      <MoviesComponent />

      <div className="d-flex justify-content-center mb-3 mt-5">
        <button 
          className="nav-btn important" 
          id="screeningsComponentBtn" 
          onClick={handleScrollToMovies}>
          FILMER
        </button>
      </div>
      
      <ScreeningsComponent />

    </>
  )
}
