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
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import Typography from "~/components/Typography";
import { requireAuth } from "~/server/auth.server";
import {
  deleteExpenseById,
  findExpenseById,
} from "~/server/models/expense.server";
import { MdError } from "react-icons/md";
import * as styles from "./delete.css";

type LoaderData = {
  expense: Awaited<ReturnType<typeof findExpenseById>>;
  error: string;
};

type ActionData = {
  deleteError: string;
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
          <div className={styles.errorContainer}>
            <MdError style={{ fontSize: "2em" }} />
            <Typography className={styles.errorMessage} type="h3">
              {actionData.deleteError}
            </Typography>
          </div>
        ) : (
          <div>
            <Typography type="body1">{`Are you sure you want to delete following expense:`}</Typography>
            <div style={{ padding: "1em" }}>
              <Typography type="h4">{expense.name} ?</Typography>
            </div>
          </div>
        )}

        <div className={styles.actionContainer}>
          <Button onClick={onClose} secondary={true}>
            Cancel
          </Button>
          <Button
            disabled={!!actionData?.deleteError || isSubmitting}
            type="submit"
          >
            Confirm
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ExpenseDelete;
