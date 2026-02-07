import React from "react";

import LogoImage from "./logo.jpg";

export function Logo() {
  const src = (LogoImage as unknown as { src: string }).src || LogoImage;
  return <img src={src} alt="Fenix Logo" />;
}
