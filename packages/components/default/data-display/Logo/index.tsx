import React from "react";

import LogoImage from "./logo.jpg";

export function Logo() {
  const src = (LogoImage as any).src || LogoImage;
  return <img src={src} alt="Fenix Logo" />;
}
