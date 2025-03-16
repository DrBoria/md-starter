import React from "react";

import { DashboardCard } from "../components/Cards/DashboardCard";
import { DashboardCardsContainer } from "../components/Containers";
import {PageTitle } from "@md/components";
import { PageContainer } from "@md/sections/keystone";
import { useQueryAdminMeta } from "@md/api/graphql";
import { QueryResult, useQuery } from "@apollo/client";

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
  const { data: adminMeta } = useQueryAdminMeta<QueryResult<TAdminMeta>>(DashboardSubPages, useQuery);

  return (
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
  );
};

export default DashboardPage;
