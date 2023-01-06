import React from "react";
import ReactSelect from "react-select";
import styled from "styled-components";

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

const StyledLabel = styled.label`
  color: ${(props) => props.theme.fadedTeal};
  font-size: 0.9em;
  line-height: 2;
  text-transform: capitalize;
`;

const StyledSelect = styled(ReactSelect)``;

const ErrorLabel = styled.label`
  color: #ef7171;
  height: 1em;
  margin-bottom: 1em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

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
      <Container>
        {label ? <StyledLabel>{label}</StyledLabel> : null}
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
        <ErrorLabel>{errorHelper}</ErrorLabel>
      </Container>
    );
  }
);

export default Select;
