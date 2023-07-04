import React from "react";
import ReactSelect from "react-select";
import * as styles from "./styles.css";

type SelectProps = {
  options: OptionsType;
  closeOnSelect?: boolean;
  defaultValue?: any;
  isMulti?: boolean;
  label?: string;
  name: string;
  errorHelper?: string;
  onChange?: any;
  onBlur?: any;
};

type OptionType = { [x: string]: any };
type OptionsType = Array<OptionType>;

const Select = React.forwardRef(
  (
    {
      options,
      closeOnSelect = false,
      isMulti = false,
      label,
      name,
      errorHelper,
      onBlur,
      onChange,
      defaultValue,
    }: SelectProps,
    ref
  ) => {
    return (
      <div className={styles.container}>
        {label ? <label className={styles.label}>{label}</label> : null}
        <ReactSelect
          ref={ref as any}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: "#5e5168",
              minHeight: "40px",
              borderRadius: "4px",
              padding: ".3em",
            }),
          }}
          name={name}
          options={options}
          isMulti={isMulti}
          onBlur={onBlur}
          onChange={onChange}
          closeMenuOnSelect={closeOnSelect}
          defaultValue={defaultValue}
        />
        <label className={styles.label}>{errorHelper}</label>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
