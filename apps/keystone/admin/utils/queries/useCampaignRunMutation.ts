import { gql, useMutation } from "@apollo/client";

import type { CampaignRunType } from "../../../schema/utils/scheduleCampaign";

interface ICampaignRunVariables {
  id: string;
  type: CampaignRunType;
}

const useCampaignRunMutation = <TData>() => {
  const [campaignRun, { loading, error: errorMutation, data: dataMutation }] =
    useMutation<TData, ICampaignRunVariables>(
      gql`
        mutation CampaignRun($id: ID!, $type: CampaignRunType!) {
          item: campaignRun(id: $id, type: $type) {
            id
          }
        }
      `,
      { errorPolicy: "all" },
    );

  return {
    campaignRun,
    error: errorMutation,
    loading,
    data: dataMutation,
  };
};

export { useCampaignRunMutation };
