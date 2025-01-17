import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { SignupForm } from "@/components/SignupForm";
import TermsModal from "@/components/TermsModal";

const Signup = () => {
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <h1 className="text-3xl font-serif font-bold text-center gradient-text mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 text-center">
                Join GlamConnect and discover amazing artists
              </p>
            </CardHeader>
            <CardContent>
              <SignupForm onOpenTerms={() => setTermsModalOpen(true)} />
            </CardContent>
          </Card>
        </div>
      </div>
      <TermsModal open={termsModalOpen} onOpenChange={setTermsModalOpen} />
    </div>
  );
};

export default Signup;