import React, { useState } from "react"
import { ScrollView, Stack, View } from "tamagui"
import { Redirect } from "expo-router"
import { useAuth } from "context/authContext"
import Header from "components/Header/Header"
import Events from "components/home/event/Events"
import ToggleGroup from "components/ToggleGroup"
import Eval from "components/home/Eval"
import Projects from "components/user/Projects"
import { useTheme } from "context/themeContext"

const tabs = [
  { nameTx: "events.agenda", value: "agenda" },
  { nameTx: "eval.evalShort", value: "evals" },
  { nameTx: "projects.projects", value: "project" },
]

export default function Home() {
  const { session } = useAuth()
  const [tab, setTab] = useState("agenda")
  const { me } = useAuth()
  const { mainColor, setMainColor } = useTheme()

  if (!session) {
    return <Redirect href="/login" />
  }

  return (
    <Stack flex={1}>
      <Header user={me} color={mainColor} setColor={setMainColor} />
      <View pt="$3" pb="$1.5" pl="$13" pr="$2">
        <ToggleGroup selected={tab} setSelected={setTab} items={tabs} />
      </View>
      <ScrollView flex={1}>
        <View p="$2" flex={1}>
          {tab === "agenda" && <Events />}
          {tab === "evals" && <Eval />}
          {tab === "project" && <Projects />}
        </View>
      </ScrollView>
    </Stack>
  )
}
