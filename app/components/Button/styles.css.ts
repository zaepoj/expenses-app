import { recipe } from "@vanilla-extract/recipes";
import { theme } from "~/theme";

export const button = recipe({
  base: [
    "h-8 rounded  px-4 border-0 leading-normal transition-background duration-250 min-w-50 font-semibold user-select-none",
    {
      color: theme.ghostWhite,
    },
  ],
  variants: {
    variant: {
      disabled: { background: "#cdc9c8" },
      secondary: {
        background: theme.salmon,
        ":hover": { background: theme.fadedTeal, cursor: "pointer" },
      },
      primary: ["bg-indigo-900 hover:bg-indigo-700", {}],
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
