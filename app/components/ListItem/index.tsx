import type { IconType } from "react-icons";
import Typography from "../Typography";
import * as styles from "./styles.css";

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
    <div className={styles.container}>
      <h1>{Icon && <Icon />}</h1>
      <div className={styles.textContainer}>
        <Typography type="h2">{text}</Typography>
        {info && <Typography type="body2">{info}</Typography>}
      </div>
      <div className={styles.unit}>{`${unit} € `}</div>
      {actions && <div className={styles.actionContainer}>{actions}</div>}
    </div>
  );
};

export default ListItem;
