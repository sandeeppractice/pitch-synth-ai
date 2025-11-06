import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Subscription = () => {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <main className="flex-1 p-8 bg-gradient-hero">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Subscription</h1>
          <p className="text-muted-foreground mb-8">Manage your plan and billing</p>
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Current Plan: Pro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Billing and subscription management coming soon.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
