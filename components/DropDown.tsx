import { TouchableOpacity } from "react-native"
import { Stack } from "tamagui"
import { Text } from "./Text"
import { colors } from "theme/color"

export type DropdownProps = {
  labels: string[]
  index: number
  setIndex: (index: number) => void
  close: () => void
}

export function DropDown({ labels, index, setIndex, close }: DropdownProps) {
  return (
    <Stack position="absolute" bg={colors.grey42dark} br={4} p="$2" gap="$3" zIndex={1000} r={0}>
      {labels.map((label, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setIndex(i)
              close()
            }}
          >
            <Text text={label} p="$1" />
          </TouchableOpacity>
        )
      })}
    </Stack>
  )
}
