import React, { useState } from "react"
import { ScrollView, Stack, View, XStack, YStack } from "tamagui"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "utils/api"
import Header from "components/Header/Header"
import { Title } from "components/Text"
import GoBack from "components/GoBack"
import Logo from "assets/svg/42_Logo.svg"
import { useTheme } from "context/themeContext"
import ToggleGroup from "components/ToggleGroup"
import Achievements from "components/user/Achievements"
import Skills from "components/user/Skills"
import Projects from "components/user/Projects"

const tabs = [
  { nameTx: "users.projects", value: "projects" },
  { nameTx: "users.achievements", value: "achievements" },
  { nameTx: "users.skills", value: "skills" },
]

export default function User() {
  const { mainColor } = useTheme()
  const [color, setColor] = useState(mainColor)
  const [tab, setTab] = useState("projects")
  const { userId } = useLocalSearchParams()
  const { data: user } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUser(userId as string),
  })
  const { mode } = useTheme()

  return (
    <YStack flex={1}>
      <XStack ai="center" gap="$3">
        <GoBack />
        <Title tx={"users.userProfile"} flexGrow={1} />
        <Stack ai="center" jc="center" pr="$2" w={44} height={44}>
          <Logo width="100%" height="100%" fill={mode === "dark" ? "white" : "black"} />
        </Stack>
      </XStack>
      <Header user={user} color={color} setColor={setColor} />
      <View pt="$3" pb="$1.5" pl="$13" pr="$2">
        <ToggleGroup color={color} selected={tab} setSelected={setTab} items={tabs} />
      </View>
      <ScrollView flex={1}>
        <Stack p="$2">
          {tab === "achievements" && <Achievements user={user} />}
          {tab === "skills" && <Skills user={user} color={color} />}
          {tab === "projects" && <Projects user={user} />}
        </Stack>
      </ScrollView>
    </YStack>
  )
}
