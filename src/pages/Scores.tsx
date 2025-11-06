import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Scores = () => {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <main className="flex-1 p-8 bg-gradient-hero">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Scores & Feedback</h1>
          <p className="text-muted-foreground mb-8">Coming soon...</p>
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Your Performance History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Performance analytics will be displayed here.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Scores;
