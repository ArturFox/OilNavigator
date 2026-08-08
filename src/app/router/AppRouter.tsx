import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";
import type { AuthState } from "../../features/auth/model/auth.types";
import { ProfilePage } from "../../pages/profile/ui/ProfilePage";
import { SignPage } from "../../pages/signIn/SignPage";
import { HomePage } from "../../pages/home/HomePage";
import { ScheduleChangePage } from "../../pages/ScheduleChangePage/ScheduleChangePage";
import { CreateVacation } from "../../pages/createVacation/CreateVacation";
import { UserChange } from "../../pages/UserChange/ui/UserChange";

interface Props {

  auth: AuthState;

}

export function AppRouter({ auth }: Props) {

  return (

    <Routes>

      <Route
        path="/signin"
        element={auth.session ? <Navigate to="/" replace /> : <SignPage />}
      />
      
      <Route
        path="*"
        element={
          <ProtectedRoute auth={auth}>
            <MainLayout role={auth.role}/>
          </ProtectedRoute>
        }
      >

        <Route 
          index element={<HomePage role={auth.role} session ={auth.session} />} 
        />


        {auth.role === 'admin' && (
          <Route
            path="createVacation"
            element={<CreateVacation/>}
          />
        )}

        {auth.role === "admin" && (
          <Route
            path="scheduleChangePage"
            element={<ScheduleChangePage />}
          />
        )}

        <Route path="profile" element={<ProfilePage/>} />

        <Route path="userChange" element={<UserChange/>}/>
        
      </Route>

    </Routes>

  );
  
}