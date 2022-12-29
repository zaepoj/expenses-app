import { Expense } from "@prisma/client";
import { prisma } from "../db.server";

type CreateExpenseType = Pick<
  Expense,
  "name" | "billingDay" | "price" | "userId" | "billingType" | "type"
>;
const createExpense = async (expense: CreateExpenseType) => {
  return prisma.expense.create({ data: expense });
};

const findExpensesByUserId = async (userId: string) => {
  const expenses = await prisma.expense.findMany({ where: { userId } });
  return expenses.map((expense) => {
    return {
      ...expense,
      price: Number(expense.price),
      updatedAt: expense.updatedAt.toJSON(),
      createdAt: expense.createdAt.toJSON(),
    };
  });
};

export { createExpense, findExpensesByUserId };
