import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="font-serif text-2xl font-bold gradient-text">
            GlamConnect
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/artists" className="hover:text-primary transition-colors">Find Artists</a>
            <a href="/masterclasses" className="hover:text-primary transition-colors">Masterclasses</a>
            <a href="/about" className="hover:text-primary transition-colors">About</a>
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white transition-all">
              Register as Artist
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/90 transition-all">
              Login
            </Button>
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
              <a href="/artists" className="hover:text-primary transition-colors">Find Artists</a>
              <a href="/masterclasses" className="hover:text-primary transition-colors">Masterclasses</a>
              <a href="/about" className="hover:text-primary transition-colors">About</a>
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white transition-all">
                Register as Artist
              </Button>
              <Button className="bg-primary text-white hover:bg-primary/90 transition-all">
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};