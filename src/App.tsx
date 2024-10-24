import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Planes from "./components/Planes/Planes";
import blueBlur from './assets/images/img-blur-blue.png';
import violetBlur from './assets/images/img-blur-violet.png';
import "./App.css";

const App: React.FC = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  return (
    <div className={`App relative min-h-screen overflow-hidden bg-[#F8F9FF]`}>
      {isHomeRoute && (
        <>
          <img
            src={blueBlur}
            alt="Fondo difuminado azul"
            className="absolute top-0 right-0 w-[160px] md:w-[390px] pointer-events-none z-0"
          />
          <img
            src={violetBlur}
            alt="Fondo difuminado violeta"
            className="absolute bottom-0 left-0 w-[160px] md:w-[450px] pointer-events-none z-0"
          />
        </>
      )}

      <div className="relative z-10">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planes" element={<Planes />} />
        </Routes>
        {isHomeRoute && <Footer />}
      </div>
    </div>
  );
};

export default App;
