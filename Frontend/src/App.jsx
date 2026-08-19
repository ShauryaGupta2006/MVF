import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Trending from "./pages/trending";
import Upcoming from "./pages/upcoming";
import Genre from "./pages/genre";
import Search from "./pages/search";
import MovieDetail from "./pages/movieDetail";
import Layout from "./components/layout";
import NotFound from "./pages/notFound";
import Signup from "./pages/signup";
import Login from "./pages/login"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/genre/:genreId" element={<Genre />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;