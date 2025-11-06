import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Video, TrendingUp, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: "Total Sessions", value: "12", icon: Video, change: "+3 this week" },
    { title: "Average Score", value: "7.8/10", icon: TrendingUp, change: "+0.5 from last" },
    { title: "Sessions Remaining", value: "8", icon: Activity, change: "Pro plan" },
    { title: "Active Startups", value: "3", icon: Briefcase, change: "2 recent" },
  ];

  const recentSessions = [
    { date: "2025-01-15", startup: "TechFlow", score: "8.5/10", status: "Completed" },
    { date: "2025-01-14", startup: "EcoStart", score: "7.2/10", status: "Completed" },
    { date: "2025-01-12", startup: "FinTech Pro", score: "8.9/10", status: "Completed" },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      
      <main className="flex-1 p-8 bg-gradient-hero">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome */}
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user?.name || "Founder"}!
            </h1>
            <p className="text-muted-foreground">
              Here's your pitch practice overview
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card backdrop-blur-sm border-border/50 animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Link to="/my-startups" className="flex-1">
                <Button className="w-full bg-gradient-primary shadow-glow">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Create New Startup
                </Button>
              </Link>
              <Link to="/start-simulation" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Video className="mr-2 h-4 w-4" />
                  Start Simulation
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Startup Name</th>
                      <th className="text-left p-4 font-medium">Score</th>
                      <th className="text-left p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSessions.map((session, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="p-4">{session.date}</td>
                        <td className="p-4 font-medium">{session.startup}</td>
                        <td className="p-4">
                          <span className="text-primary font-semibold">{session.score}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                            {session.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Status */}
          <Card className="bg-gradient-primary/10 border-primary/30">
            <CardHeader>
              <CardTitle>Subscription Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-2xl font-bold">Pro Plan</p>
                  <p className="text-muted-foreground">8 of 20 sessions remaining this month</p>
                </div>
                <Button variant="outline">
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
