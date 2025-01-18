import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Navigation } from "@/components/Navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const message = location.state?.message;
  const email = location.state?.email;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: email || "",
    password: "",
    username: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting login for email:", formData.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error("Login error:", error);
        
        if (error instanceof AuthApiError) {
          if (error.message.includes("Email not confirmed")) {
            const { error: resendError } = await supabase.auth.resend({
              type: 'signup',
              email: formData.email,
            });
            
            if (!resendError) {
              toast({
                title: "Verification Required",
                description: "A verification email has been sent. Please check your inbox and verify your email before logging in.",
                duration: 8000,
              });
            } else {
              toast({
                variant: "destructive",
                title: "Error",
                description: "Unable to send verification email. Please try signing up again.",
              });
            }
          } else if (error.message.includes("Invalid login credentials")) {
            toast({
              variant: "destructive",
              title: "Account Not Found",
              description: "No account found with these credentials. Would you like to create one?",
              action: (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSignUp(true)}
                  className="ml-2"
                >
                  Sign Up
                </Button>
              ),
              duration: 10000,
            });
          } else {
            toast({
              variant: "destructive",
              title: "Login Failed",
              description: "Invalid email or password. Please check your credentials.",
            });
          }
        } else {
          toast({
            variant: "destructive",
            title: "Login Failed",
            description: error.message,
          });
        }
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        console.log("Login successful, user:", data.user);
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.username,
          },
        },
      });

      if (error) {
        console.error("Signup error:", error);
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: error.message,
        });
        return;
      }

      if (data) {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
          duration: 6000,
        });
        setIsSignUp(false);
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <h1 className="text-3xl font-serif font-bold text-center gradient-text mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-gray-600 text-center">
                {isSignUp ? "Join GlamConnect today" : "Sign in to your GlamConnect account"}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {message && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Username</label>
                    <Input 
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input 
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input 
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                  />
                </div>
                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label htmlFor="remember" className="text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-secondary hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white hover:bg-primary/90 transition-all shimmer"
                  disabled={isLoading}
                >
                  {isLoading 
                    ? (isSignUp ? "Creating account..." : "Logging in...") 
                    : (isSignUp ? "Sign Up" : "Login")}
                </Button>
                <p className="text-center text-sm text-gray-600">
                  {isSignUp ? (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setIsSignUp(false)}
                        className="text-secondary hover:underline"
                      >
                        Log in
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setIsSignUp(true)}
                        className="text-secondary hover:underline"
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;