import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Mic, Video, TrendingUp, Heart, Lightbulb, Building } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { toast } from "sonner";

const StartSimulation = () => {
  const [selectedStartup, setSelectedStartup] = useState("");
  const [simulationType, setSimulationType] = useState("");
  const [judgePersona, setJudgePersona] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const startups = ["TechFlow", "EcoStart", "FinTech Pro"];

  const simulationTypes = [
    {
      id: "text",
      title: "Text-based Chat",
      description: "Fastest way to practice your pitch",
      icon: MessageSquare,
      badge: "Fastest",
    },
    {
      id: "voice",
      title: "Voice Simulation",
      description: "Practice with voice interaction",
      icon: Mic,
      badge: "Recommended",
    },
    {
      id: "video",
      title: "Video Simulation",
      description: "Full experience with AI avatar",
      icon: Video,
      badge: "Premium",
    },
  ];

  const judgePersonas = [
    {
      id: "vc",
      title: "Venture Capitalist",
      personality: "Aggressive, ROI-focused",
      focus: ["Market size", "Scalability", "Revenue model"],
      color: "from-red-500 to-orange-500",
      icon: TrendingUp,
    },
    {
      id: "angel",
      title: "Angel Investor",
      personality: "Supportive, mentoring style",
      focus: ["Team strength", "Vision", "Passion"],
      color: "from-blue-500 to-cyan-500",
      icon: Heart,
    },
    {
      id: "tech",
      title: "Tech Investor",
      personality: "Product and innovation focused",
      focus: ["Technology", "Innovation", "Competitive advantage"],
      color: "from-purple-500 to-pink-500",
      icon: Lightbulb,
    },
    {
      id: "industry",
      title: "Industry Expert",
      personality: "Market and execution focused",
      focus: ["Market fit", "Execution", "Go-to-market"],
      color: "from-green-500 to-emerald-500",
      icon: Building,
    },
  ];

  const handleStartSimulation = () => {
    if (!selectedStartup || !simulationType || !judgePersona || !duration || !difficulty) {
      toast.error("Please complete all selections");
      return;
    }

    toast.success("Starting simulation...");
    // In real app, would navigate to simulation page
  };

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      
      <main className="flex-1 p-8 bg-gradient-hero">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Start Simulation</h1>
            <p className="text-muted-foreground">Set up your pitch practice session</p>
          </div>

          {/* Startup Selection */}
          <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Select Startup</CardTitle>
              <CardDescription>Choose which startup you want to pitch</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedStartup} onValueChange={setSelectedStartup}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your startup" />
                </SelectTrigger>
                <SelectContent>
                  {startups.map(startup => (
                    <SelectItem key={startup} value={startup}>{startup}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Simulation Type */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Simulation Type</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {simulationTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    simulationType === type.id
                      ? "bg-gradient-card border-primary shadow-glow scale-105"
                      : "bg-card/50 backdrop-blur-sm hover:shadow-card"
                  }`}
                  onClick={() => setSimulationType(type.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <type.icon className="h-8 w-8 text-primary" />
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                        {type.badge}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Judge Persona */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">AI Judge Persona</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {judgePersonas.map((judge) => (
                <Card
                  key={judge.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    judgePersona === judge.id
                      ? "bg-gradient-card border-primary shadow-glow scale-105"
                      : "bg-card/50 backdrop-blur-sm hover:shadow-card"
                  }`}
                  onClick={() => setJudgePersona(judge.id)}
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${judge.color} flex items-center justify-center mb-4 mx-auto`}>
                      <judge.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg text-center">{judge.title}</CardTitle>
                    <CardDescription className="text-center">{judge.personality}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2 text-center">Focus areas:</p>
                    <ul className="space-y-1">
                      {judge.focus.map((item, i) => (
                        <li key={i} className="text-sm text-center">• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Session Preferences */}
          <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Session Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty Level</label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Panel */}
          <Card className="bg-gradient-primary/10 border-primary/30">
            <CardHeader>
              <CardTitle>What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">• The AI judge will ask questions based on your startup profile</p>
              <p className="text-sm">• You'll receive real-time feedback on your responses</p>
              <p className="text-sm">• Session will be recorded for your review</p>
              <p className="text-sm">• You'll get a detailed score report at the end</p>
            </CardContent>
          </Card>

          {/* Begin Button */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary shadow-glow px-12"
              onClick={handleStartSimulation}
            >
              Begin Simulation
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartSimulation;
