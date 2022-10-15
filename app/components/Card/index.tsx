import styled from "styled-components";
import Button from "../Button";

type CardProps = {
  title?: string;
  children: JSX.Element;
  infoLabel?: string;
  clickable?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
};

const CardContainer = styled.div<{ fullWidth: boolean }>`
  width: ${(props) => (props.fullWidth ? "100%" : "370px")};
  min-height: 150px;
  background: ${(props) => props.theme.darkPurpleTwo};
  display: flex;
  color: ${(props) => props.theme.ghostWhite};
  border-radius: 4px;
  padding: 1em;
  padding-top: 0;
  flex-direction: column;
  font-family: roboto;
`;

const CardTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CardInfoLabel = styled.div`
  margin-left: auto;
  font-weight: 100;
  font-size: 0.95em;
  color: ${(props) => props.theme.fadedTeal};
`;

const ViewButton = styled(Button)`
  align-self: flex-end;
  margin-top: auto;
`;

const CardContentContainer = styled.div`
  font-weight: bold;
  font-size: 2em;
  padding-left: 0.5em;
`;

export default function Card({
  title,
  children,
  infoLabel,
  onClick,
  clickable,
  fullWidth,
}: CardProps) {
  return (
    <CardContainer fullWidth={!!fullWidth}>
      <CardTopContainer>
        <h3>{title}</h3>
        <CardInfoLabel>
          <p>{infoLabel}</p>
        </CardInfoLabel>
      </CardTopContainer>
      <CardContentContainer>{children}</CardContentContainer>
      {clickable && <ViewButton onClick={onClick}> View</ViewButton>}
    </CardContainer>
  );
}
