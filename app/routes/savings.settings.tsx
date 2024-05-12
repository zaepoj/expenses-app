import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useForm } from "react-hook-form";
import Card from "~/components/Card";
import TextField from "~/components/TextField";
import HelperIcon from "~/components/HelperIcon";
import Typography from "~/components/Typography";
import Button from "~/components/Button";
import {
  type ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  json,
} from "@remix-run/node";
import BackButton from "~/components/BackButton";
import { savingSettingValidationSchema } from "~/utils/savingSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getUserSettings,
  updateUserSavingSettings,
} from "~/server/models/user.server";
import { requireAuth } from "~/server/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await requireAuth(request);
  const formData = await request.formData();
  try {
    const formPayload = Object.fromEntries(formData);
    const parsedData = savingSettingValidationSchema.parse(formPayload);
    console.log(parsedData);

    await updateUserSavingSettings(parsedData, user.uid);

    return redirect("/savings");
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireAuth(request);
  const userSettings = await getUserSettings(user.uid);

  return json({ user, userSettings });
};

const SavingsSettings = () => {
  const { userSettings } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const actionErrors = actionData?.errors as any;
  const transition = useNavigation();
  const isSubmitting = transition.state === "submitting";

  console.log("isSubmitting", isSubmitting);
  const {
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(savingSettingValidationSchema),
    mode: "onTouched",
    defaultValues: {
      emergencyFund: userSettings?.emergencyFund || "",
      investmentRate: userSettings?.investmentRate || "",
      savingsRate: userSettings?.savingsRate || "",
    },
  });

  console.log("errors", errors);
  return (
    <div className="h-full flex-1 px-16 pb-8 pt-16 max-md:pt-40 max-md:px-2">
      <BackButton text="Savings" to="/savings" />
      <Card title="Saving Settings">
        <div>
          <div className="pr-4">
            <Typography type="body1">
              Emergency fund is usually 3-6 months of your expenses. This is the
              money you want to have in your savings account in case of
              emergency.
              <br />
              <br />
              On the day you receive your salary, you want to first make sure
              you have enough money in your emergency fund. Once you have enough
              money in your emergency fund, you can invest or put the rest of
              the money into your long term savings account.
              <br />
              <br />
              The amounts are calculated with the following formula:
              <br />
              <code className="text-sm">
                amountAfterBuffer: (Current account balance - emergency fund){" "}
                <br />
                amountToInvest: amountAfterBuffer * (investmentRate / 100)
                <br />
                amountToSavings: amountAfterBuffer * (savingsRate / 100)
              </code>
            </Typography>
          </div>
          <div className="mt-4 pl-4 pr-8 max-w-sm">
            <Form method="post">
              <div className="">
                <div className="mt-4">
                  <TextField
                    name="emergencyFund"
                    placeholder="8000"
                    type="number"
                    label="Emergency Fund Goal"
                    errorHelper={
                      errors.emergencyFund?.message?.toString() ||
                      actionErrors?.emergencyFund
                    }
                    register={register}
                    helperIcon={
                      <HelperIcon helperText="How much money do you want to have in your emergency fund" />
                    }
                  />
                </div>
                <div className="mt-4 pb-4">
                  <TextField
                    name="investmentRate"
                    placeholder="40"
                    type="number"
                    pattern="\d*"
                    label="Investment Rate % (0-100)"
                    errorHelper={
                      errors.investmentRate?.message?.toString() ||
                      actionErrors?.investmentRate
                    }
                    register={() =>
                      register("investmentRate", { deps: ["savingsRate"] })
                    }
                    helperIcon={
                      <HelperIcon helperText="What procent (%) of the money over emergency fund you want to put into investments" />
                    }
                  />
                </div>
                <div className="mt-4 pb-4">
                  <TextField
                    name="savingsRate"
                    placeholder="60"
                    type="number"
                    label="Savings Rate % (0-100)"
                    errorHelper={
                      errors.savingsRate?.message?.toString() ||
                      actionErrors?.savingsRate
                    }
                    register={() =>
                      register("savingsRate", { deps: ["investmentRate"] })
                    }
                    helperIcon={
                      <HelperIcon helperText="What procent (%) of the money over emergency fund you want to put into your long term savings account" />
                    }
                  />
                </div>
              </div>
              <div className="mt-12">
                <Button disabled={isSubmitting} type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SavingsSettings;
