import React from "react";

import { DashboardCard } from "../components/Cards/DashboardCard";
import { DashboardCardsContainer } from "../components/Containers";
import { Button, PageTitle, useModal } from "@md/components";
import { dark, ThemeProvider } from "@md/styles";
import { DeleteTemplate, PageContainer } from "@md/sections/keystone";
import { useQueryAdminMeta } from "@md/api/graphql";
import { QueryResult, useQuery } from "@apollo/client";
import { CopyButton } from "@md/components/keystone";

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
  const { modalData, sideBarModalData, setModalData, setSideBarModalData } = useModal();
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
        <CopyButton />
        <Button onClick={() => {
          setModalData({
            content: (
              <DeleteTemplate
                item={'Post'}
                onCancel={() => setModalData(null)}
                onDelete={console.log}
              />
            ),
          })
        }}>Central Modal</Button>
        <Button onClick={() => {
          setSideBarModalData({
            listName: "Post",
            headerText: "Upload CSV File(s) using provided command",
            id: '',
            type: "edit",
          });
        }}>SideBar Modal</Button>
      </DashboardCardsContainer>
    </PageContainer>
  );
};

export default DashboardPage;
