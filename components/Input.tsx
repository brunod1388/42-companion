import { useTheme } from "context/themeContext"
import { Input as TInput, InputProps as TInputProps, View } from "tamagui"

export type InputProps = {
  icon?: (props: any) => JSX.Element
} & TInputProps

export function Input({ icon, ...rest }: any) {
  const { mainColor, mode } = useTheme()
  const baseColor = mode === "dark" ? "white" : "black"
  return (
    <View position="relative">
      <TInput
        {...rest}
        color={baseColor}
        br={0}
        ai="center"
        jc="space-between"
        bg="transparent"
        bc={mainColor}
      />
      {icon !== undefined &&
        icon({ color: mainColor, size: 20, style: { position: "absolute", right: 10, top: 10 } })}
    </View>
  )
}
