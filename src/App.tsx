import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Search from "@/pages/Search";
import Masterclasses from "@/pages/Masterclasses";
import ArtistRegistration from "@/pages/ArtistRegistration";
import Dashboard from "@/pages/Dashboard";
import PortfolioManagement from "@/pages/PortfolioManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/masterclasses" element={<Masterclasses />} />
        <Route path="/register-artist" element={<ArtistRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<PortfolioManagement />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
