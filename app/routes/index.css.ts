import { style } from "@vanilla-extract/css";

export const CardContainer = style({
  paddingTop: "5em",
  paddingBottom: "5em",
  display: "flex",
  flexWrap: "wrap",
  gap: "4%",
  width: "100%",
});

export const ContentContainer = style({
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
