import React from "react"
import { ChevronLeft } from "@tamagui/lucide-icons"
import { useRouter } from "expo-router"
import { Button } from "./Button"

export default function GoBack() {
  const expo = useRouter()
  return <Button leftIcon={<ChevronLeft />} onPress={() => expo.back()} />
}
