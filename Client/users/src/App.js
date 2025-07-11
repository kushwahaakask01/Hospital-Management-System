import Admission from "./Addmission";
import Frontpage from "./Frontpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/admission" element={<Admission />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
