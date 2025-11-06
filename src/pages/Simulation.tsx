import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Heart, Lightbulb, Building, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "judge" | "founder";
  content: string;
  timestamp: Date;
}

const judgeConfig: Record<string, { icon: any; color: string; name: string }> = {
  vc: { icon: TrendingUp, color: "from-red-500 to-orange-500", name: "Venture Capitalist" },
  angel: { icon: Heart, color: "from-blue-500 to-cyan-500", name: "Angel Investor" },
  tech: { icon: Lightbulb, color: "from-purple-500 to-pink-500", name: "Tech Investor" },
  industry: { icon: Building, color: "from-green-500 to-emerald-500", name: "Industry Expert" },
};

const generateJudgeQuestion = (questionNumber: number, judgeType: string): string => {
  const questions: Record<string, string[]> = {
    vc: [
      "Let's start with the fundamentals. What problem are you solving, and how big is the market opportunity?",
      "Walk me through your unit economics. What's your customer acquisition cost versus lifetime value?",
      "Show me the numbers. What's your current traction, and what's your growth trajectory?",
      "Who are your main competitors, and why will you win this market?",
      "What are your revenue projections for the next 3 years? How did you arrive at these numbers?",
      "Tell me about your team. Why are you the right people to execute this vision?",
      "How much capital are you raising, and how will you deploy it? What milestones will this get you to?",
      "What's your exit strategy? Who would potentially acquire you, and why?",
    ],
    angel: [
      "I'd love to hear your story. What inspired you to start this company?",
      "Tell me about the problem you're solving. Have you experienced this pain point yourself?",
      "What's your vision for where this company could be in 5 years?",
      "How are you thinking about building your team and company culture?",
      "What keeps you up at night? What are your biggest challenges right now?",
      "How do you plan to acquire your first 100 customers?",
      "What feedback have you gotten from potential customers so far?",
      "What would success look like for you personally with this venture?",
    ],
    tech: [
      "Tell me about your technology stack. What makes your solution technically superior?",
      "What are your key technical differentiators? Do you have any proprietary technology or IP?",
      "How scalable is your platform? What happens when you 10x your user base?",
      "Walk me through your product roadmap. What are the critical features you're building next?",
      "How are you thinking about data security and privacy?",
      "What's your tech team's background? Do you have the right technical talent?",
      "How defensible is your technology? What prevents someone from copying your solution?",
      "What's your approach to product development and iteration?",
    ],
    industry: [
      "How well do you understand this market? Walk me through the industry dynamics.",
      "What's your go-to-market strategy? How will you reach your target customers?",
      "Who are the key players in this space, and what's your competitive positioning?",
      "How do you plan to achieve product-market fit? What evidence do you have so far?",
      "What are the biggest execution risks you're facing?",
      "Tell me about your distribution strategy. How will you scale customer acquisition?",
      "What regulatory or compliance challenges exist in your market?",
      "How do you plan to capture market share from incumbents?",
    ],
  };

  const judgeQuestions = questions[judgeType] || questions.vc;
  return judgeQuestions[questionNumber % judgeQuestions.length];
};

const Simulation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { startup, judgePersona, duration } = location.state || {};

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [startTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  const totalQuestions = 8;
  const judge = judgeConfig[judgePersona] || judgeConfig.vc;
  const JudgeIcon = judge.icon;

  useEffect(() => {
    if (!startup || !judgePersona) {
      toast.error("Invalid simulation setup");
      navigate("/start-simulation");
      return;
    }

    // Initial greeting
    setTimeout(() => {
      const greeting = `Hello! I'm your ${judge.name} for today's pitch session. I'm excited to learn about ${startup}. ${generateJudgeQuestion(0, judgePersona)}`;
      setMessages([{ role: "judge", content: greeting, timestamp: new Date() }]);
      setQuestionNumber(1);
    }, 1000);

    // Timer
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      role: "founder",
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setIsThinking(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      setIsThinking(false);

      if (questionNumber >= totalQuestions) {
        handleEndSession();
        return;
      }

      const response = generateJudgeQuestion(questionNumber, judgePersona);
      setMessages((prev) => [
        ...prev,
        { role: "judge", content: response, timestamp: new Date() },
      ]);
      setQuestionNumber((prev) => prev + 1);
    }, 2000 + Math.random() * 2000);
  };

  const handleEndSession = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis time
    setTimeout(() => {
      const sessionData = {
        startup,
        judgePersona,
        duration: elapsedTime,
        messages,
        timestamp: new Date().toISOString(),
      };

      navigate("/results", { state: sessionData });
    }, 3000);
  };

  const confirmEndSession = () => {
    if (messages.length < 4) {
      toast.error("Please answer at least 2 questions before ending the session");
      return;
    }

    if (confirm("Are you sure you want to end this session? You'll receive your feedback report.")) {
      handleEndSession();
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="bg-gradient-card backdrop-blur-sm p-12 text-center max-w-md">
          <CardContent className="space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-pulse">
              <Loader2 className="h-12 w-12 animate-spin" />
            </div>
            <h2 className="text-3xl font-bold">Analyzing Your Pitch...</h2>
            <p className="text-muted-foreground">
              Our AI is evaluating your responses across multiple dimensions including market
              understanding, business viability, and presentation clarity.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${judge.color} flex items-center justify-center`}>
              <JudgeIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{judge.name}</h2>
              <p className="text-sm text-muted-foreground">Pitching: {startup}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(elapsedTime)}</span>
            </div>
            <Button variant="destructive" onClick={confirmEndSession}>
              End Session
            </Button>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-4 bg-gradient-card backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm font-medium">
                Question {Math.min(questionNumber, totalQuestions)} of {totalQuestions}
              </span>
            </div>
            <Progress value={(questionNumber / totalQuestions) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 bg-gradient-card backdrop-blur-sm mb-4 overflow-hidden flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "founder" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-lg ${
                    message.role === "founder"
                      ? "bg-gradient-primary text-white ml-auto"
                      : "bg-card border border-border"
                  }`}
                >
                  <p className="text-sm mb-1 opacity-70">
                    {message.role === "founder" ? "You" : judge.name}
                  </p>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-4 rounded-lg bg-card border border-border">
                  <p className="text-sm mb-2 opacity-70">{judge.name} is thinking...</p>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card className="bg-gradient-card backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your response..."
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isThinking}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isThinking}
                className="bg-gradient-primary shadow-glow self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Simulation;
