export type TSession = {
    itemId?: string;
    data?: {
        id?: string;
        role?: { name?: string };
        banned?: boolean;
    };
};

export type TItem = {
    id?: string | { toString(): string };
    userId?: string;
};

export type TOperation = (args: { session?: TSession; item?: TItem }) => boolean;

export const isAdmin: TOperation = ({ session }) => session?.data?.role?.name === "Admin";
export const isUser: TOperation = ({ session }) => session?.data?.role?.name === "User";
export const isSameUser: TOperation = ({ session, item }) => !!(session?.itemId && item && session.data?.id === item.id);
export const isOwner: TOperation = ({ session, item }) => {
    return session?.data?.id === item?.userId || session?.data?.id === item?.id;
};
export const isBanned = ({ session }: { session?: TSession }) => !!session?.data?.banned;
