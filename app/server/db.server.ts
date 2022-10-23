import { Expense, PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

type StoreUserType = Pick<User, "email" | "name" | "uid">;

const storeUser = async (user: StoreUserType) => {
  return prisma.user.create({ data: user });
};

const getUser = async (uid: string) => {
  return prisma.user.findFirst({ where: { uid } });
};

type CreateExpenseType = Pick<
  Expense,
  "name" | "billingDay" | "price" | "userId"
>;
const createExpense = async (expense: CreateExpenseType) => {
  return prisma.expense.create({ data: expense });
};

export { storeUser, getUser, createExpense };
