import { style } from "@vanilla-extract/css";
import { theme } from "~/theme";

export const iconButtonContainer = style({});

export const tooltipText = style({
  visibility: "hidden",
  position: "absolute",
  marginLeft: "-1em",
  marginTop: "0.25em",
  zIndex: 999,
  opacity: 0,
  transition: "opacity 0.5s",
  background: "black",
  color: theme.ghostWhite,
  backgroundColor: theme.primaryDark,
  padding: "0.3em",
  borderRadius: "1em",
  selectors: {
    [`${iconButtonContainer}:hover &`]: {
      visibility: "visible",
      opacity: 1,
    },
  },
});

export const iconContainer = style({
  fontSize: "1.3em",
  paddingTop: "0.2em",
});
