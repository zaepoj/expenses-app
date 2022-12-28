import styled from "styled-components";
import { useState } from "react";

type TextFieldProps = {
  type: "text" | "password" | "number";
  placeholder?: string;
  label?: string;
  onChange?: () => void;
  name?: string;
  showPasswordCheckbox?: boolean;
  defaultValue?: string;
  errorHelper?: string;
  step?: any;
  required?: boolean;
  register?: any;
};

const StyledTextField = styled.input`
  background-color: ${(props) => props.theme.ghostWhite};
  border: 1px solid ${(props) => props.theme.primaryLight};
  border-radius: 0.125rem;
  height: 40px;
  padding-left: 0.7em;
  font-size: 1em;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledLabel = styled.label`
  color: ${(props) => props.theme.fadedTeal};
  font-size: 0.9em;
  padding-bottom: 0;
  line-height: 2;
`;

const ErrorLabel = styled.label`
  color: #ef7171;
  height: 1em;
  margin-bottom: 1em;
`;

const TextField = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FlexBox>
      {props.label && <StyledLabel>{props.label}</StyledLabel>}
      <StyledTextField
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
        <div>
          <input
            type="checkbox"
            onClick={() => setShowPassword(!showPassword)}
          />{" "}
          <label>Show Password</label>{" "}
        </div>
      )}
      <ErrorLabel>{props.errorHelper}</ErrorLabel>
    </FlexBox>
  );
};

export default TextField;
