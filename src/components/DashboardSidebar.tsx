import { Home, Briefcase, Video, TrendingUp, CreditCard, User, Menu } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Briefcase, label: "My Startups", path: "/my-startups" },
  { icon: Video, label: "Simulations", path: "/start-simulation" },
  { icon: TrendingUp, label: "Session History", path: "/history" },
  { icon: CreditCard, label: "Subscription", path: "/subscription" },
  { icon: User, label: "Profile", path: "/profile" },
];

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 ${
          isOpen ? "w-64" : "w-0 md:w-20"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="mb-8">
            <h2 className={`text-xl font-bold bg-gradient-primary bg-clip-text text-transparent transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0 md:opacity-0"
            }`}>
              InnovatePitch
            </h2>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={logout}
          >
            {isOpen && "Logout"}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
