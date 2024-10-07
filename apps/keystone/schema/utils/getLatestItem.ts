import type { KeystoneContext } from "@keystone-6/core/types";

const getLatestItem = async <T>(
  context: KeystoneContext,
  listKey: string,
  where: unknown,
) => {
  const items = await context.prisma[listKey].findMany({
    where: where,
    orderBy: { createdAt: "desc" },
    take: 1,
  });
  return items[0] as Promise<T>;
};

export { getLatestItem };
