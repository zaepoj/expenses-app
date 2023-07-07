import Button from "../Button";
import Typography from "../Typography";
import * as styles from "./styles.css";

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
    <div className={styles.cardContainer}>
      <div className={styles.cardTopContainer}>
        {title ? <Typography type="h2">{title} </Typography> : null}
        <div className={styles.cardInfoLabel}>
          <p>{infoLabel}</p>
        </div>
      </div>
      <div className={styles.cardContentContainer}>{children}</div>
      <div style={{ padding: "1em" }}>
        {clickable && (
          <Button style={{ alignSelf: "flex-end" }} onClick={onClick}>
            View
          </Button>
        )}
      </div>
    </div>
  );
}
