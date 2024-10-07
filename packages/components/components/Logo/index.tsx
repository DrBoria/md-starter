import React from "react";

import LogoImage from "./logo.jpg";

export function Logo() {
  return <img src={LogoImage.src} style={{ height: "55%" }} alt="Fenix Logo" />;
}
