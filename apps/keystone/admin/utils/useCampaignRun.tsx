import React from "react";
import { useRouter } from "next/router";
import { useToasts } from "@keystone-ui/toast";

import type { TModalData } from "../state";
import type { Lists } from ".keystone/types";
import { SubmitTemplate } from "../components/Modals/CentralModal";
import { ModalData, useGlobalVariable } from "../state";
import { useCampaignRunMutation } from "./queries/useCampaignRunMutation";

export const useCampaignRun = (id?: string) => {
  const router = useRouter();
  const toasts = useToasts();
  const { campaignRun } = useCampaignRunMutation<{
    item: Lists.CampaignRun.Item;
  }>();
  const [_, setModalData] = useGlobalVariable<TModalData>(
    ModalData,
    "ModalData",
  );

  const runCampaign = async () => {
    if (!id) return;

    try {
      setModalData(null);
      const { data } = await campaignRun({
        variables: { id, type: "run" },
      });

      if (data?.item?.id) {
        toasts.addToast({
          tone: "positive",
          title: `Campaign started`,
        });
        await router.push(
          encodeURI(`/drafts?!campaignRun_matches="${data.item.id}"`),
        );
      }
    } catch (error) {
      console.error("Error running campaign:", error);
    }
  };

  const handleTestRun = async () => {
    if (!id) return;
    try {
      const { data } = await campaignRun({
        variables: { id, type: "test_run" },
      });

      if (data?.item?.id) {
        await router.push(
          encodeURI(`/drafts?!campaignRun_matches="${data.item.id}"`),
        );
      }
    } catch (error) {
      console.error("Error running test campaign:", error);
    }
  };

  const showPopupBeforeCampaignRun = () => {
    setModalData({
      content: (
        <SubmitTemplate
          actionName="Run Campaign"
          onCancel={() => setModalData(null)}
          onSubmit={runCampaign}
        />
      ),
    });
  };

  return {
    runCampaign,
    handleTestRun,
    showPopupBeforeCampaignRun,
  };
};
