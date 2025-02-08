import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";

// @ts-ignore
import getApp from "../../../../../apps/keystone/.keystone/admin/pages/_app";

import "./cssFixes.css";

import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

interface TKeystoneProvider {
  children: ReactNode;
}

const KeystoneProvider = ({ children }: TKeystoneProvider) => {
  // Fix for next router inside keystone
  const nextRouterMock = {
    basePath: "",
    pathname: "/",
    route: "/",
    asPath: "/",
    query: {},
    push: () => Promise.resolve(true),
    replace: () => Promise.resolve(true),
    reload: console.log,
    back: console.log,
    forward: console.log,
    prefetch: () => Promise.resolve(),
    beforePopState: console.log,
    events: {
      on: console.log,
      off: console.log,
      emit: console.log,
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
  };

  // Fix to register MSW before styleguidist initialization
  const [isDisplayed, setIsDisplayed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisplayed(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isDisplayed) {
    return "Loading...";
  }

  // Fix to apply keystone provider around components
  const child = React.Children.only(children);
  const { props: childProps } = child as React.ReactElement<unknown>;

  const App = () =>
    getApp({
      Component: () => React.cloneElement(child as React.ReactElement),
      pageProps: childProps,
    }) as JSX.Element;

  return (
    <RouterContext.Provider value={nextRouterMock}>
      <App />
    </RouterContext.Provider>
  );
};

export { KeystoneProvider };
