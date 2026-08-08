//src/features/auth/model/useAuth.ts

import { useEffect, useState } from "react";
import type { AuthState, SessionType, UserRole } from "./auth.types";
import { supabase } from "../../../shared/api/supabase/client";

export function useAuth(): AuthState {

  const [session, setSession] = useState<SessionType>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [status, setStatus] = useState<AuthState["status"]>("loading");

  async function loadRole(userId: string): Promise<UserRole> {

    const { data, error } = await supabase
      .from("persons")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) return null;

    return data?.role;
  }

  useEffect(() => {

    async function sync(session: SessionType) {

      if (!session) {
        setSession(null);
        setRole(null);
        setStatus("unauthenticated");
        return;
      }

      const userRole = await loadRole(session.user.id);

      setSession(session);
      setRole(userRole);
      setStatus("authenticated");
    }

    (async () => {
      const { data } = await supabase.auth.getSession();
      sync(data.session);
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_, nextSession) => {
        sync(nextSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };

  }, []);

  return { session, role, status };
}