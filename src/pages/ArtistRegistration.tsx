import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Upload } from "lucide-react";

const ArtistRegistration = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
            Join <span className="gradient-text">GlamConnect</span> as an Artist
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Showcase your skills and reach more clients
          </p>
          
          <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input type="tel" placeholder="Enter your phone number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialty</label>
                <Input placeholder="e.g., Bridal, Editorial, SFX" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Portfolio Images</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-secondary transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">
                  Drag and drop your images here, or click to browse
                </p>
              </div>
            </div>

            <Button className="w-full bg-primary text-white hover:bg-primary/90 transition-all shimmer">
              Submit Application
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArtistRegistration;