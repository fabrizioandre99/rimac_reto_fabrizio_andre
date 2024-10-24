import React from "react";
import logoRimac from '../assets/images/logo-rimac-white.svg';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-black text-white py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="footer__left mb-4 md:mb-0">
            <img
              src={logoRimac}
              alt="RIMAC Logo"
              className="footer__logo h-12 mx-auto md:mx-0"
            />
          </div>
          {/* Línea blanca visible solo en móviles en el medio */}
          <div className="border-t border-white w-full md:hidden mb-4"></div>
          <div className="footer__right text-sm text-center md:text-left">
            © 2024 RIMAC Seguros y Reaseguros.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
