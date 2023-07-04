import { style } from "@vanilla-extract/css";
import { theme } from "../../theme";

export const textField = style({
  backgroundColor: theme.ghostWhite,
  border: `1px solid ${theme.primaryLight}`,
  borderRadius: "0.125rem",
  height: "40px",
  paddingLeft: "0.7em",
  fontSize: "1em",
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const label = style({
  color: theme.fadedTeal,
  fontSize: "0.9em",
  paddingBottom: "0",
  lineHeight: "2",
});

export const errorLabel = style({
  color: "#ef7171",
  height: "1em",
  marginBottom: "1em",
});
