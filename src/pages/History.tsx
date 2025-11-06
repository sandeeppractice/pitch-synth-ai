import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Filter, Download, TrendingUp, Eye, Trash2, History as HistoryIcon } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Session {
  id: string;
  date: string;
  time: string;
  startup: string;
  judgeType: string;
  duration: string;
  score: number;
  status: "Completed" | "In Progress";
}

const History = () => {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [filterStartup, setFilterStartup] = useState("all");
  const [filterJudge, setFilterJudge] = useState("all");

  // Mock data - in real app would come from backend
  const sessions: Session[] = [
    {
      id: "1",
      date: "2025-01-15",
      time: "14:30",
      startup: "TechFlow",
      judgeType: "Venture Capitalist",
      duration: "12:45",
      score: 85,
      status: "Completed",
    },
    {
      id: "2",
      date: "2025-01-14",
      time: "10:15",
      startup: "EcoStart",
      judgeType: "Angel Investor",
      duration: "10:20",
      score: 72,
      status: "Completed",
    },
    {
      id: "3",
      date: "2025-01-12",
      time: "16:45",
      startup: "FinTech Pro",
      judgeType: "Tech Investor",
      duration: "15:10",
      score: 89,
      status: "Completed",
    },
    {
      id: "4",
      date: "2025-01-10",
      time: "11:00",
      startup: "TechFlow",
      judgeType: "Industry Expert",
      duration: "11:30",
      score: 78,
      status: "Completed",
    },
    {
      id: "5",
      date: "2025-01-08",
      time: "09:30",
      startup: "EcoStart",
      judgeType: "Venture Capitalist",
      duration: "13:15",
      score: 68,
      status: "Completed",
    },
  ];

  const progressData = [
    { date: "Jan 8", score: 68 },
    { date: "Jan 10", score: 78 },
    { date: "Jan 12", score: 89 },
    { date: "Jan 14", score: 72 },
    { date: "Jan 15", score: 85 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500 bg-green-500/20";
    if (score >= 60) return "text-yellow-500 bg-yellow-500/20";
    return "text-red-500 bg-red-500/20";
  };

  const filteredSessions = sessions.filter((session) => {
    if (filterStartup !== "all" && session.startup !== filterStartup) return false;
    if (filterJudge !== "all" && session.judgeType !== filterJudge) return false;
    return true;
  });

  const toggleSessionSelection = (id: string) => {
    setSelectedSessions((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    const csv = [
      ["Date", "Time", "Startup", "Judge Type", "Duration", "Score", "Status"],
      ...filteredSessions.map((s) => [
        s.date,
        s.time,
        s.startup,
        s.judgeType,
        s.duration,
        s.score.toString(),
        s.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pitch-sessions.csv";
    a.click();
  };

  if (sessions.length === 0) {
    return (
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8 bg-gradient-hero">
          <div className="max-w-7xl mx-auto">
            <Card className="bg-gradient-card backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <HistoryIcon className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No Sessions Yet</h3>
                <p className="text-muted-foreground mb-6 text-center max-w-md">
                  Start your first pitch simulation to see your session history and track your
                  progress over time.
                </p>
                <Link to="/start-simulation">
                  <Button className="bg-gradient-primary shadow-glow">
                    Start Your First Session
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />

      <main className="flex-1 p-8 bg-gradient-hero overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Session History</h1>
              <p className="text-muted-foreground">Track your pitch practice progress</p>
            </div>
            <Button onClick={handleExportCSV} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Progress Chart */}
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Score Progress Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Startup
                  </label>
                  <Select value={filterStartup} onValueChange={setFilterStartup}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Startups" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Startups</SelectItem>
                      <SelectItem value="TechFlow">TechFlow</SelectItem>
                      <SelectItem value="EcoStart">EcoStart</SelectItem>
                      <SelectItem value="FinTech Pro">FinTech Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Judge Type
                  </label>
                  <Select value={filterJudge} onValueChange={setFilterJudge}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Judges" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Judges</SelectItem>
                      <SelectItem value="Venture Capitalist">Venture Capitalist</SelectItem>
                      <SelectItem value="Angel Investor">Angel Investor</SelectItem>
                      <SelectItem value="Tech Investor">Tech Investor</SelectItem>
                      <SelectItem value="Industry Expert">Industry Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date Range
                  </label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-0">Action</label>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setFilterStartup("all");
                      setFilterJudge("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Mode Info */}
          {selectedSessions.length > 0 && (
            <Card className="bg-primary/10 border-primary/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {selectedSessions.length} session(s) selected for comparison
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedSessions([])}>
                      Clear
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-primary"
                      disabled={selectedSessions.length < 2}
                    >
                      Compare Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sessions Table */}
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle>All Sessions ({filteredSessions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-medium">
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={selectedSessions.length === filteredSessions.length}
                          onChange={(e) =>
                            setSelectedSessions(
                              e.target.checked ? filteredSessions.map((s) => s.id) : []
                            )
                          }
                        />
                      </th>
                      <th className="text-left p-4 font-medium">Date & Time</th>
                      <th className="text-left p-4 font-medium">Startup</th>
                      <th className="text-left p-4 font-medium">Judge Type</th>
                      <th className="text-left p-4 font-medium">Duration</th>
                      <th className="text-left p-4 font-medium">Score</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSessions.map((session) => (
                      <tr
                        key={session.id}
                        className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            className="rounded"
                            checked={selectedSessions.includes(session.id)}
                            onChange={() => toggleSessionSelection(session.id)}
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{session.date}</div>
                            <div className="text-sm text-muted-foreground">{session.time}</div>
                          </div>
                        </td>
                        <td className="p-4 font-medium">{session.startup}</td>
                        <td className="p-4 text-sm">{session.judgeType}</td>
                        <td className="p-4 font-mono text-sm">{session.duration}</td>
                        <td className="p-4">
                          <Badge className={getScoreColor(session.score)}>
                            {session.score}/100
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={session.status === "Completed" ? "default" : "secondary"}
                          >
                            {session.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Link to="/results" state={{ sessionId: session.id }}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default History;
