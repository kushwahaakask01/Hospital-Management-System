import Admission from "./Addmission";
import Cards from "./Card";
import Frontpage from "./Frontpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnlinePayment from "./OnlinePayment";
import Discharge from "./Discharge";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/card" element={<Cards />} />
        <Route path="/onlinepayment" element={<OnlinePayment />} />
        <Route path="/discharge" element={<Discharge />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
