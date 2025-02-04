import React from "react";

import { DashboardCard } from "../components/Cards/DashboardCard";
import { DashboardCardsContainer } from "../components/Containers";
import { PageContainer } from "../system-components/PageContainer";
import { useQueryAdminMeta } from "../utils/queries/useQueryAdminMeta";
import { PageTitle } from "@md/components";
import { ThemeProvider } from "@md/styles";

interface TAdminMeta {
  Contact: number;
  Campaign: number;
  AgentReviewer: number;
  AgentWriter: number;
  Offer: number;
  Email: number;
}

export const DashboardSubPages = [
  "Users",
  "Posts",
];

const DashboardPage = () => {
  const { data: adminMeta } = useQueryAdminMeta<TAdminMeta>(DashboardSubPages);

  return (
    <ThemeProvider>
      <PageContainer header={<PageTitle>Header</PageTitle>}>
        <DashboardCardsContainer>
          <DashboardCard
            title="Posts"
            link="posts"
            itemCount={
              (adminMeta?.AgentReviewer || 0) + (adminMeta?.AgentWriter || 0)
            }
            noCreate
          />
          <DashboardCard
            title="Users"
            link="users"
            itemCount={adminMeta?.Campaign}
          />
        </DashboardCardsContainer>
      </PageContainer>
    </ThemeProvider>
  );
};

export default DashboardPage;
