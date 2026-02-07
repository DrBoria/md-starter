// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TOperation = (args: { session: any; item?: any }) => boolean;

export const isAdmin: TOperation = ({ session }) => session?.data?.role?.name === "Admin";
export const isUser: TOperation = ({ session }) => session?.data?.role?.name === "User";
export const isSameUser: TOperation = ({ session, item }) => !!(session?.itemId && item && session.data.id === item.id);
export const isOwner: TOperation = ({ session, item }) => {
    return session?.data?.id === (item as { userId: string })?.userId || session?.data?.id === (item as { id: string })?.id;
};
export const isBanned = ({ session }: { session?: { data?: { banned?: boolean } } }) => !!session?.data?.banned;
