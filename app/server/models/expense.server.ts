import { Expense } from "@prisma/client";
import { prisma } from "../db.server";

type CreateExpenseType = Pick<
  Expense,
  "name" | "billingDay" | "price" | "userId" | "billingType" | "type"
>;
const createExpense = async (expense: CreateExpenseType) => {
  return prisma.expense.create({ data: expense });
};

export { createExpense };
