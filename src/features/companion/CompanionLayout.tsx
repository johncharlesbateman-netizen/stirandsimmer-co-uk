import { NavLink, Outlet } from "react-router-dom";
import { Compass, Home, Sparkles, User } from "lucide-react";

const navItems = [
  { to: "/app", end: true, label: "Home", Icon: Home },
  { to: "/app/explore", label: "Explore", Icon: Compass },
  { to: "/app/journey", label: "Journey", Icon: Sparkles },
  { to: "/app/profile", label: "Profile", Icon: User },
];

const CompanionLayout = () => {
  return (
    <div className="min-h-screen bg-companion-bg text-companion-fg">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <main className="flex-1 pb-24">
          <Outlet />
        </main>
        <nav className="fixed inset-x-0 bottom-0 z-50">
          <div className="mx-auto max-w-md border-t border-white/5 bg-companion-bg/90 backdrop-blur-md">
            <ul className="grid grid-cols-4">
              {navItems.map(({ to, label, Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `flex flex-col items-center gap-1 py-3 text-[11px] tracking-wide transition-colors ${
                        isActive ? "text-companion-amber" : "text-companion-muted"
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default CompanionLayout;
