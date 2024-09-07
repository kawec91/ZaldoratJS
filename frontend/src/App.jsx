import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/Page/HomePage/HomePage";
import RegisterPage from "./components/Page/RegistePage/RegisterPage";
import LoginPage from "./components/Page/LoginPage/LoginPage";
import FaqPage from "./components/Page/FaqPage/FaqPage";
import { Toaster } from "react-hot-toast";
import GameHeader from "./components/Game/GameHeader/GameHeader";
import AccountSettings from "./components/Game/AccountSettings/AccountSettings";
import AccountPage from "./components/Game/Page/AccountPage/AccountPage";
import CharacterCreatorPage from "./components/Game/Page/CharacterCreatorPage/CharacterCreatorPage";
import InGameLayout from "./components/Game/Page/InGameLayout/InGameLayout";
import AdminPage from "./components/Game/Page/AdminPage/AdminPage";
import AdminRacePage from "./components/Game/Page/AdminRacePage/AdminRacePage";
import AdminClasPage from "./components/Game/Page/AdminClasPage/AdminClasPage";
import AdminFaithPage from "./components/Game/Page/AdminFaithPage.jsx/AdminFaithPage";
import ChangeLogPage from "./components/Game/Page/ChangeLogPage/ChangeLogPage";
import StatsPage from "./components/Game/Page/StatsPage/StatsPage";
import EquipmentPage from "./components/Game/Page/EquipmentPage/EquipmentPage";
import Travel from "./components/Game/Page/TravelPage/TravelPage";
import GoodsPage from "./components/Game/Page/GoodsPage/GoodsPage";
// Góry
import BariermountainsPage from "./components/Game/Page/MountainsPage/BariermountainsPage";
import WhitemountainsPage from "./components/Game/Page/MountainsPage/WhitemountainsPage";
import GlassmountainsPage from "./components/Game/Page/MountainsPage/GlassmountainsPage";
import SandmountainsPage from "./components/Game/Page/MountainsPage/SandmountainsPage";
// Character creator
import SelectRacePage from "./components/Game/Page/CharacterCreatorPage/SelectRacePage";
import SelectDeityPage from "./components/Game/Page/CharacterCreatorPage/SelectDeityPage";
import SelectClassPage from "./components/Game/Page/CharacterCreatorPage/SelectClassPage";
import SelectGenderPage from "./components/Game/Page/CharacterCreatorPage/SelectGenderPage";
import SummaryPage from "./components/Game/Page/CharacterCreatorPage/SummaryPage";
import SelectNamePage from "./components/Game/Page/CharacterCreatorPage/SelectNamePage";
import SelectAncestryPage from "./components/Game/Page/CharacterCreatorPage/SelectAncestryPage";
import SelectLocationPage from "./components/Game/Page/CharacterCreatorPage/SelectLocationPage";
import { useQuery } from "@tanstack/react-query";


function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.error) return null; // Handle error case
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong.");
        }
        console.log('Auth user is here:', data);
        return data; // Successful authentication
      } catch (error) {
        console.error(error); // Log the error for debugging
        return null; // Ensure null is returned on error
      }
    },
    retry: false,
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p> {/* You can replace this with a loading spinner */}
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Footer />}>
            <Route index element={<HomePage />} />
            <Route path="register" element={!authUser ? <RegisterPage /> : <Navigate to="/game" />} />
            <Route path="login" element={!authUser ? <LoginPage /> : <Navigate to="/game" />} />
            <Route path="faq" element={<FaqPage />} />
          </Route>
        </Route>
        <Route path="/game" element={authUser ? <GameHeader /> : <Navigate to="/login" />}>
          <Route index element={authUser ? <AccountPage /> : <Navigate to="/login" />} />
          <Route path="account" element={authUser ? <AccountSettings /> : <Navigate to="/login" />} />
          <Route path="new-character" element={authUser ? <CharacterCreatorPage /> : <Navigate to="/login" />} />
          <Route path="new-character/game/selectrace" element={authUser ? <SelectRacePage /> : <Navigate to="/login" />} />
          <Route path="new-character/game/selectrace/selectancestry/selectclass" element={authUser ? <SelectClassPage /> : <Navigate to="/login" />} />
          <Route path="new-character/game/selectrace/selectancestry/selectclass/selectdeity" element={authUser ? <SelectDeityPage /> : <Navigate to="/login" />} />
          <Route path="new-character/game/selectrace/selectancestry/selectclass/selectdeity/selectgender" element={authUser ? <SelectGenderPage /> : <Navigate to="/login" />} />
          <Route path="new-character/game/selectrace/selectancestry/selectclass/selectdeity/selectgender/selectname" element={authUser ? <SelectNamePage /> : <Navigate to="/login" />} />
          <Route path="new-character/game/selectrace/selectancestry" element={authUser ? <SelectAncestryPage /> : <Navigate to="/login" />} />
          <Route path="new-character/game/selectrace/selectancestry/selectclass/selectdeity/selectgender/selectname/selectlocation" element={authUser ? <SelectLocationPage authUser={authUser} /> : <Navigate to="/login" />} />

          <Route path="new-character/game/selectrace/selectancestry/selectclass/selectdeity/selectgender/selectname/selectlocation/summary" element={authUser ? <SummaryPage authUser={authUser} /> : <Navigate to="/login" />} />
        </Route>
        <Route path="/game/play" element={<InGameLayout />}>
          <Route index element={<ChangeLogPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="equipment" element={<EquipmentPage />} />
          <Route path="travel" element={<Travel />} />
          <Route path="goods" element={<GoodsPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/race" element={<AdminRacePage />} />
          <Route path="admin/class" element={<AdminClasPage />} />
          <Route path="admin/faith" element={<AdminFaithPage />} />
          <Route path="mountains/barier" element={<BariermountainsPage />} />
          <Route path="mountains/white" element={<WhitemountainsPage />} />
          <Route path="mountains/glass" element={<GlassmountainsPage />} />
          <Route path="mountains/sand" element={<SandmountainsPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
