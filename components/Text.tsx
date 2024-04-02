import { useTheme } from "context/themeContext"
import { Scope } from "i18n-js"
import { t } from "i18n/i18n"
import { Text as TText, TextProps as TTextProps, XStack } from "tamagui"
import { colors, ColorsType } from "theme/color"

export type TextProps = {
  text?: string
  tx?: Scope
  leftElement?: JSX.Element
  rightElement?: JSX.Element
  color?: ColorsType | "main"
  colorOverride?: string
  gap?: number | string
  ai?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline"
  font?: string
  fontWeight?: "regular" | "medium" | "bold" | "black"
} & Omit<TTextProps, "color" | "fontWeight">

const fontFamily = {
  regular: "Jost_400Regular",
  medium: "Jost_500Medium",
  bold: "Jost_700Bold",
  black: "Jost_900Black",
}

export function Text({
  text,
  tx,
  children,
  leftElement,
  color,
  colorOverride,
  gap = "$1",
  ai = "center",
  rightElement,
  fontWeight = "regular",
  font,
  flex,
  ...rest
}: TextProps) {
  const content = tx ? t(tx) : text
  const { mode, mainColor } = useTheme()
  const baseColor = mode === "dark" ? "white" : "black"
  let finalColor = color === "main" ? mainColor : color ? colors[color] : baseColor
  const ff = fontFamily[fontWeight]

  const TextElement = () => (
    <TText color={colorOverride ?? finalColor} {...rest} ai={ai} style={{ fontFamily: ff }}>
      {children !== undefined ? children : content}
    </TText>
  )

  if (leftElement || rightElement)
    return (
      <XStack ai={ai} gap={gap} flex={flex}>
        {leftElement}
        <TextElement />
        {rightElement}
      </XStack>
    )

  return <TextElement />
}

export type TitleProps = {
  icon?: (props: any) => JSX.Element
} & Omit<TextProps, "leftElement" | "rightElement" | "icon">

export function Title({ icon, ...rest }: TitleProps) {
  const { mode, mainColor } = useTheme()
  const baseColor = mode === "dark" ? "white" : "black"
  return (
    <Text
      leftElement={icon !== undefined ? icon({ size: 28, color: baseColor }) : undefined}
      font="bold"
      fontWeight="bold"
      fontSize={28}
      gap="$2"
      {...rest}
    />
  )
}
