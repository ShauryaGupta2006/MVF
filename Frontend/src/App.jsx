import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home"

function App(){
  return(
    <div className="main">
      <div className="template">
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </div>
  )
}