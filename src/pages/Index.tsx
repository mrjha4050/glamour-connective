import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FeaturedArtists } from "@/components/FeaturedArtists";
import { Testimonials } from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedArtists />
      <Testimonials />
    </div>
  );
};

export default Index;