import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/Page/HomePage/HomePage";
import RegisterPage from "./components/Page/RegistePage/RegisterPage";
import LoginPage from "./components/Page/LoginPage/LoginPage";
import FaqPage from "./components/Page/FaqPage/FaqPage";
import { Toaster } from "react-hot-toast";
import GameHeader from "./components/Game/GameHeader/GameHeader";
import LastNewsPage from "./components/Game/Page/LastNewsPage/LastNewsPage";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async() => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if(!res.ok) {
          throw new Error(data.error || "Something went wrong.");
      }
      console.log('Auth usere is here:', data);
      return data;
      } catch (error) {
        throw new Error(error);
      }
    }
  });

  //TODO
  // if(isLoading) {
  //   return (
  //     <div className="h-screen">
  //       loading spinner
  //     </div>
  //   )
  // }

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Header />}>
          <Route path={'/'} element={<Footer />}>
            <Route path={'/'} element={<HomePage />}/>
            <Route path={'/register'} element={!authUser ? <RegisterPage /> : <Navigate to={'/game'} />} />
            <Route path={'/login'} element={!authUser ? <LoginPage /> : <Navigate to={'/game'} />} />
            <Route path={'/faq'} element={<FaqPage />} />
          </Route>
        </Route>
        <Route path="/game" element={authUser ? <GameHeader /> : <Navigate to={'/login'} />}>
        <Route path="/game" element={authUser ? <LastNewsPage /> : <Navigate to={'/login'} />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
