import Button from "~/components/Button";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, LoaderFunction } from "@remix-run/node";
import { requireAuth } from "~/server/auth.server";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import {
  findExpensesByUserId,
  getMontlyTotalExpensesHistoryForUser,
} from "~/server/models/expense.server";
import ListItem from "~/components/ListItem";
import { type Expense, ExpenseBillingType, ExpenseType } from "@prisma/client";
import {
  FaTshirt,
  FaHouseUser,
  FaShieldAlt,
  FaBriefcaseMedical,
  FaTools,
} from "react-icons/fa/index.js";
import { type IconType } from "react-icons";
import { RiMovie2Line } from "react-icons/ri/index.js";
import {
  MdOutlineLocalGroceryStore,
  MdAirplanemodeActive,
  MdOutlineModeEdit,
  MdDelete,
} from "react-icons/md/index.js";
import { HiCamera } from "react-icons/hi/index.js";
import { ImPriceTag } from "react-icons/im/index.js";
import Typography from "~/components/Typography";
import { useCallback, useMemo, useState } from "react";
import IconButton from "~/components/IconButton";
import { ResponsivePie } from "@nivo/pie";
import ToggleButton from "~/components/ToggleButton";
import * as styles from "./expenses.css";
import Card from "~/components/Card";
import { theme } from "~/theme";
import useMedia from "~/hooks/useMedia";

type LoaderData = {
  expenses: Awaited<ReturnType<typeof findExpensesByUserId>>;
  monthlyExpensesPercentageChange: Awaited<
    ReturnType<typeof getMontlyTotalExpensesHistoryForUser>
  >;
};

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const user = await requireAuth(request);
  const expenses = await findExpensesByUserId(user.uid);

  const monthlyExpensesPercentageChange =
    await getMontlyTotalExpensesHistoryForUser(user.uid);
  return json({
    expenses,
    monthlyExpensesPercentageChange,
  });
};

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
  const { expenses, monthlyExpensesPercentageChange } =
    useLoaderData() as LoaderData;
  const [pieChartSortByType, setPieChartSortByType] = useState(false);

  const isDesktopScreen = useMedia({ breakpoint: "lg" });

  const totalSumOfExpenses = useMemo(
    () =>
      expenses.reduce(
        (acc, curr) =>
          (acc +=
            curr.billingType === ExpenseBillingType.ANNUAL
              ? Number(curr.price) / 12
              : Number(curr.price)),
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
      switch (pieChartSortByType) {
        case true: {
          const grouped = (expensesMonthly || []).reduce((obj, item) => {
            if (!obj[item.type]) {
              obj[item.type] = {
                id: item.type,
                label: item.type,
                value: (Number(item.cost) / totalSumOfExpenses) * 100,
              };
            } else {
              obj[item.type].value +=
                (Number(item.cost) / totalSumOfExpenses) * 100;
            }

            return obj;
          }, {} as any);
          return Object.values(grouped);
        }

        default:
          //use name as default
          return (expensesMonthly || []).map((expense) => ({
            id: expense.name,
            label: expense.name,
            value: Number(expense.cost),
          }));
      }
    },
    [pieChartSortByType, totalSumOfExpenses]
  );

  const pieChartData = useMemo(
    () => formatPieChartData(expensesMonthly),
    [expensesMonthly, formatPieChartData]
  );

  return (
    <>
      <Outlet />
      <div>
        <div className={styles.contentContainer}>
          <Card>
            <div className={styles.expenseListContainer}>
              <Button
                onClick={() =>
                  navigate("/expenses/add", { preventScrollReset: true })
                }
              >
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
              <div style={{ marginTop: "2em", marginBottom: "3em" }}>
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
                              onClick={() =>
                                navigate(`/expenses/${expense.id}/edit`, {
                                  preventScrollReset: true,
                                })
                              }
                            />
                            <IconButton
                              icon={MdDelete}
                              tooltip="Delete"
                              onClick={() =>
                                navigate(`/expenses/${expense.id}/delete`, {
                                  preventScrollReset: true,
                                })
                              }
                            />
                          </>
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
          <div className="mt-4"></div>
          <div className={styles.expensesSummaryContainer}>
            <div
              className={styles.pieContainer({
                desktop: isDesktopScreen,
              })}
            >
              <Typography type="h1">Monthly expenses summary</Typography>
              <div style={{ padding: "1em" }}>
                <ToggleButton
                  checked={pieChartSortByType}
                  onChange={(e) => setPieChartSortByType(e.target.checked)}
                  label="By type of expense"
                />
              </div>
              <ResponsivePie
                motionConfig="gentle"
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                transitionMode="startAngle"
                activeOuterRadiusOffset={15}
                startAngle={-50}
                innerRadius={0.5}
                padAngle={2}
                borderWidth={4}
                cornerRadius={9}
                colors={{ scheme: "blue_purple" }}
                theme={{ textColor: "#fff" }}
                arcLabelsTextColor="#141726"
                data={pieChartData}
                valueFormat={(v) =>
                  pieChartSortByType ? `${v.toFixed(2)}%` : `${v}`
                }
              />
            </div>
            <div className="grow p-2 md:p-0.5">
              <Card title={"Monthly progression"}>
                <div className="p-5">
                  <Typography
                    style={{
                      fontSize: "4em",
                      color: monthlyExpensesPercentageChange.isPositive
                        ? theme.salmon
                        : theme.green,
                    }}
                    type="h1"
                  >
                    {monthlyExpensesPercentageChange.percentChange}
                    {" %"}
                  </Typography>
                  <Typography className="pt-10" type="h4">
                    {monthlyExpensesPercentageChange.isPositive
                      ? "increase in monthly expenses since last month"
                      : "decrease in monthly expenses since last month"}
                  </Typography>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
