import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/Page/HomePage/HomePage";
import RegisterPage from "./components/Page/RegistePage/RegisterPage";
import LoginPage from "./components/Page/LoginPage/LoginPage";
import FaqPage from "./components/Page/FaqPage/FaqPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Header />}>
          <Route path={'/'} element={<Footer />}>
            <Route path={'/'} element={<HomePage />}/>
            <Route path={'/register'} element={<RegisterPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/faq'} element={<FaqPage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
