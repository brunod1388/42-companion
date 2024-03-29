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
  gap?: number | string
  ai?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline"
  font?: string
} & Omit<TTextProps, "color">

export function Text({
  text,
  tx,
  children,
  leftElement,
  color,
  gap = "$1",
  ai = "center",
  rightElement,
  font,
  ...rest
}: TextProps) {
  const content = tx ? t(tx) : text
  const { mode, mainColor } = useTheme()
  const baseColor = mode === "dark" ? "white" : "black"
  let finalColor = color === "main" ? mainColor : color ? colors[color] : baseColor

  const TextElement = () => (
    <TText color={finalColor} {...rest} ai={ai}>
      {children !== undefined ? children : content}
    </TText>
  )

  if (leftElement || rightElement)
    return (
      <XStack ai={ai} gap={gap}>
        {leftElement}
        <TextElement />
        {rightElement}
      </XStack>
    )

  return <TextElement />
}

export type TitleProps = {
  icon: (props: any) => JSX.Element
} & Omit<TextProps, "leftElement" | "rightElement" | "icon">

export function Title({ icon, ...rest }: TitleProps) {
  const { mode, mainColor } = useTheme()
  const baseColor = mode === "dark" ? "white" : "black"
  return (
    <Text
      leftElement={icon({ size: 28, color: baseColor })}
      font="bold"
      fontFamily="Jost_700Bold"
      fontSize={28}
      gap="$2"
      {...rest}
    />
  )
}
