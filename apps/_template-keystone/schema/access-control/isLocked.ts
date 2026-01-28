import type { TSession } from "../../types";

type TIsLocked = (baseArgs: {
  session?: TSession;
}) => boolean | Promise<boolean>;

const isLocked: TIsLocked = ({ session }) => {
  if (!session?.itemId) return true;
  return session.data.locked;
};

export { isLocked };
