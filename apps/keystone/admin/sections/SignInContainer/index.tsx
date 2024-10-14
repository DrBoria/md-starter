import type { ReactNode } from "react";
import React from "react";
import { Head } from "@keystone-6/core/admin-ui/router";
import { Box, Center, useTheme } from "@keystone-ui/core";

interface ISigninContainerProps {
  children: ReactNode;
  title?: string;
}

export const SigninContainer = ({ children, title }: ISigninContainerProps) => {
  const { colors, shadow } = useTheme();

  return (
    <div>
      <Head>
        <title>{title || "Keystone"}</title>
      </Head>
      <Center
        style={{
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundColor: colors.backgroundMuted,
        }}
        rounding="medium"
      >
        <Box
          style={{
            backgroundColor: colors.background,
            width: 600,
            boxShadow: shadow.s100,
          }}
          margin="medium"
          padding="xlarge"
          rounding="medium"
        >
          {children}
        </Box>
      </Center>
    </div>
  );
};
