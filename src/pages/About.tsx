import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Star, Award } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: Users,
      value: "1000+",
      label: "Artists Onboarded"
    },
    {
      icon: Star,
      value: "50,000+",
      label: "Happy Clients"
    },
    {
      icon: Heart,
      value: "100,000+",
      label: "Bookings Made"
    },
    {
      icon: Award,
      value: "4.9/5",
      label: "Average Rating"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg"
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/placeholder.svg"
    },
    {
      name: "Emma Williams",
      role: "Creative Director",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4">
            About <span className="gradient-text">GlamConnect</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering artists. Connecting clients. Transforming moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">Our Mission</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed text-gray-700">
              We aim to revolutionize the beauty industry by creating seamless connections between talented artists and clients. Our platform empowers artists to showcase their skills while helping clients find the perfect match for their special moments.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden group">
                <CardContent className="p-6">
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;