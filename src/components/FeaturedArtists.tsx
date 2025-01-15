import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const artists = [
  {
    name: "Sophie Anderson",
    specialty: "Bridal & Editorial",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
  },
  {
    name: "Emma Thompson",
    specialty: "Celebrity & Fashion",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  {
    name: "Maria Garcia",
    specialty: "Special Effects & Beauty",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
  },
];

export const FeaturedArtists = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured <span className="gradient-text">Artists</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <Card key={artist.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-semibold">{artist.name}</h3>
                    <p className="text-gray-600">{artist.specialty}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-secondary fill-current" />
                    <span className="ml-1 font-semibold">{artist.rating}</span>
                  </div>
                </div>
                <Button className="w-full bg-primary text-white hover:bg-primary/90 transition-all shimmer">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};