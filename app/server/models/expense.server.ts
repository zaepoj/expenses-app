import { type Expense, ExpenseBillingType, Month } from "@prisma/client";
import { prisma } from "../db.server";
import { subMonths } from "date-fns";

type CreateExpenseType = Pick<
  Expense,
  "name" | "billingDay" | "price" | "userId" | "billingType" | "type"
>;
type UpdateExpenseType = Pick<
  Expense,
  "id" | "name" | "price" | "billingType" | "type"
>;

const createExpense = async (expense: CreateExpenseType) => {
  return prisma.expense.create({ data: expense });
};

const updateExpense = async (expense: UpdateExpenseType, userId: string) => {
  const expenseResource = await prisma.expense.findUnique({
    where: { id: expense.id },
  });
  if (expenseResource?.userId !== userId) throw new Error("Access denied");
  return prisma.expense.update({
    where: { id: expenseResource.id },
    data: expense,
  });
};

const findExpensesByUserId = async (userId: string) => {
  const expenses = await prisma.expense.findMany({ where: { userId } });
  return expenses.map((expense: Expense) => {
    return {
      ...expense,
      price: Number(expense.price),
      updatedAt: expense.updatedAt.toJSON(),
      createdAt: expense.createdAt.toJSON(),
    };
  });
};

const findExpenseById = async (id: string, userId: string) => {
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (expense?.userId !== userId) throw new Error("Access denied");
  return {
    ...expense,
    price: Number(expense.price),
    updatedAt: expense.updatedAt.toJSON(),
    createdAt: expense.createdAt.toJSON(),
  };
};

const deleteExpenseById = async (expenseId: string, userId: string) => {
  const expense = await prisma.expense.findUnique({ where: { id: expenseId } });
  if (!expense) throw new Error("Expense not found");
  if (expense.userId !== userId) throw new Error("Access denied");

  return await prisma.expense.delete({ where: { id: expense.id } });
};

const getMonthlyTotalExpensesForUser = async (userId: string) => {
  const sumOfTotalExpensesGroupedByBillingType = await prisma.expense.groupBy({
    by: ["billingType"],
    where: {
      userId: userId,
    },
    _sum: {
      price: true,
    },
  });

  const totalMonthlyExpenses = sumOfTotalExpensesGroupedByBillingType.reduce(
    (sum, item) =>
      (sum +=
        item.billingType === ExpenseBillingType.ANNUAL
          ? Number(item._sum.price) / 12
          : Number(item._sum.price)),
    0
  );
  return totalMonthlyExpenses.toFixed(2);
};

const getMontlyTotalExpensesHistoryForUser = async (userId: string) => {
  const prevMonth = subMonths(new Date(), 0).getUTCMonth();
  const monthKey = Object.keys(Month)[prevMonth - 1] as Month;

  const prevMonthExpenses = await prisma.userMonthlyExpenses.findFirst({
    where: { userId, month: monthKey },
  });

  if (!prevMonthExpenses) {
    return {
      percentChange: "0",
      isPositive: true,
    };
  }

  const currentMonthExpensesTotal = await getMonthlyTotalExpensesForUser(
    userId
  );

  const percentChange =
    ((Number(currentMonthExpensesTotal) - Number(prevMonthExpenses.value)) /
      Number(prevMonthExpenses.value)) *
    100;

  const isPositive = percentChange >= 0;

  return {
    percentChange: percentChange.toFixed(2).replace("-", ""),
    isPositive,
  };
};

export {
  createExpense,
  updateExpense,
  findExpensesByUserId,
  findExpenseById,
  deleteExpenseById,
  getMonthlyTotalExpensesForUser,
  getMontlyTotalExpensesHistoryForUser,
};
