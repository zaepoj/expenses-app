import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  flexDirection: "column",
  minWidth: "350px",
  padding: "1em",
  margin: "auto",
});

export const InputContainer = style({
  display: "grid",
  rowGap: "10%",
  alignItems: "center",
});

export const SignUpLink = style({
  paddingLeft: "0.5em",
  color: "#afafe6",
  textDecoration: "none",
  fontSize: "1.1em",
});
