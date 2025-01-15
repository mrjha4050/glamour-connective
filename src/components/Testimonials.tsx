import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Bride",
    quote: "GlamConnect made finding my wedding makeup artist a breeze. The results were absolutely stunning!",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
  },
  {
    name: "Emily Davis",
    role: "Model",
    quote: "The platform connects you with true professionals. Every booking has been perfect.",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Client <span className="gradient-text">Stories</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-none shadow-lg">
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-secondary mb-4" />
                <p className="text-gray-600 mb-6 text-lg">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-serif font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};