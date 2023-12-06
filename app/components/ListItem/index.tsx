import type { IconType } from "react-icons";
import Typography from "../Typography";

type ListItemProps = {
  icon?: IconType;
  text: string;
  info?: string;
  unit?: string;
  actions?: React.ReactNode;
};

const ListItem = ({ text, info, icon, unit, actions }: ListItemProps) => {
  const Icon = icon;
  return (
    <div className="rounded flex items-center px-4 py-2 gap-4 hover:bg-indigo-900">
      <h1>{Icon && <Icon />}</h1>
      <div className="flex flex-col pl-8">
        <Typography type="h2">{text}</Typography>
        {info && <Typography type="body2">{info}</Typography>}
      </div>
      <div className="text-right w-full">{`${unit} € `}</div>
      {actions && (
        <div className="flex items-center justify-center visible">
          {actions}
        </div>
      )}
    </div>
  );
};

export default ListItem;
