import { PrismaClient, type UserMonthlyExpenses, type User } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

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
