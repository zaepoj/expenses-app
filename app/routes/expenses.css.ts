import { style } from "@vanilla-extract/css";

export const contentContainer = style({
  height: "100%",
  flex: "1",
  paddingLeft: "2em",
  paddingRight: "2em",
  paddingTop: "5em",
  marginLeft: "5em",

  "@media": {
    "only screen and (max-width: 700px)": {
      paddingLeft: "0.25em",
      paddingRight: "0.25em",
      paddingTop: "10em",
    },
  },
});
