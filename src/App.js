import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CoinPage from "./pages/CoinPage";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ background: "#333", minHeight: "100vh", color: "#fff" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
