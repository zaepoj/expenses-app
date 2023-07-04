import { recipe } from "@vanilla-extract/recipes";
import { theme } from "~/theme";

export const button = recipe({
  base: {
    minHeight: "32px",
    padding: "0px 14px",
    border: "0px solid transparent",
    lineHeight: "normal",
    transitionProperty: "background",
    transitionDuration: "0.25s",
    borderRadius: "4px",
    minWidth: "50px",
    color: theme.ghostWhite,
    fontWeight: "500",
    userSelect: "none",
  },
  variants: {
    variant: {
      disabled: { background: "#cdc9c8" },
      secondary: {
        background: theme.salmon,
        ":hover": { background: theme.fadedTeal, cursor: "pointer" },
      },
      primary: {
        background: theme.primary,
        ":hover": { background: theme.primaryLight, cursor: "pointer" },
      },
      tertiary: {
        background: "transparent",
        color: theme.salmon,
        fontWeight: "800",
        ":hover": { background: "transparent", cursor: "pointer" },
      },
    },
    rounded: {
      true: { borderRadius: "9999px" },
    },
    fullWidth: {
      true: { minWidth: "100%" },
    },
    upperCase: {
      true: { textTransform: "uppercase" },
    },
  },
});
