import { style } from "@vanilla-extract/css";

export const unit = style({
  textAlign: "right",
  width: "100%",

  '@media': {
    'only screen and (max-width: 700px)': {
      fontSize: "0.7em",
    },
  },
});

export const container = style({
  borderRadius: "1.5em",
  display: "flex",
  alignItems: "center",
  padding: "0.5em 1em 0.5em 1em",
  gap: "2%",
  ":hover": {
    backgroundColor: "#1d1228",
    color: "#f8f8f8",
  },
});

export const actionContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  visibility: "visible",
  selectors: {
    [`${container}:hover &`]: {
      visibility: "visible",
    },
  },
});

export const textContainer = style({
  display: "flex",
  flexDirection: "column",
  paddingLeft: "2em",
  minWidth: "100px",
  width: "100%",


  '@media': {
    'only screen and (max-width: 700px)': {
      fontSize: "0.7em",
    },
  },
});
