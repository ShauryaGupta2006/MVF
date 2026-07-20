import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Trending from "./pages/trending";
import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;