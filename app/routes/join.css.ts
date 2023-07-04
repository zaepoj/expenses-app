import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  flexDirection: "column",
  maxWidth: "450px",
  padding: "1em",
  margin: "auto",
});

export const HeaderContainer = style({
  paddingBottom: "3em",
});

export const InputContainer = style({
  display: "grid",
  alignItems: "center",
});

export const SignUpLink = style({
  paddingLeft: "0.5em",
  color: "#afafe6",
  textDecoration: "none",
  fontSize: "1.1em",
});
