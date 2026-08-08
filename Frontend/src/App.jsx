import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Trending from "./pages/trending";
import Upcoming from "./pages/upcoming";
import Genre from "./pages/genre";
import Search from "./pages/search";
import MovieDetail from "./pages/movieDetail";
import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/genre/:genreId" element={<Genre />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;