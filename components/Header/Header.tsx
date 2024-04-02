import React, { useEffect, useState } from "react"
import { XStack, YStack } from "tamagui"
import { ImageBackground, StyleSheet } from "react-native"
import Avatar from "components/Avatar"
import Coalition from "components/Header/Coalition"
import LevelBar from "components/LevelBar"
import { Text } from "components/Text"
import { useTheme } from "context/themeContext"
import { useQuery } from "@tanstack/react-query"
import { getCoalition } from "utils/api"
import { Scope } from "i18n-js"
import { ChevronDown } from "@tamagui/lucide-icons"
import { DropDown } from "components/DropDown"
import { colors } from "theme/color"

export type HeaderProps = {
  user: any
  color: string
  setColor: (color: string) => void
}

export default function Header({ user, color, setColor }: HeaderProps) {
  const { mode } = useTheme()
  const [cursusIndex, setCursusIndex] = useState(0)
  const [coalition, setCoalition] = useState<any>(null)
  const [showCursus, setShowCursus] = useState<boolean>(false)

  const { data: coalitions, isLoading: colationsLoading } = useQuery({
    queryKey: [`coalition`],
    queryFn: () => getCoalition(user.id),
    enabled: !!user,
  })

  useEffect(() => {
    if (colationsLoading) return
    selectCursus(user ? user.cursus_users.length - 1 : 0)
  }, [colationsLoading, user])

  const selectCursus = (index: number) => {
    setCursusIndex(index)
    const cursusSlug = user?.cursus_users[index].cursus.slug
    const coalition = coalitions?.find((c: any) => c.slug.includes(cursusSlug))
    if (coalition === undefined) return
    setCoalition(coalition)
    setColor(coalition.color)
  }
  const bgSrc = coalition ? { uri: coalition.cover_url } : require("assets/images/back-green.jpg")
  const loginTitle =
    user?.titles?.length > 0 ? user?.titles[0].name.replace("%login", user?.login) : user?.login

  return (
    <ImageBackground source={bgSrc} style={styles.image}>
      <XStack flexGrow={1}>
        <YStack p={10} flexGrow={1} flex={1} gap="$1.5">
          <Text
            color="white"
            fontWeight="bold"
            fontSize="$7"
            numberOfLines={1}
            text={user?.displayname}
            textOverflow="ellipsis"
          />
          <Text fontWeight="regular" fontSize="$5" text={loginTitle} color="white" />
          <YStack bg="#202626c0" p="$3" borderRadius="$2" jc="space-between" flexGrow={1}>
            <Line color={color} label="home.wallet" value={user?.wallet + " ₳"} />
            <Line color={color} label="home.evalPoints" value={user?.correction_point} />
            <Line
              color={color}
              label="home.cursus"
              value={user?.cursus_users[cursusIndex].cursus?.name}
              onPress={() => setShowCursus(true)}
              rightElement={<ChevronDown size={15} color="white" />}
            >
              {showCursus ? (
                <DropDown
                  labels={user?.cursus_users.map((c: any) => c.cursus.name)}
                  index={cursusIndex}
                  setIndex={selectCursus}
                  close={() => setShowCursus(false)}
                />
              ) : undefined}
            </Line>
            <Line color={color} label="home.grade" value={user?.cursus_users[cursusIndex].grade} />
          </YStack>
          <XStack gap={20}></XStack>
        </YStack>
        <Coalition coalition={coalition ? coalition : undefined} />
      </XStack>
      <LevelBar
        level={user?.cursus_users[cursusIndex].level}
        color={color}
        style={{ marginBottom: 8 }}
        br={5}
        h={36}
        mr={10}
        ml={50}
      />
      <Avatar
        image={user?.avatar}
        position="absolute"
        b={-40}
        l={10}
        borderWidth={3}
        borderColor={mode === "dark" ? colors.grey42 : "white"}
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
  color: string
}
function Line({ label, value, onPress, rightElement, color, children }: LineProps) {
  return (
    <XStack flexDirection="row" jc="space-between" position="relative">
      <Text colorOverride={color} tx={label} />
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
