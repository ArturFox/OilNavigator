import { Navigate } from "react-router-dom";
import type { SessionType, UserRole } from "../../features/auth/model/auth.types";
import { AdminHomePage } from "./adminPage/AdminHomePage";


interface Props {
  role: UserRole;
  session: SessionType;
}

export function HomePage({ role, session }: Props) {

  if(session?.user.role === "authenticated"){

    if(role === "admin"){

      return <AdminHomePage/>

    } else if (role === "user") {

      return <div>Пока нету</div>

    } 

  } else {

    return <Navigate to="/signin" replace />
    
  }
}