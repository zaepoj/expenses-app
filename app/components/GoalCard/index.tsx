import { RadialBar, type RadialBarCustomLayerProps } from "@nivo/radial-bar";
import Card from "../Card";

type GoalCardProps = {
  goal: number;
  currentAmount: number;
};

const GoalCard = ({ goal, currentAmount }: GoalCardProps) => {
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
    <Card>
      <>
        <h1 className="text-2xl font-bold text-orange-300">Goal 1</h1>
        <div>
          <RadialBar
            width={360}
            height={360}
            maxValue={100}
            startAngle={-90}
            endAngle={90}
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
      </>
    </Card>
  );
};

export default GoalCard;
