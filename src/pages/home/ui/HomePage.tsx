import { useGetBrigadesQuery } from "../../../api/brigades/brigades.api";
import { useGetPesonsQuery } from "../../../api/persons/persons.api";
import { useGetShiftsQuery } from "../../../api/shifts/shifts.api";
import { UserCalendar } from "../../../components/user_calendar";
import type { SessionType, UserRole } from "../../../features/auth/model/auth.types";
import { AdminHomePage } from "../admin-home-page";


interface Props {
  role: UserRole;
  session: SessionType;
}

export function HomePage({ role, session }: Props) {

  const personsQuery  = useGetPesonsQuery();
  const brigadesQuery = useGetBrigadesQuery();
  const shiftsQuery = useGetShiftsQuery();

  if(personsQuery.isLoading || brigadesQuery.isLoading || shiftsQuery.isLoading){

    return (
      <div>
        Loading...
      </div>
    )
  }

  if(session?.user.role === "authenticated"){

    if(role === "admin"){

      return <AdminHomePage />

    } else if (role === "user") {

      return <UserCalendar />

    } else {

      return

    }
  } else {

    return
    
  }
}