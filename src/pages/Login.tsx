import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Navigation } from "@/components/Navigation";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <h1 className="text-3xl font-serif font-bold text-center gradient-text mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-center">
                Sign in to your GlamConnect account
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" placeholder="Enter your password" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="/forgot-password" className="text-sm text-secondary hover:underline">
                  Forgot Password?
                </a>
              </div>
              <Button className="w-full bg-primary text-white hover:bg-primary/90 transition-all shimmer">
                Login
              </Button>
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="text-secondary hover:underline">
                  Sign up
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;