import { Routes, Route } from "react-router-dom";
import Web from "./pages/Web";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Web />} />
    </Routes>
  );
}

export default App;
