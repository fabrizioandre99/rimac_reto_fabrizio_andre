import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import logoRimac from '../assets/images/logo-rimac.svg';

const Header: React.FC = () => {
  return (
    <header className="header py-4">
      <div className="container max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="header__logo">
          <img src={logoRimac} alt="RIMAC Logo" className="h-12" />
        </div>
        <div className="header__contact text-sm flex items-center">
          <span className="mr-4 font-bold text-black hidden md:block">¡Compra por este medio!</span>
          <a
            href="tel:+0114116001"
            className="header__contact-link flex items-center gap-2 text-lg text-black font-bold hover:underline"
          >
            <FontAwesomeIcon icon={faPhone} />
            <span>(01) 411 6001</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
