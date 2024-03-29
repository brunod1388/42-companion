import { t } from "i18n/i18n"
import { Scope } from "i18n-js"
import { TouchableOpacity } from "react-native"
import { forwardRef } from "react"
import { colors, ColorsType } from "theme/color"
import { Text } from "./Text"
import { useTheme } from "context/themeContext"
import { Stack } from "tamagui"

export type ButtonProps = {
  text?: string
  tx?: Scope
  variant?: "plain" | "outline"
  onPress?: () => void
  color?: ColorsType
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  fontFamily?: string
  circular?: boolean
}

export const Button = forwardRef(
  (
    {
      tx,
      text = "",
      color,
      variant = "plain",
      leftIcon,
      rightIcon,
      fontFamily = "Jost_500Medium",
      onPress,
    }: ButtonProps,
    ref
  ) => {
    const { mainColor } = useTheme()
    const finalColor = color ? colors[color] : mainColor
    const colorType = color ? color : "main"
    const content = tx ? t(tx) : text
    const isPlain = variant === "plain"
    const style = {
      backgroundColor: isPlain ? finalColor : "white",
      borderColor: finalColor,
      borderWidth: isPlain ? 0 : 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      fontFamily,
    }

    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <Stack ai="center" jc="center">
          <Text
            leftElement={leftIcon}
            rightElement={rightIcon}
            color={isPlain ? "white" : colorType}
          >
            {content}
          </Text>
        </Stack>
      </TouchableOpacity>
    )
  }
)
