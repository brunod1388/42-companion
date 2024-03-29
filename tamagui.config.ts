import { config as configBase } from "@tamagui/config/v3"
import { createTamagui } from "tamagui"
import { colors } from "./theme/color"

export const tamaguiConfig = createTamagui({
  ...configBase,

  defaultProps: {
    Button: {
      theme: "blue5",
    },
  },
  fonts: {
    ...configBase.fonts,
  },
  themes: {
    ...configBase.themes,
    dark: {
      ...configBase.themes.dark,
      background: colors.black,
      color: colors.white,
    },
    light: {
      ...configBase.themes.light,
      background: colors.black,
      color: colors.white,
    },
  },
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
