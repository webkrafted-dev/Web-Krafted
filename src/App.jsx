import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import SiteLayout from "@/components/SiteLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

const Work = lazy(() => import("@/pages/Work"));
const CaseStudy = lazy(() => import("@/pages/CaseStudy"));
const Services = lazy(() => import("@/pages/Services"));
const Insights = lazy(() => import("@/pages/Insights"));
const InsightPost = lazy(() => import("@/pages/InsightPost"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Admin = lazy(() => import("@/pages/Admin"));
const AdminPosts = lazy(() => import("@/pages/AdminPosts"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));

function RoutePage({ page: Page }) {
  return (
    <Suspense
      fallback={(
        <div className="section" role="status">
          <div className="shell text-sm text-charcoal/60">Loading page…</div>
        </div>
      )}
    >
      <Page />
    </Suspense>
  );
}

function AuthenticatedApp() {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" role="status" aria-label="Loading">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<RoutePage page={Work} />} />
        <Route path="/work/:slug" element={<RoutePage page={CaseStudy} />} />
        <Route path="/services" element={<RoutePage page={Services} />} />
        <Route path="/insights" element={<RoutePage page={Insights} />} />
        <Route path="/insights/:slug" element={<RoutePage page={InsightPost} />} />
        <Route path="/about" element={<RoutePage page={About} />} />
        <Route path="/contact" element={<RoutePage page={Contact} />} />
        <Route path="/privacy" element={<RoutePage page={Privacy} />} />
        <Route path="/terms" element={<RoutePage page={Terms} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<RoutePage page={Admin} />} />
        <Route path="/admin/posts" element={<RoutePage page={AdminPosts} />} />
      </Route>
      <Route path="/login" element={<RoutePage page={Login} />} />
      <Route path="/register" element={<RoutePage page={Register} />} />
      <Route path="/forgot-password" element={<RoutePage page={ForgotPassword} />} />
      <Route path="/reset-password" element={<RoutePage page={ResetPassword} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <BrowserRouter>
          <ScrollToTop />
          <AuthenticatedApp />
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}
