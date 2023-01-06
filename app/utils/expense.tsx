import { ExpenseBillingType, ExpenseType } from "@prisma/client";
import { z } from "zod";

export const expenseValidationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters long" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  type: z.nativeEnum(ExpenseType, {
    errorMap: () => {
      return { message: "Expense type must be selected" };
    },
  }),
  billingType: z.nativeEnum(ExpenseBillingType, {
    errorMap: () => {
      return { message: "Billing type must be selected" };
    },
  }),
});

export const ExpenseTypeOptions = [
  { value: ExpenseType.CLOTHING, label: "Clothing" },
  { value: ExpenseType.ENTERTAINMENT, label: "Entertainment" },
  { value: ExpenseType.FOOD, label: "Food" },
  { value: ExpenseType.HOBBIES, label: "Hobbies" },
  { value: ExpenseType.HOUSING, label: "Housing" },
  { value: ExpenseType.INSURANCE, label: "Insurance" },
  { value: ExpenseType.MEDICAL, label: "Medical" },
  { value: ExpenseType.TRAVEL, label: "Traveling" },
  { value: ExpenseType.UTILITIES, label: "Utilities" },
  { value: ExpenseType.OTHER, label: "Other" },
];
export const ExpenseBillingTypeOptions = [
  { value: ExpenseBillingType.MONTHLY, label: "Monthly" },
  { value: ExpenseBillingType.ANNUAL, label: "Annual" },
];
