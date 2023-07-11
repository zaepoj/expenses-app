import type { IconType } from "react-icons";
import * as styles from "./styles.css";
import useMedia from "~/hooks/useMedia";

type IconButtonProps = {
  icon: IconType;
  tooltip?: string;
  onClick: () => void;
};

const IconButton = ({ icon, tooltip, onClick }: IconButtonProps) => {
  const isMobile = useMedia({ breakpoint: "sm" });

  const Icon = icon;
  return (
    <div className={styles.iconButtonContainer} onClick={onClick}>
      <div className={styles.iconContainer}>
        <Icon />
      </div>
      {tooltip && isMobile ? (
        <label className={styles.tooltipText}>{tooltip}</label>
      ) : null}
    </div>
  );
};

export default IconButton;
