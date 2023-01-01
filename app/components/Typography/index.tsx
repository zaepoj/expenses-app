import styled from "styled-components";
import Balancer from "react-wrap-balancer";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2";

type TypographyProps = {
  type: TypographyVariant;
  children: any;
  style?: any;
};

const BaseTypography = styled.p``;

const H1 = styled(BaseTypography).attrs({ as: "h1" })``;
const H2 = styled(BaseTypography).attrs({ as: "h2" })``;
const H3 = styled(BaseTypography).attrs({ as: "h3" })``;
const H4 = styled(BaseTypography).attrs({ as: "h4" })``;
const Subheading1 = styled(BaseTypography).attrs({ as: "h5" })``;
const Subheading2 = styled(BaseTypography).attrs({ as: "h6" })``;
const Body1 = styled(BaseTypography).attrs({ as: "p" })``;
const Body2 = styled(BaseTypography).attrs({ as: "p" })`
  font-size: 0.8em;
`;

const Typography = (props: TypographyProps) => {
  return (
    <>
      {props.type === "h1" && (
        <H1 {...props}>
          <Balancer>{props.children}</Balancer>
        </H1>
      )}
      {props.type === "h2" && (
        <H2 {...props}>
          <Balancer>{props.children}</Balancer>
        </H2>
      )}
      {props.type === "h3" && (
        <H3 {...props}>
          <Balancer>{props.children}</Balancer>
        </H3>
      )}
      {props.type === "h4" && (
        <H4 {...props}>
          <Balancer>{props.children}</Balancer>
        </H4>
      )}
      {props.type === "h5" && (
        <Subheading1 {...props}>
          <Balancer>{props.children}</Balancer>
        </Subheading1>
      )}
      {props.type === "h6" && (
        <Subheading2 {...props}>
          <Balancer>{props.children}</Balancer>
        </Subheading2>
      )}
      {props.type === "body1" && (
        <Body1 {...props}>
          <Balancer>{props.children}</Balancer>
        </Body1>
      )}
      {props.type === "body2" && (
        <Body2 {...props}>
          <Balancer>{props.children}</Balancer>
        </Body2>
      )}
    </>
  );
};

export default Typography;
