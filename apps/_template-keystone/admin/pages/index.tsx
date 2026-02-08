import React from "react";

// eslint-disable-next-line no-restricted-imports
import { DashboardCard } from "../components/Cards/DashboardCard";
import { DashboardCardsContainer } from "@md/components";
import { PageTitle } from "@md/components";
import { PageContainer } from "@md/sections/keystone";
import { useQueryAdminMeta } from "@md/api/graphql";
import { useQuery } from "@apollo/client";
import { useKeystone } from "@keystone-6/core/admin-ui/context";

const DashboardPage = () => {
  const { adminMeta } = useKeystone();
  const lists = Object.values(adminMeta?.lists || {});
  const listKeys = lists.map((list) => list.key);

  const { data: countsData } = useQueryAdminMeta(listKeys, useQuery);

  return (
    <PageContainer header={<PageTitle>Dashboard</PageTitle>}>
      <DashboardCardsContainer>
        {lists.map((list) => (
          <DashboardCard
            key={list.key}
            title={list.label}
            link={list.path}
            itemCount={countsData?.[list.key] || 0}
          />
        ))}
      </DashboardCardsContainer>
    </PageContainer>
  );
};

export default DashboardPage;
