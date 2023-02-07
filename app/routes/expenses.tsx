import styled from "styled-components";
import Button from "~/components/Button";
import { json, type LoaderArgs, type LoaderFunction } from "@remix-run/node";
import { requireAuth } from "~/server/auth.server";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { findExpensesByUserId } from "~/server/models/expense.server";
import ListItem from "~/components/ListItem";
import { type Expense, ExpenseBillingType, ExpenseType } from "@prisma/client";
import {
  FaTshirt,
  FaHouseUser,
  FaShieldAlt,
  FaBriefcaseMedical,
  FaTools,
} from "react-icons/fa";
import { type IconType } from "react-icons";
import { RiMovie2Line } from "react-icons/ri";
import {
  MdOutlineLocalGroceryStore,
  MdAirplanemodeActive,
  MdOutlineModeEdit,
  MdDelete,
} from "react-icons/md";
import { HiCamera } from "react-icons/hi";
import { ImPriceTag } from "react-icons/im";
import Typography from "~/components/Typography";
import { useCallback, useMemo, useState } from "react";
import IconButton from "~/components/IconButton";
import { ResponsivePie } from "@nivo/pie";

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
  margin-left: 5em;

  @media only screen and (max-width: 700px) {
    padding-left: 0.25em;
    padding-right: 0.25em;
    padding-top: 10em;
    margin-left: .5em;
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
  const [pieChartDataSortBy, setPieChartDataSortBy] = useState("type");

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

  const sortedExpenses = useMemo(
    () => expenses.sort((a, b) => a.name.localeCompare(b.name)),
    [expenses]
  );

  const expensesMonthly = sortedExpenses.map((expense) => ({
    ...expense,
    cost:
      expense.billingType === ExpenseBillingType.ANNUAL
        ? `${(expense.price / 12).toFixed(2)}`
        : `${expense.price.toFixed(2)}`,
  }));

  type ExpenseWithMonthlyCost = Omit<
    Expense,
    "price" | "updatedAt" | "createdAt"
  > & {
    cost: string;
  };

  const formatPieChartData = useCallback(
    (expensesMonthly: ExpenseWithMonthlyCost[]) => {
      switch (pieChartDataSortBy) {
        case "type": {
          const grouped = (expensesMonthly || []).reduce((obj, item) => {
            if (!obj[item.type]) {
              obj[item.type] = {
                id: item.type,
                label: item.type,
                value: Number(item.cost),
              };
            } else {
              obj[item.type].value += Number(item.cost);
            }

            return obj;
          }, {} as any);
          return Object.values(grouped);
        }

        default: //use name as default
          return (expensesMonthly || []).map((expense) => ({
            id: expense.name,
            label: expense.name,
            value: expense.cost,
          }));
      }
    },
    [pieChartDataSortBy]
  );

  const pieChartData = useMemo(
    () => formatPieChartData(expensesMonthly),
    [expensesMonthly, formatPieChartData]
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
        <div style={{ marginTop: "3em" }}>
          <Typography type="h2">{`Total: ${totalSumOfExpenses.toFixed(
            2
          )} €`}</Typography>
        </div>
        <div style={{ marginTop: "2em" }}>
          {expensesMonthly?.map((expense) => {
            return (
              <div style={{ width: "100%" }} key={expense.id}>
                <ListItem
                  text={expense.name}
                  info={expense.type}
                  unit={expense.cost}
                  icon={iconByExpenseType[expense.type]}
                  actions={
                    <>
                      <IconButton
                        icon={MdOutlineModeEdit}
                        tooltip="Edit"
                        onClick={() => navigate(`/expenses/${expense.id}/edit`)}
                      />
                      <IconButton
                        icon={MdDelete}
                        tooltip="Delete"
                        onClick={() =>
                          navigate(`/expenses/${expense.id}/delete`)
                        }
                      />
                    </>
                  }
                />
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "5em", height: "500px" }}>
          <ResponsivePie
            margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
            motionConfig="wobbly"
            transitionMode="pushIn"
            activeOuterRadiusOffset={15}
            startAngle={-50}
            innerRadius={0.5}
            padAngle={2}
            borderWidth={4}
            cornerRadius={9}
            colors={{ scheme: "purples" }}
            data={pieChartData}
          />
        </div>
      </ContentContainer>
    </>
  );
}
