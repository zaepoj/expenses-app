import type { ButtonHTMLAttributes } from "react";
import { button } from "./styles.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  round?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  onClick?: () => void;
  uppercase?: boolean;
  fullWidth?: boolean;
};

const Button = (props: ButtonProps) => {
  const { secondary, fullWidth, ...restProps } = props;

  return (
    <button
      {...restProps}
      className={button({
        variant: props.disabled
          ? "disabled"
          : props.secondary
          ? "secondary"
          : props.tertiary
          ? "tertiary"
          : "primary",
        fullWidth: props.fullWidth,
      })}
    >
      {props.children}
    </button>
  );
};
export default Button;
