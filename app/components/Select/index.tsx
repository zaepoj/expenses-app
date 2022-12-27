import React from "react";
import ReactSelect from "react-select";
import styled from "styled-components";

type SelectProps = {
  options: OptionsType;
  closeOnSelect?: boolean;
  defaultValue?: OptionsType;
  isMulti?: boolean;
  label?: string;
  name: string;
  errorHelper?: string;
	required?: boolean;
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

const Select = ({
  options,
  closeOnSelect = false,
  isMulti = false,
  label,
  name,
  errorHelper,
	required = false
}: SelectProps) => {
  return (
    <Container>
      {label ? <StyledLabel>{label}</StyledLabel> : null}
      <StyledSelect
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: "#5e5168",
            minHeight: "40px",
            borderRadius: "4px",
            padding: ".3em",
          }),
        }}
				required={required}
        name={name}
        options={options}
        isMulti={isMulti}
        closeMenuOnSelect={closeOnSelect}
      />
      <ErrorLabel>{errorHelper}</ErrorLabel>
    </Container>
  );
};

export default Select;
