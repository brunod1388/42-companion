import { Text } from "components/Text"
import { t } from "i18n/i18n"
import React from "react"
import { ViewStyle } from "react-native"
import { StackProps, View, XStack } from "tamagui"
import { colors } from "theme/color"

export type LevelBarProps = {
  level?: number
  color?: string
} & Omit<StackProps, "color">

export default function LevelBar({ level = 0, br = 5, h = 36, color, ...rest }: LevelBarProps) {
  const levelNumber = Math.trunc(level)
  const levelProgress = Math.round((level % 1) * 100)
  return (
    <XStack ai="center" jc="center" bg="#202626c0" br={br} h={h} position="relative" {...rest}>
      <Text
        fontWeight="medium"
        color="white"
        text={`${t("home.level")} ${levelNumber} - ${levelProgress} %`}
        zIndex={10}
      />
      <View
        bg={color ?? colors.green}
        w={`${levelProgress}%`}
        h="100%"
        position="absolute"
        t={0}
        l={0}
        br={br}
      />
    </XStack>
  )
}
