import React, { useState } from "react"
import { Stack, View } from "tamagui"
import { Redirect } from "expo-router"
import { useAuth } from "context/authContext"
import Header from "components/home/Header"
import Events from "components/home/event/Events"
import ToggleGroup from "components/ToggleGroup"
import Eval from "components/home/Eval"
import Projects from "components/home/Projects"

const tabs = [
  { nameTx: "events.agenda", value: "agenda" },
  { nameTx: "eval.evalShort", value: "evals" },
  { nameTx: "projects.projects", value: "project" },
]
export default function Home() {
  const { session } = useAuth()
  const [tab, setTab] = useState("agenda")

  if (!session) {
    return <Redirect href="/login" />
  }

  return (
    <Stack flex={1}>
      <Header />
      <View pt="$3" pb="$1.5" pl="$13" pr="$2">
        <ToggleGroup selected={tab} setSelected={setTab} items={tabs} />
      </View>
      <Stack flexGrow={1}>
        {tab === "agenda" && <Events />}
        {tab === "evals" && <Eval />}
        {tab === "project" && <Projects />}
      </Stack>
    </Stack>
  )
}
