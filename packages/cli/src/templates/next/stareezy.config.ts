import { createUi } from "@stareezy-ui/tokens";

const ui = createUi({
  media: {
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
  shorthands: {
    p: "padding",
    px: "paddingHorizontal",
    py: "paddingVertical",
    pt: "paddingTop",
    pb: "paddingBottom",
    pl: "paddingLeft",
    pr: "paddingRight",
    m: "margin",
    mx: "marginHorizontal",
    my: "marginVertical",
    mt: "marginTop",
    mb: "marginBottom",
    ml: "marginLeft",
    mr: "marginRight",
    w: "width",
    h: "height",
    br: "borderRadius",
    bg: "backgroundColor",
  } as const,
});

export default ui;

type CustomUi = typeof ui;

declare module "@stareezy-ui/tokens" {
  interface SzrCustomConfig extends CustomUi {}
}
