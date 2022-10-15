import styled from "styled-components";

type ButtonProps = {
  round?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  onClick?: () => void;
  uppercase?: boolean;
};

const Button = styled.button<ButtonProps>`
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "")};
  min-width: 50px;
  height: 32px;
  padding: 0px 14px;
  background: ${(props) =>
    props.secondary
      ? props.theme.teal
      : props.tertiary
      ? "transparent"
      : props.theme.salmon};
  border: 0px solid transparent;
  border-radius: ${(props) =>
    props.round ? "9999px" : props.tertiary ? "0px" : "4px"};
  border-bottom: ${(props) => (props.tertiary ? "1px solid transparent" : "")};
  line-height: normal;
  color: ${(props) =>
    props.tertiary ? props.theme.salmon : props.theme.ghostWhite};
  font-weight: ${(props) => (props.tertiary ? "800" : "500")};
  transition-property: background;
  transition-duration: 0.25s;
  :hover {
    background: ${(props) =>
      props.secondary
        ? props.theme.fadedTeal
        : props.tertiary
        ? "transparent"
        : props.theme.fadedSalmon};
    cursor: pointer;
    border-bottom: ${(props) => (props.tertiary ? "1px" : "0px")} solid
      ${(props) => props.theme.salmon};
  }
`;
export default Button;
