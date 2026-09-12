import { useAuth } from "./features/auth/model/useAuth";
import { AppRouter } from "./app/router/AppRouter";
import type { AuthState } from "./features/auth/model/auth.types";
import { Toaster } from "sonner";

export default function App() {

  const auth: AuthState = useAuth();

  return (
    <>
      <Toaster position="top-right" richColors />
      <AppRouter auth={auth}/>
    </>
  )
}