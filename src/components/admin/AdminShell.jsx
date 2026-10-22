import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import { useAuth } from "@/lib/AuthContext";

const tabs = [
  { label: "Inbox", to: "/admin" },
  { label: "Insights", to: "/admin/posts" },
];

export default function AdminShell({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [signOutError, setSignOutError] = useState("");

  const handleLogout = async () => {
    setSignOutError("");
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setSignOutError(error.message || "Unable to log out. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="bg-navy">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-3.5">
          <div className="flex items-center gap-3">
            <Link to="/"><Wordmark /></Link>
            <span className="rounded-full border border-lime/40 px-2.5 py-1 font-heading text-[9.5px] font-semibold uppercase tracking-[0.16em] text-lime">
              Studio admin
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <nav className="flex items-center gap-1.5" aria-label="Admin navigation">
              {tabs.map((tab) => (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  end={tab.to === "/admin"}
                  className={({ isActive }) => `rounded-lg px-3 py-2 font-heading text-xs font-semibold ${isActive ? "bg-lime text-navy" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
                >
                  {tab.label}
                </NavLink>
              ))}
            </nav>
            <span className="hidden text-xs text-white/70 sm:block">{user?.email}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-heading text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Log out
            </button>
          </div>
        </div>
        {signOutError && <p className="shell pb-3 text-sm text-red-200" role="alert">{signOutError}</p>}
      </header>
      <main className="shell w-full flex-1 py-10 sm:py-14">{children}</main>
    </div>
  );
}
