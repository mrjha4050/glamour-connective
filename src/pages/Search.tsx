import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Search as SearchIcon, Filter } from "lucide-react";
import { FeaturedArtists } from "@/components/FeaturedArtists";

const Search = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-serif font-bold text-center mb-8">
            Find Your Perfect <span className="gradient-text">Makeup Artist</span>
          </h1>
          
          <div className="relative">
            <SearchIcon className="absolute left-4 top-3 text-gray-400" />
            <Input
              className="pl-12 h-12 text-lg"
              placeholder="Search by name, location, or specialty..."
            />
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Price Range
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              Location
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              Specialty
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              Availability
            </Button>
          </div>
        </div>
        
        <FeaturedArtists />
      </div>
    </div>
  );
};

export default Search;