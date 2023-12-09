import { useState } from "react";

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
    <div className="flex flex-col w-full">
      {props.label && (
        <label className="text-teal-100 text-xs leading-8 pb-0">
          {props.label}
        </label>
      )}
      <input
        className="text-slate-600 bg-ghostWhite border-primaryLight border rounded text-lg h-10 px-4 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
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
      <label className="text-red-400 h-4">{props.errorHelper}</label>
    </div>
  );
};

export default TextField;
