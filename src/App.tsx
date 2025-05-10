import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CityDetailsPage from "./pages/CityDetailsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/city/:name" element={<CityDetailsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
