import { useAuth } from "./features/auth/model/useAuth";
import { AppRouter } from "./app/router/AppRouter";

export default function App() {

  const auth = useAuth();

  return <AppRouter auth={auth}/>;
}