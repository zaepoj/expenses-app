import { Expense } from "@prisma/client";
import { prisma } from "../db.server";

type CreateExpenseType = Pick<
  Expense,
  "name" | "billingDay" | "price" | "userId" | "billingType" | "type"
>;
const createExpense = async (expense: CreateExpenseType) => {
	console.log("input", expense)



  return prisma.expense.create({ data: expense });
};

export { createExpense };
