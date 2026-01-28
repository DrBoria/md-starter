import type { TSession } from "../../types";
import { isAdmin } from "./roles";

export const isOnlyAdminCanSee = {
  createView: {
    fieldMode: ({ session }: { session?: TSession }) =>
      isAdmin({ session }) ? "edit" : "hidden",
  },
  itemView: {
    fieldMode: ({ session }: { session?: TSession }) =>
      isAdmin({ session }) ? "edit" : "hidden",
  },
  listView: {
    fieldMode: ({ session }: { session?: TSession }) =>
      isAdmin({ session }) ? "read" : "hidden",
  },
};
