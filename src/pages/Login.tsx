import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Navigation } from "@/components/Navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";
import TermsModal from "@/components/TermsModal";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const message = location.state?.message;
  const email = location.state?.email;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: email || "",
    password: "",
    confirmPassword: "",
    username: "",
    acceptTerms: false,
  });

  const checkUsernameExists = async (username: string) => {
    try {
      console.log("Checking if username exists:", username);
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error("Error checking username:", error);
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error("Error in checkUsernameExists:", error);
      throw error;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Starting login process for email:", formData.email);
      
      // Check if user exists in profiles
      console.log("Checking if user exists in profiles table...");
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', formData.email)
        .maybeSingle();

      console.log("Profile check result:", { existingUser, checkError });

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (!existingUser) {
        console.log("No user found in profiles table");
        toast({
          variant: "destructive",
          title: "Account Not Found",
          description: "No account exists with this email. Would you like to create one?",
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
        setIsLoading(false);
        return;
      }

      console.log("User found in profiles, attempting login...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error("Login error:", error);
        
        if (error instanceof AuthApiError) {
          if (error.message.includes("Invalid login credentials")) {
            console.log("Invalid credentials - likely wrong password");
            toast({
              variant: "destructive",
              title: "Incorrect Password",
              description: "The password you entered is incorrect. Please try again.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Login Failed",
              description: error.message,
            });
          }
        }
        return;
      }

      if (data?.user) {
        console.log("Login successful, user data:", data.user);
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate("/dashboard");
      }
    } catch (error) {
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
    
    if (!formData.acceptTerms) {
      toast({
        variant: "destructive",
        title: "Terms Required",
        description: "Please accept the terms and conditions to create an account.",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Check if email already exists
      console.log("Checking if email exists:", formData.email);
      const { data: existingEmail, error: emailError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', formData.email)
        .maybeSingle();

      if (emailError && emailError.code !== 'PGRST116') {
        throw emailError;
      }

      if (existingEmail) {
        toast({
          variant: "destructive",
          title: "Email Already Registered",
          description: "This email is already registered. Please login or use a different email.",
          action: (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSignUp(false)}
              className="ml-2"
            >
              Login
            </Button>
          ),
        });
        setIsLoading(false);
        return;
      }

      // Check if username exists
      const usernameExists = await checkUsernameExists(formData.username);
      if (usernameExists) {
        toast({
          variant: "destructive",
          title: "Username Taken",
          description: "This username is already taken. Please choose a different one.",
        });
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
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
    } catch (error) {
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
                      placeholder="Choose a unique username"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      required
                      minLength={3}
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
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                  {isSignUp && <PasswordStrengthIndicator password={formData.password} />}
                </div>
                {isSignUp && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm Password</label>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
                {isSignUp && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                      }
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I accept the{" "}
                      <button
                        type="button"
                        onClick={() => setTermsModalOpen(true)}
                        className="text-secondary hover:underline"
                      >
                        terms and conditions
                      </button>
                    </label>
                  </div>
                )}
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
      <TermsModal open={termsModalOpen} onOpenChange={setTermsModalOpen} />
    </div>
  );
};

export default Login;