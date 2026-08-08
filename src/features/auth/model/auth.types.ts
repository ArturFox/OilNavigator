//src/features/auth/model/auth.types.ts

import type { Session } from "@supabase/supabase-js";

export type UserRole = "admin" | "user" | null;
export type AuthStatus = "loading" | "authenticated" | "unauthenticated";
export type SessionType = Session | null;

export interface AuthState {
    session: SessionType
    role: UserRole;
    status: AuthStatus;
}