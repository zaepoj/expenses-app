import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import { requireAuth } from "~/server/auth.server";
import { getUserSettings } from "~/server/models/user.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireAuth(request);
  const userSettings = await getUserSettings(user.uid);

  return json({ user, userSettings });
};

export default function SavingsView() {
  const { userSettings } = useLoaderData<typeof loader>();

  const hasSavingsSettings = !!(
    userSettings?.emergencyFund &&
    userSettings?.savingsRate &&
    userSettings?.investmentRate
  );

  return (
    <>
      <div className="px-16 pb-8 pt-16 max-md:pt-40 max-md:px-2">
        {!hasSavingsSettings && (
          <Card>
            <>
              <h1 className="text-2xl font-bold text-orange-300">
                You haven't set up your savings settings yet.
              </h1>
              <p className="py-4 px-2 text-almostWhite">
                Set up your savings settings to get started.
              </p>
              <Link to="settings">
                <Button> Set up </Button>
              </Link>
            </>
          </Card>
        )}
        {hasSavingsSettings && (
          <div className="max-w-xl">
            <Card>
              <>
                <h1 className="text-2xl font-bold text-orange-300">
                  Your Savings Settings
                </h1>
                <div className="pl-4 py-4">
                  <div className="py-1">
                    <h2 className="text-xl font-bold text-orange-300">
                      Emergency Fund
                    </h2>
                    <p className="py-1 text-almostWhite">
                      {userSettings.emergencyFund}
                    </p>
                  </div>
                  <div className="py-1">
                    <h2 className="text-xl font-bold text-orange-300">
                      Investment Rate
                    </h2>
                    <p className="py-1 text-almostWhite">
                      {userSettings.investmentRate}%
                    </p>
                  </div>
                  <div className="py-1">
                    <h2 className="text-xl font-bold text-orange-300">
                      Savings Rate
                    </h2>
                    <p className="py-1 text-almostWhite">
                      {userSettings.savingsRate}%
                    </p>
                  </div>
                </div>
                <div className="flex justify-end px-6">
                  <Link to="settings">
                    <Button> Update </Button>
                  </Link>
                </div>
              </>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
