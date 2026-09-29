//src/features/auth/model/useAuth.ts

import { useEffect, useState } from "react";
import type { AuthState, AuthStatus, SessionType, UserRole } from "./auth.types";
import { supabase } from "../../../shared/api/supabase/client";

export function useAuth(): AuthState {

  const [session, setSession] = useState<SessionType>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

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

    let isInitialLoading = true;

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

      const startTime = Date.now();

      const { data } = await supabase.auth.getSession();

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(1500 - elapsed, 0);

      await new Promise(resolve => setTimeout(resolve, remaining));

      await sync(data.session);

      isInitialLoading = false;

    })();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_, nextSession) => {

        if(isInitialLoading){
          return
        }

        sync(nextSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };

  }, []);

  return { session, role, status };
}