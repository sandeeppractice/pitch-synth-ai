import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Video, Briefcase } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Startup {
  id: string;
  name: string;
  industry: string;
  problem: string;
  solution: string;
  targetMarket: string;
  businessModel: string;
  traction: string;
  fundingStage: string;
  teamSize: number;
  createdAt: string;
}

const MyStartups = () => {
  const [startups, setStartups] = useState<Startup[]>([
    {
      id: "1",
      name: "TechFlow",
      industry: "SaaS",
      problem: "Teams struggle with project management",
      solution: "AI-powered project management platform",
      targetMarket: "SMBs and enterprises",
      businessModel: "Subscription-based SaaS",
      traction: "1000+ active users",
      fundingStage: "Seed",
      teamSize: 5,
      createdAt: "2025-01-10",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingStartup, setEditingStartup] = useState<Startup | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    problem: "",
    solution: "",
    targetMarket: "",
    businessModel: "",
    traction: "",
    fundingStage: "",
    teamSize: 1,
  });

  const industries = ["SaaS", "FinTech", "HealthTech", "EdTech", "E-commerce", "AI/ML", "Other"];
  const fundingStages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"];

  const resetForm = () => {
    setFormData({
      name: "",
      industry: "",
      problem: "",
      solution: "",
      targetMarket: "",
      businessModel: "",
      traction: "",
      fundingStage: "",
      teamSize: 1,
    });
    setEditingStartup(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.industry || !formData.problem || !formData.solution) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingStartup) {
      setStartups(startups.map(s => 
        s.id === editingStartup.id 
          ? { ...s, ...formData }
          : s
      ));
      toast.success("Startup updated successfully!");
    } else {
      const newStartup: Startup = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setStartups([...startups, newStartup]);
      toast.success("Startup created successfully!");
    }

    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (startup: Startup) => {
    setEditingStartup(startup);
    setFormData({
      name: startup.name,
      industry: startup.industry,
      problem: startup.problem,
      solution: startup.solution,
      targetMarket: startup.targetMarket,
      businessModel: startup.businessModel,
      traction: startup.traction,
      fundingStage: startup.fundingStage,
      teamSize: startup.teamSize,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this startup?")) {
      setStartups(startups.filter(s => s.id !== id));
      toast.success("Startup deleted successfully!");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      
      <main className="flex-1 p-8 bg-gradient-hero">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Startups</h1>
              <p className="text-muted-foreground">Manage your startup profiles</p>
            </div>
            <Dialog open={isOpen} onOpenChange={(open) => {
              setIsOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary shadow-glow">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Startup
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingStartup ? "Edit Startup" : "Create New Startup"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Startup Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry/Category *</Label>
                      <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map(ind => (
                            <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="problem">Problem Statement *</Label>
                    <Textarea
                      id="problem"
                      value={formData.problem}
                      onChange={(e) => setFormData({...formData, problem: e.target.value})}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="solution">Solution Description *</Label>
                    <Textarea
                      id="solution"
                      value={formData.solution}
                      onChange={(e) => setFormData({...formData, solution: e.target.value})}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetMarket">Target Market</Label>
                    <Input
                      id="targetMarket"
                      value={formData.targetMarket}
                      onChange={(e) => setFormData({...formData, targetMarket: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessModel">Business Model</Label>
                    <Textarea
                      id="businessModel"
                      value={formData.businessModel}
                      onChange={(e) => setFormData({...formData, businessModel: e.target.value})}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="traction">Current Traction</Label>
                    <Input
                      id="traction"
                      value={formData.traction}
                      onChange={(e) => setFormData({...formData, traction: e.target.value})}
                      placeholder="e.g., 1000+ users, $50K MRR"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fundingStage">Funding Stage</Label>
                      <Select value={formData.fundingStage} onValueChange={(value) => setFormData({...formData, fundingStage: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {fundingStages.map(stage => (
                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Team Size</Label>
                      <Input
                        id="teamSize"
                        type="number"
                        min="1"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({...formData, teamSize: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1 bg-gradient-primary shadow-glow">
                      {editingStartup ? "Update Startup" : "Create Startup"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Startups Grid */}
          {startups.length === 0 ? (
            <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Briefcase className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No startups yet</h3>
                <p className="text-muted-foreground mb-6">Create your first startup profile to begin</p>
                <Button onClick={() => setIsOpen(true)} className="bg-gradient-primary shadow-glow">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Startup
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {startups.map((startup) => (
                <Card key={startup.id} className="bg-gradient-card backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{startup.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{startup.industry}</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary/20 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Problem</p>
                      <p className="text-sm line-clamp-2">{startup.problem}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs">
                        {startup.fundingStage}
                      </span>
                      <span>•</span>
                      <span>Team: {startup.teamSize}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEdit(startup)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(startup.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <Link to="/start-simulation" className="flex-1">
                        <Button size="sm" className="w-full bg-gradient-primary shadow-glow">
                          <Video className="h-3 w-3 mr-1" />
                          Pitch
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyStartups;
