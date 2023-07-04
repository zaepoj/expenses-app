// import Balancer from "react-wrap-balancer";

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

const Typography = (props: TypographyProps) => {
  return (
    <>
      {props.type === "h1" && <h1 {...props}>{props.children}</h1>}
      {props.type === "h2" && <h2 {...props}>{props.children}</h2>}
      {props.type === "h3" && <h3 {...props}>{props.children}</h3>}
      {props.type === "h4" && <h4 {...props}>{props.children}</h4>}
      {props.type === "h5" && <h5 {...props}>{props.children}</h5>}
      {props.type === "h6" && <h6 {...props}>{props.children}</h6>}
      {props.type === "body1" && <p {...props}>{props.children}</p>}
      {props.type === "body2" && (
        <p style={{ fontSize: "0.8em" }} {...props}>
          {props.children}
        </p>
      )}
    </>
  );
};

export default Typography;
