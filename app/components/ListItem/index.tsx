import type { IconType } from "react-icons";
import styled from "styled-components";
import Typography from "../Typography";

type ListItemProps = {
  icon?: IconType;
  text: string;
  info?: string;
  unit?: string;
  actions?: React.ReactNode;
};

const Unit = styled.div`
  text-align: right;
  width: 100%;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: visible;
`;

const Container = styled.div`
  border-radius: 1.5em;
  display: flex;
  align-items: center;
  padding: 0.5em 1em 0.5em 1em;
  gap: 2%;
  :hover {
    background-color: ${(props) => props.theme.primaryLight};
    color: ${(props) => props.theme.ghostWhite};
  }
  :hover ${ActionsContainer} {
    visibility: visible;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2em;
  min-width: 100px;
  width: 100%;
`;

const ListItem = ({ text, info, icon, unit, actions }: ListItemProps) => {
  const Icon = icon;
  return (
    <Container>
      <h1>{Icon && <Icon />}</h1>
      <TextContainer>
        <Typography type="h2">{text}</Typography>
        {info && <Typography type="body2">{info}</Typography>}
      </TextContainer>
      <Unit>{`${unit} € `}</Unit>
      {actions && <ActionsContainer>{actions}</ActionsContainer>}
    </Container>
  );
};

export default ListItem;
