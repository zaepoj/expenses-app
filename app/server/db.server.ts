import {
  PrismaClient,
  type UserMonthlyExpenses,
  type User,
} from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

type StoreUserType = Pick<User, "email" | "name" | "uid">;

const storeUser = async (user: StoreUserType) => {
  return prisma.user.create({ data: user });
};

const getUser = async (uid: string) => {
  return prisma.user.findFirst({ where: { uid } });
};

const getAllUsers = async () => {
  return prisma.user.findMany();
};

type StoreMonthlyExpenseStatType = Pick<
  UserMonthlyExpenses,
  "userId" | "value" | "month"
>;

const storeMonthlyExpenseStat = async (
  statEntry: StoreMonthlyExpenseStatType
) => {
  return prisma.userMonthlyExpenses.create({ data: statEntry });
};

export { storeUser, getUser, getAllUsers, storeMonthlyExpenseStat };
