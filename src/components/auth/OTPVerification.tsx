import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { getErrorMessage } from "@/utils/auth-errors";
import { useToast } from "@/hooks/use-toast";

interface OTPVerificationProps {
  email: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const OTPVerification = ({ email, isLoading, setIsLoading }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 180 seconds = 3 minutes
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "Please enter a valid 6-digit verification code.",
      });
      return;
    }

    if (timeLeft <= 0) {
      toast({
        variant: "destructive",
        title: "Code Expired",
        description: "The verification code has expired. Please request a new one.",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "signup",
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your account has been verified. Please login to continue.",
      });

      navigate("/login", {
        state: {
          email,
          message: "Account verified successfully. Please login to continue.",
        },
        replace: true,
      });
    } catch (error: any) {
      console.error("OTP verification error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) throw error;

      setTimeLeft(180); // Reset timer
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email. Valid for 3 minutes.",
      });
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-center">Enter Verification Code</h2>
      <p className="text-sm text-gray-500 text-center">
        Please enter the verification code sent to {email}
      </p>
      {timeLeft > 0 && (
        <p className="text-sm text-primary text-center">
          Code expires in: {formatTime(timeLeft)}
        </p>
      )}
      {timeLeft <= 0 && (
        <p className="text-sm text-destructive text-center">
          Code has expired. Please request a new one.
        </p>
      )}
      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
          disabled={isLoading || timeLeft <= 0}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.map((slot, index) => (
                <InputOTPSlot key={index} {...slot} index={index} />
              ))}
            </InputOTPGroup>
          )}
        />
      </div>
      <Button
        onClick={verifyOTP}
        className="w-full bg-primary text-white hover:bg-primary/90 transition-all shimmer"
        disabled={isLoading || timeLeft <= 0 || otp.length !== 6}
      >
        {isLoading ? "Verifying..." : "Verify Email"}
      </Button>
      <Button
        onClick={resendOTP}
        variant="ghost"
        className="w-full"
        disabled={isLoading || timeLeft > 0}
      >
        {timeLeft > 0 ? `Wait ${formatTime(timeLeft)} to resend` : "Resend Code"}
      </Button>
    </div>
  );
};

export default OTPVerification;