import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";


const getApp = null;

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
    reload: () => { },
    back: () => { },
    forward: () => { },
    prefetch: () => Promise.resolve(),
    beforePopState: () => { },
    events: {
      on: () => { },
      off: () => { },
      emit: () => { },
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
    return null;
  }

  // Fix to apply keystone provider around components
  const child = React.Children.only(children);
  const { props: childProps } = child as React.ReactElement<unknown>;

  // Robustly resolve the App component
  const App = (() => {
    const rawApp: unknown = getApp;
    if (!rawApp) return null;

    const isComponent = (val: unknown): val is React.ElementType =>
      typeof val === 'function' || (!!val && typeof val === 'object' && 'render' in val);

    if (isComponent(rawApp)) return rawApp;

    const moduleWithDefault = rawApp as { default?: unknown };
    if (moduleWithDefault.default && isComponent(moduleWithDefault.default)) {
      return moduleWithDefault.default;
    }

    return null;
  })();

  class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Keystone App render error:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div style={{ padding: '20px', border: '1px solid red', color: 'red' }}>
            <h3>Keystone Context Error</h3>
            <p>The Keystone Admin App failed to initialize. Metadata might be missing.</p>
            {child}
          </div>
        );
      }

      return this.props.children;
    }
  }

  const KeystoneApp = () => {
    if (!App) {
      console.error('Keystone App component is missing or invalid:', getApp);
      return <>{child}</>;
    }

    // Create a stable component for the child to avoid re-cloning on every render
    const Component = () => React.cloneElement(child as React.ReactElement);

    return (
      <ErrorBoundary>
        <App
          Component={Component}
          pageProps={childProps}
        />
      </ErrorBoundary>
    );
  };

  return (
    <RouterContext.Provider value={nextRouterMock}>
      <KeystoneApp />
    </RouterContext.Provider>
  );
};

export { KeystoneProvider };
