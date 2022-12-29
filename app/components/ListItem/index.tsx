import type { IconType } from "react-icons";
import styled from "styled-components";
import Typography from "../Typography";

type ListItemProps = {
  icon?: IconType;
  text: string;
  info?: string;
  unit?: string;
};

const Unit = styled.div`
  padding-left: 8em;
  text-align: right;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.primaryLight};
    color: ${(props) => props.theme.ghostWhite};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2em;
  min-width: 100px;
  width: 100%;
`;

const ListItem = ({ text, info, icon, unit }: ListItemProps) => {
  const Icon = icon;
  return (
    <Container>
      <h1>{Icon && <Icon />}</h1>
      <TextContainer>
        <h2>{text}</h2>
        {info && <p>{info}</p>}
      </TextContainer>
      <Unit>{`${unit} € `}</Unit>
    </Container>
  );
};

export default ListItem;
