import type { IconType } from "react-icons";
import styled from "styled-components";
import Typography from "../Typography";

type ListItemProps = {
  icon?: IconType;
  text: string;
  info?: string;
	unit?: string;
};

const Container = styled.div`
  display: flex;
  align-items: center;
	gap: 2em;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
	padding-left: 2em;
`;

const Unit = styled.div`
padding-left: 8em;
`

const ListItem = ({ text, info, icon, unit }: ListItemProps) => {
  const Icon = icon;
  return (
    <Container>
      <h1>{Icon && <Icon />}</h1>
      <TextContainer>
        <Typography type="h2" text={text} />
        {info && <Typography type="body1" text={info} />}
      </TextContainer>
			<Unit>{unit}</Unit>
    </Container>
  );
};

export default ListItem;


