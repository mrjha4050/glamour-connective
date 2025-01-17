import { useState } from "react";
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
  const { toast } = useToast();
  const navigate = useNavigate();

  const verifyOTP = async () => {
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
        description: "Your account has been verified. Please login.",
      });

      navigate("/login", {
        state: {
          email,
          message: "Account verified successfully. Please login.",
        },
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

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-center">Enter Verification Code</h2>
      <p className="text-sm text-gray-500 text-center">
        Please enter the verification code sent to your email
      </p>
      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
          disabled={isLoading}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.map((slot, i) => (
                <InputOTPSlot key={i} index={i} {...slot} />
              ))}
            </InputOTPGroup>
          )}
        />
      </div>
      <Button
        onClick={verifyOTP}
        className="w-full bg-primary text-white hover:bg-primary/90 transition-all shimmer"
        disabled={isLoading || otp.length !== 6}
      >
        {isLoading ? "Verifying..." : "Verify Email"}
      </Button>
    </div>
  );
};

export default OTPVerification;