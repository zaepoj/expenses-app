import { style } from "@vanilla-extract/css";
import { theme } from "~/theme";

export const cardContainer = style({
  width: "500px",
  minHeight: "250px",
  backgroundColor: theme.ghostWhite,
  display: "flex",
  color: theme.primaryDark,
  borderRadius: "0.5em",
  padding: "1em",
  flexDirection: "column",
  marginTop: "1em",
  boxShadow: "rgb(0 0 0 / 10%) 0px 4px 10px",

  "@media": {
    "only screen and (max-width: 700px)": {
      paddingRight: "1em",
    },
  },
});

export const cardTopContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export const cardInfoLabel = style({
  marginLeft: "auto",
  fontWeight: 100,
  fontSize: "0.95em",
  color: theme.fadedTeal,
});

export const cardContentContainer = style({
  fontWeight: "bold",
  fontSize: "1em",
  paddingTop: "1em",
  paddingLeft: "0.5em",
});
