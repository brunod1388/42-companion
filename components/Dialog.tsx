import { Modal, Touchable, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import React from "react"
import { Stack } from "tamagui"
import { useClickOutside } from "react-native-click-outside"

export type DialogProps = {
  open: boolean
  close: () => void
  children: React.ReactNode
}

export default function Dialog({ open, close, children }: DialogProps) {
  const ref = useClickOutside(close)
  return (
    <Modal visible={open} animationType="fade" transparent={true}>
      <Stack
        jc="center"
        ai="center"
        h="100%"
        backgroundColor={"#ffffff80"}
        shadowColor="black"
        shadowRadius={10}
        shadowOpacity={0.6}
        shadowOffset={{ width: 0, height: 5 }}
      >
        <Stack ref={ref} maxHeight="70%" maxWidth="95%" flex={1}>
          {children}
        </Stack>
      </Stack>
    </Modal>
  )
}
