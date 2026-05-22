import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../../pages/home/ui/HomePage";
import type { AuthState } from "../../features/auth/model/auth.types";
import { ProfilePage } from "../../pages/profile/ui/ProfilePage";
// import { ScheduleChangePage } from "../../pages/schedule-change/ui/ScheduleChangePage";
// import { PeoplePage } from "../../pages/people/ui/PeoplePage";
// import { PersonChangePage } from "../../pages/person-change/ui/PersonChangePage";
import { SignPage } from "../../features/auth/ui/SignInPage";
import { WalletPage } from "../../pages/wallet/ui/WalletPage";

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
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage role={auth.role} session ={auth.session} />} />
          <Route path="wallet" element={<WalletPage/>}/>
          <Route path="profile" element={<ProfilePage />} />
          {/* <Route path="changeShift" element={<ScheduleChangePage/>} /> */}
          {/* <Route
            path="allPersons"
            element={<PeoplePage/>}
          /> */}
          {/* <Route
            path="changePerson"
            element={<PersonChangePage/>}
          /> */}
        </Route>

      </Routes>
    );
  }