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
  width: ${(props) => (props.fullWidth ? "100%" : "500px")};
  min-height: 250px;
  background: ${(props) => props.theme.gray1};
  display: flex;
  color: ${(props) => props.theme.darkPurple};
  border-radius: 4px;
  padding: 1em;
  flex-direction: column;
  font-family: roboto;
  margin-top: 1em;

  @media only screen and (max-width: 820px) {
    width: 100%;
    padding-right: 1em;
  }
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
  font-size: 1em;
  padding-top: 1em;
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
      {clickable && (
        <ViewButton secondary onClick={onClick}>
          {" "}
          View
        </ViewButton>
      )}
    </CardContainer>
  );
}
