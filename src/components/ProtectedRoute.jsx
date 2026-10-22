import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, isAdmin, isLoadingAuth, authError } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" role="status" aria-label="Checking access">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (isAdmin) return <Outlet />;

  return (
    <main className="shell flex min-h-screen max-w-2xl flex-col items-center justify-center text-center">
      <h1 className="font-heading text-3xl font-semibold text-navy">Admin access required</h1>
      <p className="mt-3 text-charcoal/70">
        {authError || "This account has not been granted studio administrator access."}
      </p>
      <a href="/" className="mt-6 font-heading font-semibold text-navy underline decoration-lime decoration-2 underline-offset-4">
        Return to the website
      </a>
    </main>
  );
}
