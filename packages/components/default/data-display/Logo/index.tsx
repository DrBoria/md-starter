import React from "react";

import LogoImage from "./logo.jpg";

export function Logo() {
  const src = (LogoImage as any).src || LogoImage;
  return <img src={src} style={{ height: "55%" }} alt="Fenix Logo" />;
}
