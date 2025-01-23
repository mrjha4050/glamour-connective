import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import LoginForm from "@/components/auth/LoginForm";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { SignupForm } from "@/components/SignupForm";
import TermsModal from "@/components/TermsModal";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const message = location.state?.message;
  const email = location.state?.email || "";

  const handleLoginSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <Card className="p-8 shadow-lg border-none">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-serif font-bold text-primary">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h1>
                <p className="text-muted-foreground">
                  {isSignUp
                    ? "Join GlamConnect today"
                    : "Sign in to your GlamConnect account"}
                </p>
              </div>

              {message && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              {isSignUp ? (
                <SignupForm onOpenTerms={() => setShowTerms(true)} />
              ) : (
                <LoginForm
                  email={email}
                  onSuccess={handleLoginSuccess}
                  onSignUpClick={() => setIsSignUp(true)}
                />
              )}
            </div>
          </Card>
        </div>
      </div>
      <TermsModal open={showTerms} onOpenChange={setShowTerms} />
    </div>
  );
};

export default Login;