import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FeaturedArtists } from "@/components/FeaturedArtists";
import { Testimonials } from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16"> {/* Added padding-top to account for fixed navbar */}
        <Hero />
        <FeaturedArtists />
        <Testimonials />
      </main>
    </div>
  );
};

export default Index;