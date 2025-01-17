import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsModal = ({ open, onOpenChange }: TermsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read our terms and conditions carefully
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold">1. User Agreement</h3>
            <p>
              Users must provide accurate and truthful information when using GlamConnect.
              Any false or misleading information may result in account termination.
            </p>

            <h3 className="font-semibold">2. Privacy Policy</h3>
            <p>
              We are committed to protecting your privacy. Your personal information will
              be handled securely and only used for the purposes outlined in our privacy policy.
            </p>

            <h3 className="font-semibold">3. Platform Usage</h3>
            <p>
              GlamConnect serves as a platform connecting users with beauty artists.
              We do not provide beauty services directly and hold no liability for
              services provided by artists through our platform.
            </p>

            <h3 className="font-semibold">4. User Conduct</h3>
            <p>
              Users agree to:
              - Not misuse the platform or attempt to gain unauthorized access
              - Respect other users and artists
              - Not engage in harassment or abusive behavior
              - Not use the platform for illegal activities
            </p>

            <h3 className="font-semibold">5. Account Security</h3>
            <p>
              Users are responsible for maintaining the security of their account
              credentials and must notify us immediately of any unauthorized use.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;