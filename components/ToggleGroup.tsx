import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Stack, View } from "tamagui"
import { colors, ColorsType } from "theme/color"
import { Text } from "./Text"
import { Scope } from "i18n-js"
import { useTheme } from "context/themeContext"

export type ToggleGroupProps = {
  items: { nameTx?: Scope; value: string; icon?: JSX.Element }[]
  selected: string
  setSelected: (value: string) => void
  direction?: "row" | "column"
  color?: ColorsType
}

export default function ToggleGroup({
  items,
  selected,
  setSelected,
  direction = "row",
  color,
}: ToggleGroupProps) {
  const { mainColor } = useTheme()
  const finalColor = color ? colors[color] : mainColor
  const colorType = color ? color : "main"
  return (
    <Stack flexDirection={direction} borderWidth={1} borderColor={finalColor} h="$2">
      {items.map((item, index) => (
        <Stack key={item.value} flexDirection={direction} flex={1} ai="stretch">
          {index !== 0 && (
            <View bg={finalColor} {...(direction === "row" ? { width: 1 } : { height: 1 })} />
          )}
          <TouchableOpacity
            onPress={() => setSelected(item.value)}
            key={index}
            style={styles.container}
          >
            <View
              bg={item.value === selected ? finalColor : "transparent"}
              flex={1}
              ai="center"
              jc="center"
            >
              <Text
                color={item.value === selected ? "white" : colorType}
                tx={item.nameTx}
                leftElement={item.icon}
                textAlign="center"
                fontFamily={item.value === selected ? "Jost_700Bold" : "Jost_400Regular"}
              />
            </View>
          </TouchableOpacity>
        </Stack>
      ))}
    </Stack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "stretch",
  },
})
