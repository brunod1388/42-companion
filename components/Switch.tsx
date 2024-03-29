import { Label, XStack, SizeTokens } from "tamagui"
import { t } from "i18n/i18n"
import { Scope } from "i18n-js"
import { useTheme } from "context/themeContext"
import { Switch as RNSwitch } from "react-native"
export type SwitchProps = {
  labelTx?: Scope
  label?: string
  checked: boolean
  onChange: (value: boolean) => void
  size?: SizeTokens
}

export default function Switch({ label, labelTx, checked, onChange, size = "$5" }: SwitchProps) {
  const id = `switch-${size.toString().slice(1)}-${checked ?? ""}}`
  const labelValue = labelTx ? t(labelTx) : label
  const { mode, mainColor } = useTheme()

  return (
    <XStack ai="center" h="auto">
      <Label
        color={mode === "dark" ? "white" : "black"}
        htmlFor={id}
        fontSize={18}
        flexGrow={1}
        minHeight={40}
      >
        {labelValue}
      </Label>
      <RNSwitch
        value={checked}
        onValueChange={onChange}
        trackColor={{ true: mainColor }}
        thumbColor={mode === "dark" ? "white" : "black"}
      />
    </XStack>
  )
}
