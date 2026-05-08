import { NavLink } from "react-router-dom";
import { Home, Flame, Lock, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/challenges", label: "Challenges", icon: Flame },
  { to: "/secrets", label: "Secrets", icon: Lock },
  { to: "/profile", label: "My profile", icon: User },
];

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40"
      style={{ background: "#111008", borderTop: "1px solid rgba(245,215,142,0.15)" }}
    >
      <ul className="flex items-stretch justify-around px-2 pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2 text-[10px] tracking-wider uppercase ${
                  isActive ? "text-[#C97B1A]" : "text-[rgba(245,215,142,0.45)]"
                }`
              }
            >
              <Icon size={20} strokeWidth={1.5} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
