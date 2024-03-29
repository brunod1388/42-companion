import { Text } from "components/Text"
import { t } from "i18n/i18n"
import React from "react"
import { ViewStyle } from "react-native"
import { View, XStack } from "tamagui"

export type LevelBarProps = {
  level?: number
  style?: ViewStyle
  color?: string
}

export default function LevelBar({ level = 0, style = {}, color }: LevelBarProps) {
  const levelNumber = Math.trunc(level)
  const levelProgress = Math.round((level % 1) * 100)
  return (
    <XStack
      ai="center"
      jc="center"
      bg="#202626c0"
      br={5}
      h={36}
      mr={10}
      ml={50}
      position="relative"
      style={style}
    >
      <Text
        color="white"
        text={`${t("home.level")} ${levelNumber} - ${levelProgress} %`}
        zIndex={10}
      />
      <View bg={color} w={`${levelProgress}%`} h="100%" position="absolute" t={0} l={0} />
    </XStack>
  )
}
