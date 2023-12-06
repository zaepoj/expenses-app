import { style } from "@vanilla-extract/css";

export const html = style({ height: "100%", margin: 0 });

export const body = style({
  height: "100%",
  background: "#11131F",
  fontFamily: "Lato",
  margin: 0,
  overflowX: "hidden",
});

export const container = style({
  height: "100%",
  display: "flex",

  "@media": {
    "only screen and (max-width: 700px)": {
      flexDirection: "column",
    },
  },
});

export const outletContainerLoginOrSignUpPage = style({
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",

  "@media": {
    "only screen and (max-width: 700px)": {
      margin: 0,
    },
  },
});

export const outletContainer = style({
  marginLeft: "100px",
  width: "100%",

  "@media": {
    "only screen and (max-width: 700px)": {
      margin: 0,
    },
  },
});
