import { useState } from "react";
import { Menu, X, User, Bell, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-serif text-2xl font-bold gradient-text">
            GlamConnect
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/search" className="hover:text-primary transition-colors">Find Artists</Link>
                <Link to="/masterclasses" className="hover:text-primary transition-colors">Masterclasses</Link>
                <Link to="/dashboard" className="hover:text-primary transition-colors">My Bookings</Link>
                <Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
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
              {isLoggedIn ? (
                <>
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
                    to="/dashboard" 
                    className="hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <Link 
                    to="/portfolio" 
                    className="hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Portfolio
                  </Link>
                  <Button 
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </Button>
                  <Button 
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Button>
                  <Button 
                    variant="ghost"
                    className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};