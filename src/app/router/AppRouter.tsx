import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";
import type { AuthState } from "../../features/auth/model/auth.types";
import { SignPage } from "../../pages/SignPage/SignPage";
import { HomePage } from "../../pages/Home/HomePage";
import { CoreStaffReplacementPage } from "../../pages/CoreStaffReplacementPage/CoreStaffReplacementPage";
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";
import { AdminScheduleChange } from "../../pages/AdminScheduleChange/AdminScheduleChange";
import { ReplaseWorkerCoreAdd } from "@/pages/ReplaceWorker/ReplaseWorkerCoreAdd/ReplaseWorkerCoreAdd";

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

        {auth.role === "admin" && (
          <Route
            path="scheduleChangePage"
            element={<CoreStaffReplacementPage />}
          />
        )}

        <Route path="profile" element={<ProfilePage/>} />

        <Route path="userChange" element={<ReplaseWorkerCoreAdd/>}/>

        <Route path="calendarBrigadeChange" element={<AdminScheduleChange/>}/>
        
      </Route>

    </Routes>

  );
  
}