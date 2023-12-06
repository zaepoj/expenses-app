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
  children: React.ReactNode;
  style?: any;
  className?: string;
};

const Typography = (props: TypographyProps) => {
  return (
    <>
      {props.type === "h1" && (
        <h1 className="text-almostWhite" {...props}>
          {props.children}
        </h1>
      )}
      {props.type === "h2" && (
        <h2 className="text-almostWhite" {...props}>
          {props.children}
        </h2>
      )}
      {props.type === "h3" && (
        <h3 className="text-almostWhite" {...props}>
          {props.children}
        </h3>
      )}
      {props.type === "h4" && (
        <h4 className="text-almostWhite" {...props}>
          {props.children}
        </h4>
      )}
      {props.type === "h5" && (
        <h5 className="text-almostWhite" {...props}>
          {props.children}
        </h5>
      )}
      {props.type === "h6" && (
        <h6 className="text-almostWhite" {...props}>
          {props.children}
        </h6>
      )}
      {props.type === "body1" && (
        <p className="text-almostWhite" {...props}>
          {props.children}
        </p>
      )}
      {props.type === "body2" && (
        <p
          className="text-almostWhite"
          style={{ fontSize: "0.8em" }}
          {...props}
        >
          {props.children}
        </p>
      )}
    </>
  );
};

export default Typography;
