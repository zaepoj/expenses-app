import { style } from "@vanilla-extract/css";

export const label = style({
  fontSize: "0.9em",
  lineHeight: "2",
  textTransform: "capitalize",
});

export const errorLabel = style({
  color: "#ef7171",
  height: "1em",
  marginBottom: "1em",
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
