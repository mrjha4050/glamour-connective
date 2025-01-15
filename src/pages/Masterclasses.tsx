import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Masterclasses = () => {
  const masterclasses = [
    {
      id: 1,
      title: "Bridal Makeup Essentials",
      instructor: "Sarah Johnson",
      date: "March 15, 2024",
      time: "2:00 PM",
      price: "$299",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Advanced Hair Styling",
      instructor: "Michael Chen",
      date: "March 20, 2024",
      time: "3:00 PM",
      price: "$349",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Professional Draping Techniques",
      instructor: "Emma Williams",
      date: "March 25, 2024",
      time: "1:00 PM",
      price: "$249",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 hero-gradient rounded-xl p-12">
          <h1 className="text-5xl font-serif font-bold mb-4">
            Learn from the <span className="gradient-text">Best</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Join masterclasses from top industry experts and enhance your skills
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bridal">Bridal Makeup</SelectItem>
                  <SelectItem value="hair">Hair Styling</SelectItem>
                  <SelectItem value="draping">Draping</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-200">$0 - $200</SelectItem>
                  <SelectItem value="201-500">$201 - $500</SelectItem>
                  <SelectItem value="501+">$501+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 hours</SelectItem>
                  <SelectItem value="2-4">2-4 hours</SelectItem>
                  <SelectItem value="4+">4+ hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {masterclasses.map((masterclass) => (
            <Card key={masterclass.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <img
                  src={masterclass.image}
                  alt={masterclass.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{masterclass.title}</CardTitle>
                <p className="text-gray-600">by {masterclass.instructor}</p>
                <div className="mt-4 space-y-1">
                  <p className="text-sm">Date: {masterclass.date}</p>
                  <p className="text-sm">Time: {masterclass.time}</p>
                  <p className="text-lg font-semibold text-primary">{masterclass.price}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  Join Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Masterclasses;