import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { AuthState } from "../../features/auth/model/auth.types";
import { LoadingPage } from "../../pages/LoadingPage/LoadingPage";

interface Props {
  auth: AuthState;
  children: ReactNode;
}

export function ProtectedRoute({ auth, children }: Props) {

  if (auth.status === "loading") {
    return <LoadingPage/>;
  }

  if (!auth.session) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}