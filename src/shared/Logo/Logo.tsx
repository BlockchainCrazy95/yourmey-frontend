import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/logo.svg";
import logoLightImg from "images/logoLight.svg";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
  isDark?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "",
  isDark = false
}) => {
  console.log("Logo isDark=", isDark)
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-primary-6000 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {isDark ? (
        <img
          className={`block max-h-12`}
          src={img}
          alt="Logo"
        />
      ) : (
        <img
          className="max-h-12 dark:block"
          src={imgLight}
          alt="Logo-Light"
        />
      )}
    </Link>
  );
};

export default Logo;
