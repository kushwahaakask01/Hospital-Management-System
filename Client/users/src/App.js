import Admission from "./Addmission";
import Cards from "./Card";
import Frontpage from "./Frontpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnlinePayment from "./OnlinePayment";
import Discharge from "./Discharge";
import UOM from "./UOM";
import Receipt from "./Receipt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/card" element={<Cards />} />
        <Route path="/onlinepayment" element={<OnlinePayment />} />
        <Route path="/discharge" element={<Discharge />} />
        <Route path="/UOM" element={<UOM />} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
