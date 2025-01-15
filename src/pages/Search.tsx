import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Search as SearchIcon, Filter, Star } from "lucide-react";
import { FeaturedArtists } from "@/components/FeaturedArtists";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Search = () => {
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
              Browse top-rated artists for every occasion
            </p>
            
            <div className="relative max-w-3xl mx-auto">
              <SearchIcon className="absolute left-4 top-3 text-gray-400" />
              <Input
                className="pl-12 h-12 text-lg shadow-lg"
                placeholder="Search by name, location, or specialty..."
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialty</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="makeup">Makeup</SelectItem>
                    <SelectItem value="hair">Hair</SelectItem>
                    <SelectItem value="draping">Draping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="newyork">New York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Rating</label>
                <Select>
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
            
            <div className="mt-6 flex justify-end">
              <Button className="bg-primary text-white hover:bg-primary/90">
                Apply Filters
              </Button>
            </div>
          </div>
          
          <FeaturedArtists />
        </div>
      </div>
    </div>
  );
};

export default Search;