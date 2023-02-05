import * as styles from "./styles.css";

type LoaderBarProps = {
  loading: boolean;
};

const LoaderBar = ({ loading }: LoaderBarProps) => {
  return (
    <div className={`${styles.base}`}>
      {loading && <div className={styles.indicator}></div>}
    </div>
  );
};

export default LoaderBar;
