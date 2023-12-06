import {
  type ActionFunctionArgs,
  type ActionFunction,
  type LoaderFunctionArgs,
  type LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import Typography from "~/components/Typography";
import { requireAuth } from "~/server/auth.server";
import {
  deleteExpenseById,
  findExpenseById,
} from "~/server/models/expense.server";
import { MdError } from "react-icons/md/index.js";

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
}: LoaderFunctionArgs) => {
  try {
    const expenseId = params.expenseId;
    if (!expenseId) throw new Error("Missing expense id");
    const user = await requireAuth(request);
    const expense = await findExpenseById(expenseId, user.uid);

    return { expense };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    } else {
      console.log(e);
    }
  }
};

export const action: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  try {
    const expenseId = params.expenseId;
    if (!expenseId) throw new Error("Missing expense id");
    const user = await requireAuth(request);
    await deleteExpenseById(expenseId, user.uid);
    return redirect("/expenses");
  } catch (e) {
    if (e instanceof Error) {
      return { deleteError: e.message };
    }
  }
};

const ExpenseDelete = () => {
  const navigate = useNavigate();
  const transition = useNavigation();
  const onClose = () => {
    navigate("/expenses", { preventScrollReset: true });
  };

  const onCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClose();
  };

  const { expense } = useLoaderData() as LoaderData;
  const actionData = useActionData() as ActionData;
  const isSubmitting = transition.state === "submitting";

  return (
    <Modal title={"Delete expense"} open={true} onClose={onClose}>
      <Form className="h-full" method="delete" preventScrollReset={true}>
        <div className="">
          {actionData?.deleteError ? (
            <div className="pl-4 flex w-full justify-center gap-2">
              <MdError style={{ fontSize: "2em" }} />
              <Typography className="w-full" type="h3">
                {actionData.deleteError}
              </Typography>
            </div>
          ) : (
            <div className="text-almostWhite">
              <Typography type="body1">{`Are you sure you want to delete following expense:`}</Typography>
              <div style={{ padding: "1em" }}>
                <Typography type="h4">{expense.name} ?</Typography>
              </div>
            </div>
          )}

          <div className="pl-4 flex w-full justify-end gap-2">
            <Button onClick={onCancel} secondary={true}>
              Cancel
            </Button>
            <Button
              disabled={!!actionData?.deleteError || isSubmitting}
              type="submit"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ExpenseDelete;

/*

import { style } from "@vanilla-extract/css";

export const actionContainer = style({
  paddingTop: "2em",
  paddingBottom: "1em",
  display: "flex",
  justifyContent: "flex-end",
  gap: "2%",
});

export const errorMessage = style({
  width: "100%",
});

export const errorContainer = style({
  paddingLeft: "1em",
  color: "#ef7171",
  display: "flex",
  width: "100%",
  alignItems: "center",
  gap: "2%",
});










*/
