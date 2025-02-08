import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

const END_SESSION = gql`
  mutation EndSession {
    endSession
  }
`;

interface TEndSessionMutation {
  endSession: boolean;
}

const useSignOut = () => {
  const [signOut, { data }] = useMutation<TEndSessionMutation>(END_SESSION);
  useEffect(() => {
    if (data?.endSession) {
      // The window location reload could be extracted to a callback for more flexibility.
      window.location.reload();
    }
  }, [data]);

  return [signOut];
};

export { useSignOut };
