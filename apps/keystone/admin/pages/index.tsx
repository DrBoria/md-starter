import React from "react";

import { DashboardCard } from "../components/Cards/DashboardCard";
import { DashboardCardsContainer } from "../components/Containers";
import { PageContainer } from "../system-components/PageContainer";
import { useQueryAdminMeta } from "../utils/queries/useQueryAdminMeta";

interface TAdminMeta {
  Contact: number;
  Campaign: number;
  AgentReviewer: number;
  AgentWriter: number;
  Offer: number;
  Email: number;
}

export const DashboardSubPages = [
  "Contact",
  "Campaign",
  "AgentReviewer",
  "AgentWriter",
  "Offer",
  "Email",
];

const DashboardPage = () => {
  const { data: adminMeta } = useQueryAdminMeta<TAdminMeta>(DashboardSubPages);

  return (
    <PageContainer header={<h1>Header</h1>}>
      <DashboardCardsContainer>
        <DashboardCard
          title="Agents"
          link="agents"
          itemCount={
            (adminMeta?.AgentReviewer || 0) + (adminMeta?.AgentWriter || 0)
          }
          noCreate
        />
        <DashboardCard
          title="Campaigns"
          link="campaigns"
          itemCount={adminMeta?.Campaign}
        />
        <DashboardCard
          title="Contacts"
          link="contacts"
          itemCount={adminMeta?.Contact}
        />
        <DashboardCard
          title="Emails"
          link="emails"
          noCreate
          itemCount={adminMeta?.Email}
        />

        {/* <DashboardCard
          title="Offers"
          link="offers"
          itemCount={adminMeta?.Offer}
        /> */}
      </DashboardCardsContainer>
    </PageContainer>
  );
};

export default DashboardPage;
