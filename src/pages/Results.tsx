import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AlertCircle,
  Download,
  BarChart3,
  TrendingUp,
  Award,
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { toast } from "sonner";

interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  comment: string;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionData = location.state;

  const [overallScore, setOverallScore] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Simulate intelligent scoring based on conversation
  const calculateScore = () => {
    if (!sessionData?.messages) return 0;

    const founderMessages = sessionData.messages.filter((m: any) => m.role === "founder");
    
    // Score based on response quality indicators
    let baseScore = 60; // Base score
    
    // Length and detail bonus
    const avgLength = founderMessages.reduce((acc: number, m: any) => acc + m.content.length, 0) / founderMessages.length;
    if (avgLength > 200) baseScore += 10;
    else if (avgLength > 100) baseScore += 5;
    
    // Number of responses
    if (founderMessages.length >= 6) baseScore += 10;
    else if (founderMessages.length >= 4) baseScore += 5;
    
    // Keywords indicating good answers
    const goodKeywords = ["market", "revenue", "customer", "growth", "traction", "team", "competitive", "validation"];
    const mentionedKeywords = goodKeywords.filter(keyword => 
      founderMessages.some((m: any) => m.content.toLowerCase().includes(keyword))
    );
    baseScore += mentionedKeywords.length * 2;

    return Math.min(95, Math.max(50, baseScore));
  };

  const categoryScores: CategoryScore[] = [
    {
      name: "Market Opportunity",
      score: overallScore >= 75 ? 18 : overallScore >= 60 ? 15 : 12,
      maxScore: 20,
      comment: overallScore >= 75 ? "Strong market understanding" : "Good market awareness, needs more depth",
    },
    {
      name: "Business Model Viability",
      score: overallScore >= 75 ? 17 : overallScore >= 60 ? 14 : 11,
      maxScore: 20,
      comment: overallScore >= 75 ? "Clear monetization strategy" : "Model is viable but needs refinement",
    },
    {
      name: "Financial Understanding",
      score: overallScore >= 75 ? 16 : overallScore >= 60 ? 13 : 10,
      maxScore: 20,
      comment: overallScore >= 75 ? "Strong financial acumen" : "Basic understanding, more details needed",
    },
    {
      name: "Founder Clarity",
      score: overallScore >= 75 ? 19 : overallScore >= 60 ? 16 : 13,
      maxScore: 20,
      comment: overallScore >= 75 ? "Excellent communication and vision" : "Good articulation, could be more concise",
    },
    {
      name: "Competitive Positioning",
      score: overallScore >= 75 ? 17 : overallScore >= 60 ? 14 : 11,
      maxScore: 20,
      comment: overallScore >= 75 ? "Clear differentiation identified" : "Competitive awareness present",
    },
  ];

  const strengths = overallScore >= 75 ? [
    "Clear articulation of the problem and solution",
    "Strong understanding of target market",
    "Demonstrated traction and validation",
    "Compelling vision for growth",
    "Solid grasp of business fundamentals",
  ] : [
    "Good problem identification",
    "Basic market understanding",
    "Reasonable business model",
    "Passion for the venture",
  ];

  const improvements = overallScore >= 75 ? [
    "Provide more specific financial projections",
    "Elaborate on go-to-market strategy execution",
    "Strengthen competitive analysis with data",
  ] : [
    "Develop more detailed financial projections",
    "Provide concrete evidence of market validation",
    "Strengthen competitive differentiation story",
    "Add more specific metrics and traction data",
    "Practice clearer, more concise responses",
  ];

  const getRiskRating = (score: number) => {
    if (score >= 80) return { label: "Low Risk", color: "bg-green-500" };
    if (score >= 60) return { label: "Medium Risk", color: "bg-yellow-500" };
    return { label: "High Risk", color: "bg-red-500" };
  };

  useEffect(() => {
    if (!sessionData) {
      toast.error("No session data found");
      navigate("/dashboard");
      return;
    }

    const score = calculateScore();
    setOverallScore(score);

    // Animate score
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setAnimatedScore(current);
      if (current >= score) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const handleDownloadReport = () => {
    toast.success("Report download feature coming soon!");
  };

  const riskRating = getRiskRating(overallScore);

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />

      <main className="flex-1 p-8 bg-gradient-hero overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          {/* Hero Score Section */}
          <Card className="bg-gradient-card backdrop-blur-sm border-primary/30">
            <CardContent className="p-12 text-center">
              <Award className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4">Pitch Analysis Complete</h1>
              
              {/* Circular Progress Score */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="transform -rotate-90" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="hsl(var(--muted))"
                    strokeWidth="20"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="hsl(var(--primary))"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={`${(animatedScore / 100) * 502.4} 502.4`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {animatedScore}
                    </div>
                    <div className="text-sm text-muted-foreground">out of 100</div>
                  </div>
                </div>
              </div>

              <Badge className={`${riskRating.color} text-white px-6 py-2 text-lg mb-4`}>
                {riskRating.label}
              </Badge>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {overallScore >= 80
                  ? "Outstanding pitch! You demonstrated strong business acumen and clear vision. Investors would be highly interested."
                  : overallScore >= 60
                  ? "Good pitch with solid fundamentals. With some refinements, you'll be investment-ready."
                  : "Your pitch needs development. Focus on the areas below to strengthen your story."}
              </p>
            </CardContent>
          </Card>

          {/* Category Scores */}
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Detailed Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {categoryScores.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.score}/{category.maxScore}
                    </span>
                  </div>
                  <Progress value={(category.score / category.maxScore) * 100} className="h-3" />
                  <p className="text-sm text-muted-foreground">{category.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Strengths & Improvements */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="h-5 w-5" />
                  Key Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-500">
                  <AlertCircle className="h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* AI Feedback */}
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Detailed AI Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Your pitch demonstrated {overallScore >= 75 ? "strong" : "good"} understanding of the
                fundamental business elements. The way you articulated your value proposition showed
                {overallScore >= 75 ? " excellent" : ""} clarity and confidence.
              </p>
              <p>
                {overallScore >= 75
                  ? "Your responses were well-structured and showed deep market insight. Continue to refine your financial projections and add more data-driven validation to support your claims."
                  : "To improve, focus on providing more specific data points and metrics. Practice articulating your competitive advantages more clearly, and be prepared with concrete examples of customer validation."}
              </p>
              <p>
                Overall, {overallScore >= 75 ? "you're well-positioned" : "with focused practice, you'll be ready"}{" "}
                for investor meetings. Keep practicing and refining your story.
              </p>
            </CardContent>
          </Card>

          {/* Key Recommendations */}
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Key Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 list-decimal list-inside">
                <li className="text-sm">
                  Practice your pitch 10 more times focusing on the "Areas for Improvement" above
                </li>
                <li className="text-sm">
                  Prepare specific metrics and data points for each key question area
                </li>
                <li className="text-sm">
                  Record yourself and review to improve delivery and eliminate filler words
                </li>
                <li className="text-sm">
                  Get feedback from mentors or advisors in your industry
                </li>
                <li className="text-sm">
                  Create a detailed pitch deck to support your verbal presentation
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleDownloadReport}
              className="flex-1 bg-gradient-primary shadow-glow"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Link to="/start-simulation" className="flex-1">
              <Button variant="outline" className="w-full">
                Start New Session
              </Button>
            </Link>
            <Link to="/history" className="flex-1">
              <Button variant="outline" className="w-full">
                View All Sessions
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
