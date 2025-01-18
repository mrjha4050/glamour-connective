import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { getErrorMessage } from "@/utils/auth-errors";
import { useToast } from "@/hooks/use-toast";
import { signupSchema, SignupFormData } from "@/types/auth";
import RegistrationForm from "./auth/RegistrationForm";

interface SignupFormProps {
  onOpenTerms: () => void;
}

export const SignupForm = ({ onOpenTerms }: SignupFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      console.log("Starting signup process for email:", data.email);
      
      // First check if the user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', data.email)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error("Error checking existing user:", checkError);
        throw checkError;
      }

      if (existingUser) {
        console.log("User already exists:", data.email);
        toast({
          variant: "destructive",
          title: "Account Already Exists",
          description: "An account with this email already exists. Please login or use a different email.",
        });
        navigate("/login", { 
          state: { 
            email: data.email,
            message: "An account with this email already exists. Please login or use a different email." 
          } 
        });
        return;
      }

      console.log("Proceeding with signup for new user");
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: "",
          },
        },
      });

      if (error) {
        console.error("Signup error:", error);
        throw error;
      }

      console.log("Signup successful, user data:", signUpData);
      toast({
        title: "Account Created Successfully!",
        description: "You can now log in with your credentials.",
        duration: 6000,
      });

      navigate("/login", {
        state: {
          email: data.email,
          message: "Account created successfully. Please log in with your credentials.",
        },
      });
    } catch (error: any) {
      console.error("Signup process error:", error);
      toast({
        variant: "destructive",
        title: "Error Creating Account",
        description: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <RegistrationForm
          form={form}
          isLoading={isLoading}
          onOpenTerms={onOpenTerms}
        />
      </form>
    </Form>
  );
};