import { type InputHTMLAttributes, useState } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
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
  helperIcon?: React.ReactNode;
};

const TextField = ({
  label,
  name,
  onChange,
  type,
  placeholder,
  step,
  defaultValue,
  required,
  register,
  helperIcon,
  errorHelper,
  showPasswordCheckbox,
  ...props
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="text-teal-100 text-xs leading-8 pb-0">{label}</label>
      )}
      <div className="flex gap-5 w-full">
        <input
          {...props}
          autoComplete="off"
          className="text-slate-600 bg-ghostWhite border-primaryLight border rounded text-lg h-10 px-4 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent w-full"
          name={name}
          onChange={onChange}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          step={step}
          required={required || false}
          {...(register ? register(name, { required: required || false }) : {})}
        />
        {helperIcon && helperIcon}
      </div>
      {type === "password" && showPasswordCheckbox && (
        <div style={{ marginTop: "1em" }}>
          <input
            type="checkbox"
            onClick={() => setShowPassword(!showPassword)}
          />{" "}
          <label>Show Password</label>{" "}
        </div>
      )}
      <label className="text-red-400 h-4">{errorHelper}</label>
    </div>
  );
};

export default TextField;
