import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the specialty type to match the database enum
type ArtistSpecialty = "Bridal" | "Editorial" | "Special Effects" | "Fashion" | "Beauty";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  specialty: ArtistSpecialty;
  bio: string;
  location: string;
  yearsExperience: string;
  hourlyRate: string;
}

const ArtistRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    specialty: "Bridal", // Set a default value from the enum
    bio: "",
    location: "",
    yearsExperience: "",
    hourlyRate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecialtyChange = (value: ArtistSpecialty) => {
    setFormData((prev) => ({
      ...prev,
      specialty: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { session }, error: authError } = await supabase.auth.getSession();

      if (!session) {
        toast({
          variant: "destructive",
          title: "Authentication Required",
          description: "Please log in to register as an artist.",
        });
        navigate("/login");
        return;
      }

      // Insert artist profile
      const { error: artistError } = await supabase
        .from("artists")
        .insert({
          id: session.user.id,
          bio: formData.bio,
          years_experience: parseInt(formData.yearsExperience),
          location: formData.location,
          hourly_rate: parseFloat(formData.hourlyRate),
        });

      if (artistError) {
        throw artistError;
      }

      // Insert artist specialty
      const { error: specialtyError } = await supabase
        .from("artist_specialties")
        .insert({
          artist_id: session.user.id,
          specialty: formData.specialty,
        });

      if (specialtyError) {
        throw specialtyError;
      }

      toast({
        title: "Registration Successful",
        description: "Your artist profile has been created.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "There was an error creating your artist profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Array of valid specialties matching the database enum
  const specialties: ArtistSpecialty[] = [
    "Bridal",
    "Editorial",
    "Special Effects",
    "Fashion",
    "Beauty"
  ];

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
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialty</label>
                <Select
                  value={formData.specialty}
                  onValueChange={handleSpecialtyChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself and your experience..."
                className="h-32"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Your city/area"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Years of Experience</label>
                <Input
                  type="number"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                  placeholder="Years of experience"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Hourly Rate ($)</label>
              <Input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                placeholder="Your hourly rate"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Portfolio Images</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-secondary transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">
                  Drag and drop your images here, or click to browse
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  (Portfolio image upload will be enabled after registration)
                </p>
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90 transition-all shimmer"
              disabled={isLoading}
            >
              {isLoading ? "Creating Profile..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArtistRegistration;