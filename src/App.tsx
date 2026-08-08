import { useAuth } from "./features/auth/model/useAuth";
import { AppRouter } from "./app/router/AppRouter";
import type { AuthState } from "./features/auth/model/auth.types";

export default function App() {

  const auth: AuthState = useAuth();

  return <AppRouter auth={auth}/>;
}