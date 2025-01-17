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
      
      // First check if the user already exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', data.email)
        .maybeSingle();

      if (existingUser) {
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

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: "",
            email_confirm: true,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
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
        throw error;
      }

      toast({
        title: "Success!",
        description: "Please check your email (including spam folder) for the verification link. You'll need to verify your email before logging in.",
      });

      navigate("/login", {
        state: {
          email: data.email,
          message: "Please check your email (including spam folder) for the verification link before logging in.",
        },
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Error",
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