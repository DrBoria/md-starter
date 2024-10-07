import type { TOperation } from "../../types";

const isAdmin: TOperation = ({ session }) => {
  if (!session?.itemId) return false;
  return session.data?.role?.name === "Admin";
};

const isOwner: TOperation = ({ session }) => {
  if (!session?.itemId) return false;
  return session.data?.role?.name === "Owner";
};

const isEditor: TOperation = ({ session }) => {
  if (!session?.itemId) return false;
  return session.data?.role?.name === "Editor";
};

const isViewer: TOperation = ({ session }) => {
  if (!session?.itemId) return false;
  return session.data?.role?.name === "Viewer";
};

const isSameUser: TOperation = ({ session, item }) => {
  if (!session?.itemId || !item) return false;
  return session.data?.id === item.id;
};

export { isAdmin, isEditor, isOwner, isViewer, isSameUser };
