import type { TOperation } from "../../types";

export const isAdmin: TOperation = ({ session }) => session?.data?.role?.name === "Admin";
export const isUser: TOperation = ({ session }) => session?.data?.role?.name === "User";
export const isSameUser: TOperation = ({ session, item }) => !!(session?.itemId && item && session.data.id === item.id);
export const isBanned = ({ session }: { session?: any }) => !!session?.data?.banned;
