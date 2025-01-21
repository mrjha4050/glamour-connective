import { Navigation } from "@/components/Navigation";
import { PortfolioManager } from "@/components/PortfolioManager";

const PortfolioManagement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-white">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <PortfolioManager />
      </main>
    </div>
  );
};

export default PortfolioManagement;