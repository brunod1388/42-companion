import React from "react"
import { FontAwesome5 } from "@expo/vector-icons"
import Flag from "components/Header/Flag"
import { Stack, styled, Text as TText } from "tamagui"

export default function Coalition({ coalition }: { coalition?: any }) {
  return (
    <Stack ai="center" flexShrink={0}>
      <Flag coalition={coalition} mb={20} />
      <Row>
        <Stack jc="center" ai="center" w={30}>
          <FontAwesome5 name="angle-double-down" size={22} color="white" />
        </Stack>
        <Score>{coalition?.scores?.rank}</Score>
      </Row>
      <Row>
        <Stack jc="center" bc="blue" ai="center" w={30}>
          <FontAwesome5 name="trophy" size={15} color="white" />
        </Stack>
        <Score>{coalition?.scores?.score}</Score>
      </Row>
    </Stack>
  )
}

const Row = styled(Stack, {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
  paddingHorizontal: 20,
})

const Score = styled(TText, {
  color: "white",
  fontSize: 16,
  flexGrow: 1,
  textAlign: "right",
})
