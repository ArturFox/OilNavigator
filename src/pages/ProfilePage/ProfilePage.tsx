import { useNavigate } from "react-router-dom";
import { supabase } from "../../shared/api/supabase/client";
import styles from './ProfilePage.module.scss';
import { LogOut } from "lucide-react";

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
    <main
        className={styles['scheduleChange']}
    >
      
        <h4
            className={styles['scheduleChange__title']}
        >
            Профиль
        </h4>

        <button 
            className={styles['scheduleChange__logOut']}
            onClick={handleLogout}
        >
            <LogOut/>
            выйти
        </button>
    </main>
  );
}