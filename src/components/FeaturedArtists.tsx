import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const mockArtists = [
  {
    id: "1",
    profiles: {
      full_name: "Sarah Johnson",
      avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    artist_specialties: [{ specialty: "Bridal Makeup" }],
    avgRating: 4.8
  },
  {
    id: "2",
    profiles: {
      full_name: "Michael Chen",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    artist_specialties: [{ specialty: "Editorial Makeup" }],
    avgRating: 4.9
  },
  {
    id: "3",
    profiles: {
      full_name: "Emma Williams",
      avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    artist_specialties: [{ specialty: "Special Effects" }],
    avgRating: 4.7
  }
];

export const FeaturedArtists = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured <span className="gradient-text">Artists</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {mockArtists.map((artist) => (
            <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img
                  src={artist.profiles.avatar_url}
                  alt={artist.profiles.full_name}
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-semibold">
                      {artist.profiles.full_name}
                    </h3>
                    <p className="text-gray-600">
                      {artist.artist_specialties[0].specialty}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-secondary fill-current" />
                    <span className="ml-1 font-semibold">
                      {artist.avgRating}
                    </span>
                  </div>
                </div>
                <Link to={`/artist/${artist.id}`}>
                  <Button className="w-full bg-primary text-white hover:bg-primary/90 transition-all shimmer">
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};