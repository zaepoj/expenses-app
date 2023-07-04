import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { theme } from "~/theme";

export const container = style({
  position: "fixed",
  display: "flex",
  paddingTop: "5em",
  paddingBottom: "5em",
  backgroundColor: "rgb(65, 35, 89)",
  height: "100%",
  maxWidth: "100px",
  boxShadow: "rgb(0 0 0 / 10%) 5px 10px 44px",

  "@media": {
    "only screen and (max-width: 700px)": {
      flexDirection: "column",
      paddingTop: "0.25em",
      paddingBottom: "0.25em",
      height: "auto",
      width: "100%",
      maxWidth: "100%",
      borderRadius: "0",
      marginTop: "0",
      overflowX: "auto",
      whiteSpace: "nowrap",
    },
  },
});

export const nav = style({
  width: "250px",

  "@media": {
    "only screen and (max-width: 700px)": {
      width: "100%",
      border: "0",
    },
  },
});

export const ul = style({
  padding: "0",
  margin: "0",

  "@media": {
    "only screen and (max-width: 700px)": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      padding: "0.5em",
      margin: "0.5em",
    },
  },
});

export const li = style({
  listStyle: "none",
  padding: "0.5em",
  margin: "0.5em",
  borderRadius: "0.5em",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",

  ":hover": {
    backgroundColor: "rgb(65, 35, 89)",
    color: "white",
  },

  "@media": {
    "only screen and (max-width: 700px)": {
      padding: "0.25em",
      margin: "0.25em",
      borderRadius: "0.25em",
    },
  },
});

export const navItem = recipe({
  base: {
    fontSize: "1.2em",
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
    justifyContent: "center",
    color: theme.ghostWhite,
    transitionProperty: "color",
    transitionDuration: "0.15s",
    ":hover": {
      color: theme.fadedTeal,
    },
  },
  variants: {
    isCurrentPath: {
      true: {
        textDecoration: "underline",
      },
    },
  },
});

export const iconContainer = style({
  padding: "0.75em",
  background: "#1d1228",
  borderRadius: "0.5em",
  boxShadow: "-15px -15px 69px #180f21, 15px 15px 69px #22152f",
});

export const tooltipText = style({
  visibility: "hidden",
  position: "absolute",
  marginLeft: "-1.5em",
  marginTop: "2.5em",
  zIndex: 999,
  opacity: 0,
  transition: "opacity 0.5s",
  color: theme.ghostWhite,
  background: theme.primaryDark,
  padding: "0.3em",
  borderRadius: "1em",
  fontSize: "0.8em",
  selectors: {
    [`${iconContainer}:hover &`]: {
      visibility: "visible",
      opacity: 1,
    },
  },
});
