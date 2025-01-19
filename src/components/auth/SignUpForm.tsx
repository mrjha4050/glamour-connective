import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";

interface SignUpFormProps {
  email: string;
  onSuccess: () => void;
  onLoginClick: () => void;
  onTermsClick: () => void;
}

const SignUpForm = ({ email, onSuccess, onLoginClick, onTermsClick }: SignUpFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
              onClick={onLoginClick}
              className="ml-2"
            >
              Login
            </Button>
          ),
        });
        return;
      }

      const usernameExists = await checkUsernameExists(formData.username);
      if (usernameExists) {
        toast({
          variant: "destructive",
          title: "Username Taken",
          description: "This username is already taken. Please choose a different one.",
        });
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
        onSuccess();
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
    <form onSubmit={handleSignUp} className="space-y-4">
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
        <PasswordStrengthIndicator password={formData.password} />
      </div>
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
            onClick={onTermsClick}
            className="text-secondary hover:underline"
          >
            terms and conditions
          </button>
        </label>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-primary text-white hover:bg-primary/90 transition-all shimmer"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLoginClick}
          className="text-secondary hover:underline"
        >
          Log in
        </button>
      </p>
    </form>
  );
};

export default SignUpForm;