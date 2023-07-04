import { useState } from "react";
import * as styles from "./styles.css";

type TextFieldProps = {
  type: "text" | "password" | "number";
  placeholder?: string;
  label?: string;
  onChange?: () => void;
  name?: string;
  showPasswordCheckbox?: boolean;
  defaultValue?: string | number;
  errorHelper?: string;
  step?: any;
  required?: boolean;
  register?: any;
};

const TextField = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles.container}>
      {props.label && <label className={styles.label}>{props.label}</label>}
      <input
        className={styles.textField}
        name={props.name}
        onChange={props.onChange}
        type={props.type === "password" && showPassword ? "text" : props.type}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        step={props.step}
        required={props.required || false}
        {...(props.register ? props.register(props.name) : {})}
      />
      {props.type === "password" && props.showPasswordCheckbox && (
        <div style={{ marginTop: "1em" }}>
          <input
            type="checkbox"
            onClick={() => setShowPassword(!showPassword)}
          />{" "}
          <label>Show Password</label>{" "}
        </div>
      )}
      <label className={styles.errorLabel}>{props.errorHelper}</label>
    </div>
  );
};

export default TextField;
