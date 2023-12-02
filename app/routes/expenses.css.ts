import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const contentContainer = style({
  height: "100%",
  flex: "1",
  paddingLeft: "2em",
  paddingRight: "2em",
  paddingBottom: "2em",
  paddingTop: "5em",
  marginLeft: "auto",

  "@media": {
    "only screen and (max-width: 700px)": {
      paddingLeft: "0.25em",
      paddingRight: "0.25em",
      paddingTop: "10em",
      marginLeft: "0.25em",
    },
  },
});

export const expenseListContainer = style({
  padding: "1rem",

  "@media": {
    "only screen and (max-width: 700px)": {
      padding: "0.25em",
    },
  },
});

export const expensesSummaryContainer = style({
  display: "flex",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
  marginTop: "3em",
  marginBottom: "3em",
  alignItems: "center",

  "@media": {
    "only screen and (max-width: 700px)": {
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export const pieContainer = recipe({
  base: {
    margin: "1.2em",
    height: "50vh",
    padding: ".2em",
  },
  variants: {
    desktop: {
      true: {
        width: "50%",
      },
      false: {
        width: "100%",
      },
    },
  },
});

export const progressContainer = style({
  flexGrow: 1,
  padding: "1em",

  "@media": {
    "only screen and (max-width: 700px)": {
      padding: "0.25em",
    },
  },
});
