import { style } from "@vanilla-extract/css";

export const actionContainer = style({
  paddingTop: "2em",
  paddingBottom: "1em",
  display: "flex",
  justifyContent: "flex-end",
  gap: "2%",
});

export const errorMessage = style({
  width: "100%",
});

export const errorContainer = style({
  paddingLeft: "1em",
  color: "#ef7171",
  display: "flex",
  width: "100%",
  alignItems: "center",
  gap: "2%",
});
