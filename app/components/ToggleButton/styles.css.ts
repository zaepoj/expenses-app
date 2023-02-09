import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
});

export const toggle = style({
  position: "relative",
  appearance: "none",
  backgroundColor: "#cbd5e1",
  borderRadius: "3.5em",
  height: "2.5em",
  width: "4.5em",
  minWidth: "4.5em",
  marginRight: "0.5em",
  cursor: "pointer",
  ":checked": {
    backgroundColor: "#5eead4",
  },
  ":before": {
    content: "",
    position: "absolute",
    transition:
      "background-color 200ms ease-in-out, transform 200ms ease-in-out ",
  },
  ":after": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    content: "✕",
    color: "#cbd5e1",
    position: "absolute",
    width: "2.1em",
    height: "2.1em",
    top: "0.15em",
    left: "0.25em",
    backgroundColor: "#525252",
    borderRadius: "1.8em",
    transition:
      "background-color 200ms ease-in-out, transform 200ms ease-in-out ",
  },
  selectors: {
    "&:checked:after": {
      content: "✓",
      color: "#5eead4",
      left: 0,
      backgroundColor: "#525252",
      transform: "translateX(100%)",
    },
  },
});

export const label = style({
  width: "100%",
});
