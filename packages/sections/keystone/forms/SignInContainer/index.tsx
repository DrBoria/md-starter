import type { ReactNode } from "react";
import React from "react";
import { Head } from "@keystone-6/core/admin-ui/router";
import { PageContainer } from "@md/components";

interface ISigninContainerProps {
  children: ReactNode;
  title?: string;
}

export const SignInContainer = ({ children, title }: ISigninContainerProps) => {
  return (
    <PageContainer>
      <Head>
        <title>{title || "Keystone"}</title>
      </Head>
        {children}
    </PageContainer>
  );
};
