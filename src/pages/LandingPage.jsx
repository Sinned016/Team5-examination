import { useStates, useFetch } from "react-easier";
import MoviesComponent from "../components/MoviesComponent";
import ScreeningsComponent from "../components/ScreeningsComponent";
import useWindowSize from "../service/useWindowSize";

export default function LandingPage() {
  // Fetching all the movies and all the screenings and sharing this useStates with all child components.
  const g = useStates("globalMovies", {
    moviesAndScreenings: useFetch("/api/screeningsAndMovies"),
  });

  const size = useWindowSize();
  const breakPoint = 992;

  const handleScrollToScreenings = () => {
    const screeningsComponentBtn = document.getElementById(
      "screeningsComponentBtn"
    );
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
    <div className="container-xl">
      <div className="row">
        <div className="col-lg-6 col-xl-7 col-xxl-8">
          <h2 className="text-center mb-4">På bio just nu</h2>
          <div className="d-flex justify-content-center mb-3">
            {size.width < breakPoint ? (
              <button
                className="nav-btn important"
                id="moviesComponentBtn"
                onClick={handleScrollToScreenings}>
                KALENDER
              </button>
            ) : (
              ""
            )}
          </div>
          <MoviesComponent />
        </div>
        <div className="col-lg-6 col-xl-5 col-xxl-4">
          <div className="d-flex justify-content-center mb-3 mt-5">
            {size.width < breakPoint ? (
              <button
                className="nav-btn important"
                id="screeningsComponentBtn"
                onClick={handleScrollToMovies}>
                FILMER
              </button>
            ) : (
              ""
            )}
          </div>

          <ScreeningsComponent />
        </div>
      </div>
    </div>
  );
}
