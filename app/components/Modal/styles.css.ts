import { style } from "@vanilla-extract/css";
import { theme } from "~/theme";

export const dialog = style({
  top: "15%",
  left: "50%",
  marginLeft: "-300px",
  right: "auto",
  bottom: "auto",
  borderRadius: "0.5em",
  border: "1px solid rgb(239, 241, 244)",
  position: "absolute",
  paddingTop: "0",
  minWidth: "650px",
  background: theme.ghostWhite,
  "@media": {
    "only screen and (max-width: 800px)": {
      width: "100%",
      top: "0",
      left: "0",
      marginLeft: "0",
      height: "100%",
      minWidth: "100%",
    },
  },
});

export const modalHeader = style({
  paddingTop: "1em",
  paddingLeft: "1em",
  paddingBottom: "2em",
});

export const closeIcon = style({
  position: "absolute",
  top: "1em",
  right: "1em",
  paddingTop: "1em",
  paddingRight: "1em",
  fontSize: "1.5em",
  cursor: "pointer",
  color: theme.primaryDark,
  ":hover": {
    color: theme.fadedPrimaryText,
  },
});

export const modalContent = style({
  padding: "1em",
});
