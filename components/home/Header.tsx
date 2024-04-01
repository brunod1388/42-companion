import React, { useEffect, useState } from "react"
import { XStack, YStack } from "tamagui"
import { ImageBackground, StyleSheet } from "react-native"
import Avatar from "components/Avatar"
import Coalition from "components/home/Coalition"
import LevelBar from "components/home/LevelBar"
import { Text } from "components/Text"
import { useTheme } from "context/themeContext"
import { useQuery } from "@tanstack/react-query"
import { getCoalition } from "utils/api"
import { Scope } from "i18n-js"
import { ChevronDown } from "@tamagui/lucide-icons"
import { DropDown } from "components/DropDown"
import { useAuth } from "context/authContext"

export default function Header() {
  const { me } = useAuth()
  const { mainColor, mode, setMainColor } = useTheme()
  const [cursusIndex, setCursusIndex] = useState(0)
  const [coalition, setCoalition] = useState<any>(null)
  const [showCursus, setShowCursus] = useState<boolean>(false)
  const { data: coalitions, isLoading: colationsLoading } = useQuery({
    queryKey: ["myColation"],
    queryFn: () => getCoalition(me?.id),
  })

  useEffect(() => {
    if (colationsLoading) return
    selectCursus(me ? me.cursus_users.length - 1 : 0)
  }, [colationsLoading, me])

  const selectCursus = (index: number) => {
    setCursusIndex(index)
    const cursusSlug = me?.cursus_users[index].cursus.slug
    const coalition = coalitions?.find((c: any) => c.slug.includes(cursusSlug))
    if (coalition === undefined) return
    setCoalition(coalition)
    setMainColor(coalition.color)
  }

  const bgSrc = coalition ? { uri: coalition.cover_url } : require("assets/images/back-green.jpg")
  const loginTitle =
    me?.titles?.length > 0 ? me?.titles[0].name.replace("%login", me?.login) : me?.login

  return (
    <ImageBackground source={bgSrc} style={styles.image}>
      <XStack flexGrow={1}>
        <YStack p={10} flexGrow={1} flex={1} gap="$1.5">
          <Text
            color="white"
            fontWeight="bold"
            fontSize="$7"
            numberOfLines={1}
            text={me?.displayname}
            textOverflow="ellipsis"
          />
          <Text fontWeight="regular" fontSize="$5" text={loginTitle} color="white" />
          <YStack bg="#202626c0" p="$3" borderRadius="$2" jc="space-between" flexGrow={1}>
            <Line label="home.wallet" value={me?.wallet + " ₳"} />
            <Line label="home.evalPoints" value={me?.correction_point} />
            <Line
              label="home.cursus"
              value={me?.cursus_users[cursusIndex].cursus?.name}
              onPress={() => setShowCursus(true)}
              rightElement={<ChevronDown size={15} color="white" />}
            >
              {showCursus ? (
                <DropDown
                  labels={me?.cursus_users.map((c: any) => c.cursus.name)}
                  index={cursusIndex}
                  setIndex={selectCursus}
                  close={() => setShowCursus(false)}
                />
              ) : undefined}
            </Line>
            <Line label="home.grade" value={me?.cursus_users[cursusIndex].grade} />
          </YStack>
          <XStack gap={20}></XStack>
        </YStack>
        <Coalition coalition={coalition ?? undefined} />
      </XStack>
      <LevelBar
        level={me?.cursus_users[cursusIndex].level}
        color={mainColor}
        style={{ marginBottom: 8 }}
      />
      <Avatar
        image={me?.avatar}
        position="absolute"
        b={-40}
        l={10}
        borderWidth={3}
        borderColor={mode === "dark" ? "black" : "white"}
        zi={1000}
      />
    </ImageBackground>
  )
}

type LineProps = {
  label: Scope
  value: string
  onPress?: () => void
  rightElement?: JSX.Element
  children?: JSX.Element
}
function Line({ label, value, onPress, rightElement, children }: LineProps) {
  return (
    <XStack flexDirection="row" jc="space-between" position="relative">
      <Text color="main" tx={label} />
      <Text color="white" text={value} rightElement={rightElement} onPress={onPress} />
      {children}
    </XStack>
  )
}

const styles = StyleSheet.create({
  image: {
    overflow: "visible",
    position: "relative",
    height: "100%",
    maxHeight: 240,
    display: "flex",
    flexDirection: "column",
  },
})
