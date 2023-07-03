import {
  type ActionArgs,
  type ActionFunction,
  type LoaderArgs,
  type LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useTransition,
} from "@remix-run/react";
import styled from "styled-components";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import Typography from "~/components/Typography";
import { requireAuth } from "~/server/auth.server";
import {
  deleteExpenseById,
  findExpenseById,
} from "~/server/models/expense.server";
import { MdError } from "react-icons/md";

type LoaderData = {
  expense: Awaited<ReturnType<typeof findExpenseById>>;
  error: string;
};

type ActionData = {
  deleteError: string;
};

const ActionContainer = styled.div`
  padding-top: 2em;
  padding-bottom: 1em;
  display: flex;
  justify-content: flex-end;
  gap: 2%;
`;

const ErrorMessage = styled(Typography)`
  width: 100%;
`;

const ErrorContainer = styled.div`
  padding-left: 1em;
  color: #ef7171;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 2%;
`;

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

export const action: ActionFunction = async ({
  request,
  params,
}: ActionArgs) => {
  try {
    const expenseId = params.expenseId;
    if (!expenseId) throw new Error("Missing expense id");
    const user = await requireAuth(request);
    await deleteExpenseById(expenseId, user.uid);
    return redirect("/expenses");
  } catch (e: any) {
    return { deleteError: e.message };
  }
};

const ExpenseDelete = () => {
  const navigate = useNavigate();
  const transition = useTransition();
  const onClose = () => navigate("/expenses", { preventScrollReset: true });
  const { expense, error } = useLoaderData() as LoaderData;
  const actionData = useActionData() as ActionData;
  const isSubmitting = !!transition.submission;

  return (
    <Modal title={"Delete expense"} open={true} onClose={onClose}>
      <Form method="delete" preventScrollReset={true}>
        {actionData?.deleteError ? (
          <ErrorContainer>
            <MdError style={{ fontSize: "2em" }} />
            <ErrorMessage type="h3">{actionData.deleteError}</ErrorMessage>
          </ErrorContainer>
        ) : (
          <div>
            <Typography type="body1">{`Are you sure you want to delete following expense:`}</Typography>
            <div style={{ padding: "1em" }}>
              <Typography type="h4">{expense.name} ?</Typography>
            </div>
          </div>
        )}

        <ActionContainer>
          <Button onClick={onClose} secondary>
            Cancel
          </Button>
          <Button
            disabled={!!actionData?.deleteError || isSubmitting}
            type="submit"
          >
            Confirm
          </Button>
        </ActionContainer>
      </Form>
    </Modal>
  );
};

export default ExpenseDelete;
