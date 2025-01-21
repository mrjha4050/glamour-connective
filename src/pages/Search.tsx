import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Search as SearchIcon, Filter, Star } from "lucide-react";
import { FeaturedArtists } from "@/components/FeaturedArtists";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Search = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]); // Adjusted for INR
  const [specialty, setSpecialty] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [rating, setRating] = useState<string>("");

  const { data: artists, isLoading } = useQuery({
    queryKey: ["artists", searchTerm, priceRange, specialty, location, rating],
    queryFn: async () => {
      let query = supabase
        .from("artists")
        .select(`
          *,
          profiles (full_name, avatar_url),
          artist_specialties (specialty),
          reviews (rating)
        `)
        .range(0, 9);

      if (searchTerm) {
        query = query.textSearch('profiles.full_name', searchTerm);
      }

      if (specialty) {
        query = query.contains('artist_specialties.specialty', [specialty]);
      }

      if (location) {
        query = query.eq('location', location);
      }

      if (priceRange[0] > 0 || priceRange[1] < 10000) {
        query = query
          .gte('hourly_rate', priceRange[0])
          .lte('hourly_rate', priceRange[1]);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching artists:', error);
        toast({
          title: "Error",
          description: "Failed to fetch artists. Please try again.",
          variant: "destructive",
        });
        return [];
      }

      // Calculate average rating and filter by rating if selected
      const artistsWithRating = data.map(artist => {
        const ratings = artist.reviews || [];
        const avgRating = ratings.length > 0 
          ? ratings.reduce((acc: number, curr: any) => acc + (curr.rating || 0), 0) / ratings.length
          : 0;
        return { ...artist, avgRating };
      });

      if (rating) {
        return artistsWithRating.filter(artist => artist.avgRating >= parseInt(rating));
      }

      return artistsWithRating;
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is handled automatically by the useQuery hook
    // when any of the dependencies change
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 hero-gradient rounded-xl p-12">
            <h1 className="text-5xl font-serif font-bold mb-4">
              Find Your Perfect <span className="gradient-text">Artist</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Browse top-rated makeup artists in India
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
              <SearchIcon className="absolute left-4 top-3 text-gray-400" />
              <Input
                className="pl-12 h-12 text-lg shadow-lg"
                placeholder="Search by name, location, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range (₹/hr)</label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={10000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialty</label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bridal">Bridal</SelectItem>
                    <SelectItem value="Editorial">Editorial</SelectItem>
                    <SelectItem value="Special Effects">Special Effects</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Beauty">Beauty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Kolkata">Kolkata</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Rating</label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Minimum rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" fill="currentColor" />
                        5 Stars
                      </div>
                    </SelectItem>
                    <SelectItem value="4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" fill="currentColor" />
                        4+ Stars
                      </div>
                    </SelectItem>
                    <SelectItem value="3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" fill="currentColor" />
                        3+ Stars
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {artists?.map((artist) => (
                <div key={artist.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={artist.profiles?.avatar_url || "https://via.placeholder.com/400x300"}
                      alt={artist.profiles?.full_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-serif font-semibold">
                          {artist.profiles?.full_name}
                        </h3>
                        <p className="text-gray-600">
                          {artist.artist_specialties?.[0]?.specialty}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">
                          {artist.avgRating?.toFixed(1) || "New"}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-primary">
                        ₹{artist.hourly_rate}/hr
                      </span>
                      <Button className="bg-primary text-white hover:bg-primary/90 transition-all shimmer">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;