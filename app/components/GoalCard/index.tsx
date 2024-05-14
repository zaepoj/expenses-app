import {
  ResponsiveRadialBar,
  type RadialBarCustomLayerProps,
} from "@nivo/radial-bar";
import Card from "../Card";
import Button from "../Button";
import { Link } from "@remix-run/react";

type GoalCardProps = {
  goal: number;
  currentAmount: number;
  linkTo: string;
};

const GoalCard = ({ goal, currentAmount, linkTo }: GoalCardProps) => {
  const currentAmountPercentage = (currentAmount / goal) * 100;

  const Progress = ({ center }: RadialBarCustomLayerProps) => {
    return (
      <>
        <text
          x={center[0]}
          y={center[1]}
          textAnchor="middle"
          dominantBaseline="up"
          style={{
            fontSize: 50,
            fill: "#818cf8",
          }}
        >
          {currentAmount.toFixed(2) + "%"}
        </text>
      </>
    );
  };

  return (
    <div className="sm:max-w-md max-sm:px-2">
      <Card>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-orange-300">Goal 1</h1>
          <div className="flex items-center justify-center h-64">
            <ResponsiveRadialBar
              maxValue={100}
              startAngle={-90}
              endAngle={90}
              margin={{ top: 25, bottom: -200 }}
              cornerRadius={100}
              innerRadius={0.8}
              colors={["#818cf8"]}
              animate={true}
              isInteractive={false}
              data={[
                {
                  id: "Goal",
                  data: [
                    {
                      x: "current",
                      y: currentAmountPercentage,
                    },
                  ],
                },
              ]}
              layers={["tracks", "bars", Progress]}
            />
          </div>
          <div className="mt-12 self-end px-4">
            <Link to={linkTo}>
              <Button>Update</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GoalCard;
