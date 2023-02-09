import Typography from "../Typography";
import * as styles from "./styles.css";

type Props = {
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
};

const ToggleButton = ({ checked = false, onChange, label }: Props) => {
  return (
    <div className={styles.container}>
      <input
        onChange={onChange}
        checked={checked}
        id="toggleBtn"
        className={styles.toggle}
        type="checkbox"
      ></input>
      <label className={styles.label} htmlFor="toggleBtn">
        <Typography type="h5">{label || ""}</Typography>
      </label>
    </div>
  );
};

export default ToggleButton;
