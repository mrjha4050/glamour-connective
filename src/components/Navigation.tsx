import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-serif text-2xl font-bold gradient-text">
            GlamConnect
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/search" className="hover:text-primary transition-colors">Find Artists</Link>
            <Link to="/masterclasses" className="hover:text-primary transition-colors">Masterclasses</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/register-artist">
              <Button className="bg-secondary text-white hover:bg-secondary/90 transition-all">
                Register as Artist
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-primary text-white hover:bg-primary/90 transition-all px-6">
                Login/Signup
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/search" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Find Artists
              </Link>
              <Link 
                to="/masterclasses" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Masterclasses
              </Link>
              <Link 
                to="/about" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link to="/register-artist" onClick={() => setIsOpen(false)}>
                <Button className="bg-secondary text-white hover:bg-secondary/90 transition-all w-full">
                  Register as Artist
                </Button>
              </Link>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="bg-primary text-white hover:bg-primary/90 transition-all w-full px-6">
                  Login/Signup
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};