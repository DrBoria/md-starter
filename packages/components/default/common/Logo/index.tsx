import React from "react";

import LogoImage from "./logo.jpg";

export function Logo() {
  const src = (typeof LogoImage === 'object' && LogoImage !== null && 'src' in LogoImage) ? (LogoImage as { src: string }).src : LogoImage as string;
  return <img src={src} alt="Fenix Logo" />;
}
