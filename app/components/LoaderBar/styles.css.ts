import { style, keyframes } from "@vanilla-extract/css";

export const base = style({
  height: "5px",
  overflow: "hidden",
});

export const animation = keyframes({
  "0%": { width: "0%", transform: "translateX(0)" },
  "50%": { width: "50%", transform: "translateX(0)" },
  "100%": { width: "100%", transform: "translateX(100%)" },
});

export const indicator = style({
  height: "100%",
  opacity: "0.5",
  backgroundColor: "#5958B1",
  animation: `${animation} 1.25s infinite linear`,
  transformOrigin: "0% 50%",
});
