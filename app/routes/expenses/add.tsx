import { ExpenseBillingType, ExpenseType, Prisma } from "@prisma/client";
import { ActionFunction, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigate,
  useTransition,
} from "@remix-run/react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import Select from "~/components/Select";
import TextField from "~/components/TextField";
import { requireAuth } from "~/server/auth.server";
import { createExpense } from "~/server/models/expense.server";
import { zodResolver } from "@hookform/resolvers/zod";

const ActionContainer = styled.div`
  padding-top: 2em;
  padding-bottom: 1em;
  display: flex;
  justify-content: flex-end;
  gap: 2%;
`;

const ExpenseTypeOptions = [
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
const ExpenseBillingTypeOptions = [
  { value: ExpenseBillingType.MONTHLY, label: "Monthly" },
  { value: ExpenseBillingType.ANNUAL, label: "Annual" },
];

const createExpenseValidationSchema = z.object({
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

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  try {
    createExpenseValidationSchema.parse(formPayload);
    const name = formData.get("name") as string;
    const price = new Prisma.Decimal(formData.get("price") as string);
    const type = formData.get("type") as ExpenseType;
    const billingType = formData.get("billingType") as ExpenseBillingType;

    const user = await requireAuth(request);
    await createExpense({
      name,
      price,
      type,
      billingType,
      userId: user.uid,
      billingDay: 1,
    });

    return redirect("/expenses");
  } catch (e: any) {
    console.log(e);
    let errors = {};
    if (e.issues) {
      errors = e.issues.reduce((acc: any, curr: any) => {
        const key = curr.path[0];
        acc[key] = curr.message;
        return acc;
      }, {});
    }
    return { errors, formData: Object.fromEntries(formData) };
  }
};

const ExpensesEditModal = () => {
  const actionData = useActionData();
  const transition = useTransition();
  const isSubmitting = !!transition.submission;
  const navigate = useNavigate();
  const onClose = () => navigate("/expenses");
  const {
    control,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(createExpenseValidationSchema),
    mode: "onTouched",
  });

  return (
    <Modal title={"New expense"} open={true} onClose={onClose}>
      <Form method="post">
        <TextField
          name="name"
          type="text"
          label="Name"
          errorHelper={errors?.name?.message || actionData?.errors?.name}
          register={register}
        />
        <TextField
          name="price"
          type="number"
          label="Price"
          errorHelper={errors?.price?.message || actionData?.errors?.price}
          step="0.01"
          register={register}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, ref, onBlur, name } }) => (
            <Select
              onChange={(e: { value: string }) => onChange(e.value)}
              ref={ref}
              onBlur={onBlur}
              name={name}
              closeOnSelect={true}
              label="type"
              options={ExpenseTypeOptions}
              errorHelper={errors?.type?.message || actionData?.errors?.type}
            />
          )}
        />

        <Controller
          control={control}
          name="billingType"
          render={({ field: { onChange, ref, onBlur, name } }) => (
            <Select
              onChange={(e: { value: string }) => onChange(e.value)}
              ref={ref}
              onBlur={onBlur}
              name={name}
              closeOnSelect={true}
              label="billing type"
              options={ExpenseBillingTypeOptions}
              errorHelper={
                errors.billingType?.message || actionData?.errors?.type
              }
            />
          )}
        />

        <ActionContainer>
          <Button onClick={onClose} secondary>
            Cancel
          </Button>
          <Button disabled={isSubmitting} type="submit">
            Save
          </Button>
        </ActionContainer>
      </Form>
    </Modal>
  );
};

export default ExpensesEditModal;
