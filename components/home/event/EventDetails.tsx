import { CalendarRange, Clock4, MapPin, UsersRound } from "@tamagui/lucide-icons"
import { Text } from "components/Text"
import { differenceInHours, format } from "date-fns"
import { t } from "i18n/i18n"
import React from "react"
import { ScrollView, XStack, YStack } from "tamagui"
import { colors, ColorsType } from "theme/color"
import { Button } from "components/Button"
import { useTheme } from "context/themeContext"

export type EventType = {
  description: string
  kind: string
  begin_at: string
  end_at: string
  id: number
  name: string
  max_people: number
  location: string
  nbr_subscribers: number
}

export type EventDetailsProps = {
  event?: EventType
  close: () => void
}

export default function EventDetails({ event, close }: EventDetailsProps) {
  if (!event) {
    return <Text>Is Loading</Text>
  }
  const startHour = format(new Date(event.begin_at), "p")
  const duration = differenceInHours(new Date(event.end_at), new Date(event.begin_at))
  const durationString = t("events.duration", { count: duration })
  const { mode } = useTheme()
  const isDark = mode === "dark"
  const color = "red"
  if (!event) {
    return <Text>No event selected</Text>
  }
  return (
    <YStack flex={1}>
      <YStack bg={colors[color]} ai="center" jc="center" p="$2">
        <Text text={event.kind} color="grey" textTransform="uppercase" />
        <Text
          text={event.name}
          color="white"
          my="$3"
          textTransform="uppercase"
          fontFamily="Jost_400Regular"
        />
        <Text
          text={format(new Date(event.begin_at), "MMMM dd, yyyy 'at' HH:mm")}
          fontSize={10}
          color="white"
        />
      </YStack>
      <XStack jc="space-evenly" bg={colors[(color + "100") as ColorsType]} flexWrap="wrap">
        <Text
          leftElement={<CalendarRange scale={0.6} color="white" />}
          text={startHour}
          fontSize={10}
          color="white"
        />
        <Text
          leftElement={<Clock4 scale={0.6} color="white" />}
          text={durationString}
          fontSize={10}
          color="white"
        />
        <Text
          leftElement={<MapPin scale={0.6} color="white" />}
          text={event.location}
          fontSize={10}
          color="white"
        />
        <Text
          leftElement={<UsersRound scale={0.6} color="white" />}
          text={event.nbr_subscribers + " / " + event.max_people}
          fontSize={10}
          color="white"
        />
      </XStack>
      <ScrollView bg={isDark ? colors.black : colors.white} p="$2" flexGrow={1}>
        <Text
          color={isDark ? "white" : "black"}
          text={event.description}
          fontFamily="Jost_400Regular"
        />
      </ScrollView>
      <XStack
        bg={isDark ? colors.black : colors.white}
        jc="flex-end"
        borderColor={colors.lightGrey}
        borderTopWidth={1}
        p="$2"
        gap="$2"
      >
        <Button tx="general.close" onPress={close} variant="outline" />
        <Button tx="events.subscribe" />
      </XStack>
    </YStack>
  )
}
