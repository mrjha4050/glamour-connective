import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthApiError } from "@supabase/supabase-js";

interface LoginFormProps {
  email: string;
  onSuccess: () => void;
  onSignUpClick: () => void;
}

const LoginForm = ({ email, onSuccess, onSignUpClick }: LoginFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: email || "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Starting login process for email:", formData.email);
      
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
              onClick={onSignUpClick}
              className="ml-2"
            >
              Sign Up
            </Button>
          ),
          duration: 10000,
        });
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
        onSuccess();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
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
      </div>
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
      <Button 
        type="submit" 
        className="w-full bg-primary text-white hover:bg-primary/90 transition-all shimmer"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSignUpClick}
          className="text-secondary hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;