import Switch from "components/Switch"
import { useTheme } from "context/themeContext"
import { XStack, YStack } from "tamagui"
import { Select } from "components/Select"
import { i18n, t } from "i18n/i18n"
import { useState } from "react"
import { colors, ColorsType } from "theme/color"
import { Text } from "components/Text"
import { LogOut, Settings as Sets } from "@tamagui/lucide-icons"
import { Button } from "components/Button"
import { useAuth } from "context/authContext"

const languages = [
  { nameTx: "language.english", value: "en" },
  { nameTx: "language.french", value: "fr" },
]

const colorsItems = Object.keys(colors).map((key) => {
  return {
    name: key,
    value: colors[key as ColorsType],
  }
})

export default function Settings() {
  const { mode, toggleMode, mainColor, setMainColor } = useTheme()
  const [locale, setLocale] = useState(i18n.locale)
  const handleChange = (value: string) => {
    setLocale(value)
    i18n.locale = value
  }
  const { signOut } = useAuth()

  return (
    <YStack p="$2" flex={1}>
      <XStack ai="center" gap="$3" mb="$5">
        <Sets size={30} color={mode === "dark" ? "white" : "black"} />
        <Text fontSize={24} tx="settings.settings" />
      </XStack>
      <YStack gap="$6" flexGrow={1}>
        <Select
          labelTx="language.language"
          items={languages}
          value={locale}
          onValueChange={handleChange}
        />
        <Select label="Color" items={colorsItems} value={mainColor} onValueChange={setMainColor} />
        <Switch labelTx="settings.darkMode" checked={mode === "dark"} onChange={toggleMode} />
      </YStack>
      <Button
        tx="login.signOut"
        rightIcon={<LogOut scale={0.8} ml={5} />}
        color="red"
        onPress={signOut}
      />
    </YStack>
  )
}
