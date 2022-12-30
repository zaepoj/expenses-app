import react from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

type IconButtonProps = {
  icon: IconType;
  tooltip?: string;
  onClick: () => void;
};

const TooltipText = styled.label`
  visibility: hidden;
  position: absolute;
  margin-left: -1em;
  margin-top: 0.25em;
  z-index: 999;
  opacity: 0;
  transition: opacity 0.5s;
  background: black;
  color: ${(props) => props.theme.ghostWhite};
  background: ${(props) => props.theme.primaryDark};
  padding: 0.3em;
  border-radius: 1em;
`;

const IconButtonContainer = styled.div`
  cursor: pointer;
  width: 30px;
  text-align: center;
  padding: 0 0.35em 0 0.35em;

  :hover {
    background: ${(props) => props.theme.primaryLightFaded};
    border-radius: 0.8em;
  }
  :hover ${TooltipText} {
    visibility: visible;
    opacity: 1;
  }
`;

const IconContainer = styled.div`
  font-size: 1.3em;
  padding-top: 0.2em;
`;

const IconButton = ({ icon, tooltip, onClick }: IconButtonProps) => {
  const Icon = icon;
  return (
    <IconButtonContainer onClick={onClick}>
      <IconContainer>
        <Icon />
      </IconContainer>
      {tooltip ? <TooltipText>{tooltip}</TooltipText> : null}
    </IconButtonContainer>
  );
};

export default IconButton;
