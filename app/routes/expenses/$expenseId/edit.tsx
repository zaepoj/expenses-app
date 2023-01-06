import { zodResolver } from "@hookform/resolvers/zod";
import { ExpenseBillingType, ExpenseType, Prisma } from "@prisma/client";
import {
  ActionFunction,
  LoaderArgs,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useTransition,
} from "@remix-run/react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import Select from "~/components/Select";
import TextField from "~/components/TextField";
import { requireAuth } from "~/server/auth.server";
import { findExpenseById, updateExpense } from "~/server/models/expense.server";
import {
  ExpenseBillingTypeOptions,
  ExpenseTypeOptions,
  expenseValidationSchema,
} from "~/utils/expense";

type LoaderData = {
  expense: Awaited<ReturnType<typeof findExpenseById>>;
  error: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  let formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  try {
    const expenseId = params.expenseId;
    if (!expenseId) throw new Error("Missing expense id");

    expenseValidationSchema.parse(formPayload);
    const name = formData.get("name") as string;
    const price = new Prisma.Decimal(formData.get("price") as string);
    const type = formData.get("type") as ExpenseType;
    const billingType = formData.get("billingType") as ExpenseBillingType;

    const user = await requireAuth(request);
    await updateExpense(
      {
        id: expenseId,
        name,
        price,
        type,
        billingType,
      },
      user.uid
    );

    return redirect("/expenses");
  } catch (e: any) {
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

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderArgs) => {
  try {
    const expenseId = params.expenseId;
    if (!expenseId) throw new Error("Missing expense id");
    const user = await requireAuth(request);
    const expense = await findExpenseById(expenseId, user.uid);

    return { expense };
  } catch (e: any) {
    console.log({ e: e.message });
    return { error: e.message };
  }
};

const ActionContainer = styled.div`
  padding-top: 2em;
  padding-bottom: 1em;
  display: flex;
  justify-content: flex-end;
  gap: 2%;
`;

const ExpenseEdit = () => {
  const navigate = useNavigate();
  const onClose = () => navigate("/expenses");
  const actionData = useActionData();
  const transition = useTransition();
  const isSubmitting = !!transition.submission;
  const { expense, error } = useLoaderData() as LoaderData;
  const {
    control,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(expenseValidationSchema),
    mode: "onChange",
  });

  return (
    <Modal title={"Edit expense"} open={true} onClose={onClose}>
      <Form method="post">
        <TextField
          defaultValue={expense.name}
          name="name"
          type="text"
          label="Name"
          errorHelper={errors?.name?.message || actionData?.errors?.name}
          register={register}
        />
        <TextField
          defaultValue={expense.price}
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
              defaultValue={ExpenseTypeOptions.find(
                (opt) => opt.value === expense.type
              )}
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
              defaultValue={ExpenseBillingTypeOptions.find(
                (opt) => opt.value === expense.billingType
              )}
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
            {isSubmitting ? "Saving.." : "Save"}
          </Button>
        </ActionContainer>
      </Form>
    </Modal>
  );
};

export default ExpenseEdit;
