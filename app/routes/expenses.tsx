import styled from "styled-components";
import Button from "~/components/Button";
import { json, LoaderArgs, LoaderFunction } from "@remix-run/node";
import { requireAuth } from "~/server/auth.server";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { findExpensesByUserId } from "~/server/models/expense.server";
import ListItem from "~/components/ListItem";
import { Expense, ExpenseBillingType, ExpenseType } from "@prisma/client";
import {
  FaTshirt,
  FaHouseUser,
  FaShieldAlt,
  FaBriefcaseMedical,
  FaTools,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { RiMovie2Line } from "react-icons/ri";
import {
  MdOutlineLocalGroceryStore,
  MdAirplanemodeActive,
} from "react-icons/md";
import { HiCamera } from "react-icons/hi";
import { ImPriceTag } from "react-icons/im";
import Typography from "~/components/Typography";
import { useMemo } from "react";

type LoaderData = {
  expenses: Awaited<ReturnType<typeof findExpensesByUserId>>;
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const user = await requireAuth(request);
  const expenses = await findExpensesByUserId(user.uid);
  return json({
    expenses,
  });
};

const ContentContainer = styled.div`
  height: 100%;
  flex: 1;
  padding: 2em 2em 5em 2em;

  @media only screen and (max-width: 700px) {
    padding-left: 0.25em;
    padding-right: 0.25em;
    padding-top: 10em;
  }
`;

const iconByExpenseType: { [x: string]: IconType } = {
  [ExpenseType.CLOTHING]: FaTshirt,
  [ExpenseType.ENTERTAINMENT]: RiMovie2Line,
  [ExpenseType.FOOD]: MdOutlineLocalGroceryStore,
  [ExpenseType.HOBBIES]: HiCamera,
  [ExpenseType.HOUSING]: FaHouseUser,
  [ExpenseType.INSURANCE]: FaShieldAlt,
  [ExpenseType.MEDICAL]: FaBriefcaseMedical,
  [ExpenseType.OTHER]: ImPriceTag,
  [ExpenseType.TRAVEL]: MdAirplanemodeActive,
  [ExpenseType.UTILITIES]: FaTools,
};

export default function ExpenseView() {
  const navigate = useNavigate();
  const { expenses } = useLoaderData() as LoaderData;

  const totalSumOfExpenses = useMemo(
    () =>
      expenses.reduce(
        (acc, curr) =>
          (acc +=
            curr.billingType === ExpenseBillingType.ANNUAL
              ? curr.price / 12
              : curr.price),
        0
      ),
    [expenses]
  );

  return (
    <>
      <Outlet />
      <ContentContainer>
        <Button onClick={() => navigate("/expenses/add")}>
          <Typography type="h3">Add new</Typography>
        </Button>

        <div style={{ marginTop: "3em" }}>
          <Typography type="h1">Monthly expenses</Typography>
        </div>
        <div style={{ marginTop: "2em" }}>
          {expenses?.map((expense) => {
            return (
              <div key={expense.id}>
                <ListItem
                  text={expense.name}
                  info={expense.type}
                  unit={
                    expense.billingType === ExpenseBillingType.ANNUAL
                      ? `${expense.price / 12}`
                      : `${expense.price}`
                  }
                  icon={iconByExpenseType[expense.type]}
                />
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: "3em" }}>
          <Typography type="h2">{`Monthly total: ${totalSumOfExpenses} €`}</Typography>
        </div>
      </ContentContainer>
    </>
  );
}
