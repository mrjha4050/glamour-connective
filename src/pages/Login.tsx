import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";
import TermsModal from "@/components/TermsModal";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;
  const email = location.state?.email;
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const handleLoginSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <h1 className="text-3xl font-serif font-bold text-center text-primary mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-primary text-center">
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
              {isSignUp ? (
                <SignUpForm
                  email={email || ""}
                  onSuccess={() => setIsSignUp(false)}
                  onLoginClick={() => setIsSignUp(false)}
                  onTermsClick={() => setTermsModalOpen(true)}
                />
              ) : (
                <LoginForm
                  email={email || ""}
                  onSuccess={handleLoginSuccess}
                  onSignUpClick={() => setIsSignUp(true)}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <TermsModal open={termsModalOpen} onOpenChange={setTermsModalOpen} />
    </div>
  );
};

export default Login;