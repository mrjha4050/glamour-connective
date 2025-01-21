import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const FeaturedArtists = () => {
  const { toast } = useToast();

  const { data: artists, isLoading } = useQuery({
    queryKey: ["featuredArtists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artists")
        .select(`
          *,
          profiles (full_name, avatar_url),
          artist_specialties (specialty),
          reviews (rating)
        `)
        .eq('is_verified', true)
        .limit(3);

      if (error) {
        console.error('Error fetching featured artists:', error);
        toast({
          title: "Error",
          description: "Failed to fetch featured artists. Please try again.",
          variant: "destructive",
        });
        return [];
      }

      return data.map(artist => ({
        ...artist,
        avgRating: artist.reviews?.length > 0
          ? artist.reviews.reduce((acc: number, curr: any) => acc + (curr.rating || 0), 0) / artist.reviews.length
          : 0
      }));
    }
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured <span className="gradient-text">Artists</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {artists?.map((artist) => (
            <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img
                  src={artist.profiles?.avatar_url || "https://via.placeholder.com/400x300"}
                  alt={artist.profiles?.full_name}
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
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
                    <Star className="w-4 h-4 text-secondary fill-current" />
                    <span className="ml-1 font-semibold">
                      {artist.avgRating?.toFixed(1) || "New"}
                    </span>
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