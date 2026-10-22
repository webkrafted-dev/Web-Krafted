import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(isSupabaseConfigured);
  const [authError, setAuthError] = useState("");

  const syncSession = useCallback(async (session) => {
    const currentUser = session?.user ?? null;
    setUser(currentUser);
    setAuthError("");

    if (!currentUser || !supabase) {
      setIsAdmin(false);
      setIsLoadingAuth(false);
      return;
    }

    const { data, error } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", currentUser.id)
      .maybeSingle();

    if (error) {
      console.error("Unable to verify admin membership:", error.message);
      setAuthError("Admin access could not be verified. Check that the Supabase schema is installed.");
      setIsAdmin(false);
    } else {
      setIsAdmin(Boolean(data));
    }

    setIsLoadingAuth(false);
  }, []);

  useEffect(() => {
    if (!supabase) return undefined;

    let active = true;
    const applySession = async (session) => {
      if (!active) return;
      setIsLoadingAuth(true);
      try {
        await syncSession(session);
      } catch (error) {
        console.error("Unable to read the current Supabase session:", error.message);
        if (active) {
          setUser(null);
          setIsAdmin(false);
          setAuthError("Unable to check your sign-in status. Please reload and try again.");
          setIsLoadingAuth(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => {
        void applySession(session);
      }, 0);
    });

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (error) throw error;
        return applySession(data.session);
      })
      .catch((error) => {
        console.error("Unable to restore the Supabase session:", error.message);
        if (active) {
          setAuthError("Unable to check your sign-in status. Please reload and try again.");
          setIsLoadingAuth(false);
        }
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [syncSession]);

  const logout = useCallback(async () => {
    if (!supabase) throw new Error("Supabase is not configured.");
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const value = useMemo(() => ({
    user,
    isAdmin,
    isAuthenticated: Boolean(user),
    isLoadingAuth,
    authError,
    isConfigured: isSupabaseConfigured,
    logout,
  }), [user, isAdmin, isLoadingAuth, authError, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider.");
  return context;
}