import type { ButtonHTMLAttributes } from "react";
import { button } from "./styles.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  round?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  uppercase?: boolean;
  fullWidth?: boolean;
};
const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      style={props.style}
      onClick={props.onClick}
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
