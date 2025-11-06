import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, MessageSquare, TrendingUp, Target, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Judge Avatars",
      description: "Practice with AI investors that simulate real-world funding scenarios",
    },
    {
      icon: MessageSquare,
      title: "Real-time Feedback",
      description: "Get instant feedback on your pitch delivery and content",
    },
    {
      icon: TrendingUp,
      title: "Investability Scoring",
      description: "Comprehensive scoring across key metrics that matter to investors",
    },
    {
      icon: Target,
      title: "Practice Sessions",
      description: "Unlimited practice sessions to perfect your pitch",
    },
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "₹0",
      sessions: "5 sessions/month",
      features: ["Basic AI feedback", "Text-based simulation", "Score reports"],
    },
    {
      name: "Pro",
      price: "₹999",
      sessions: "20 sessions/month",
      features: ["Advanced AI feedback", "Voice & video simulation", "Detailed analytics", "Priority support"],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      sessions: "Unlimited sessions",
      features: ["White-label solution", "Custom AI training", "Team management", "Dedicated support"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Practice Your Pitch, Perfect Your Story
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Master your startup pitch with AI-powered investor simulation. Get real-time feedback from virtual VCs and angels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary shadow-glow">
                  Get Started
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Everything You Need to Succeed
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-gradient-card backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Choose Your Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index}
                className={`relative ${
                  tier.highlighted 
                    ? "bg-gradient-card border-primary shadow-glow scale-105" 
                    : "bg-card/50 backdrop-blur-sm"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-primary px-4 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{tier.sessions}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth">
                    <Button 
                      className={`w-full ${
                        tier.highlighted 
                          ? "bg-gradient-primary shadow-glow" 
                          : ""
                      }`}
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">About InnovatePitch</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We help founders perfect their pitch through AI-powered simulation. Practice with confidence, 
            receive actionable feedback, and increase your chances of securing funding.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 InnovatePitch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
