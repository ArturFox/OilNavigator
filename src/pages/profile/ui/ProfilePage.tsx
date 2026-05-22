
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabase";

export function ProfilePage() {

  const navigate = useNavigate();

  async function handleLogout() {

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    return;
  }

  navigate("/signin", { replace: true });
}

  return (
    <main>
      Профиль
      <button onClick={handleLogout}>выйти</button>
    </main>
  );
}