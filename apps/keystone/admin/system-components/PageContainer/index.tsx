import type { ReactNode } from "react";
import React from "react";
import { PageContainer as KeystonePageContainer } from "@keystone-6/core/admin-ui/components";

interface PageContainerProps {
  children: ReactNode;
  header: string | ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, header }) => {
  return (
    <KeystonePageContainer header={header}>{children}</KeystonePageContainer>
  );
};

export { PageContainer };
