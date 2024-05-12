import Button from "../Button";
import Typography from "../Typography";

type CardProps = {
  title?: string;
  children: JSX.Element;
  infoLabel?: string;
  clickable?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
};

export default function Card({
  title,
  children,
  infoLabel,
  onClick,
  clickable,
}: CardProps) {
  return (
    <div className="w-full min-w-250 bg-card flex text-almostWhite rounded-xl flex-col mt-1 shadow-md ">
      <div className="flex p-4 flex-row items-center w-full">
        {title ? <Typography type="h2">{title} </Typography> : null}
        <div className=" ml-auto font-thin text-sm text-slate-400">
          <p>{infoLabel}</p>
        </div>
      </div>
      <div className="text-base pt-4 pl-4">{children}</div>
      <div className="p-4">
        {clickable && (
          <Button style={{ alignSelf: "flex-end" }} onClick={onClick}>
            View
          </Button>
        )}
      </div>
    </div>
  );
}
