import React from "react"
import { XStack, YStack } from "tamagui"
import { differenceInHours, format } from "date-fns"
import { Text } from "components/Text"
import { t } from "i18n/i18n"
import { CalendarRange, Clock4, MapPin } from "@tamagui/lucide-icons"
import { colors } from "theme/color"
import { StyleSheet, TouchableOpacity } from "react-native"
import { EventType } from "./EventDetails"

export type EventItemProps = {
  event: EventType
  onPress: () => void
}

export default function EventItem({ event, onPress }: EventItemProps) {
  const day = new Date(event.begin_at).getDate()
  const month = format(new Date(event.begin_at), "MMMM")
  const startHour = format(new Date(event.begin_at), "p")
  const duration = differenceInHours(new Date(event.end_at), new Date(event.begin_at))
  const durationString = t("events.duration", { count: duration })
  const color = "red"

  return (
    <TouchableOpacity onPress={onPress}>
      <XStack borderColor={colors[color]} borderWidth={1}>
        <YStack jc="center" ai="center" bg={colors[color]} h={68} w={68}>
          <Text style={styles.day} text={day.toString()} />
          <Text style={styles.month} text={month} />
        </YStack>
        <YStack bg="white" overflow="hidden" p="$2" flex={1} gap="$1.5">
          <Text
            numberOfLines={2}
            overflow="hidden"
            color="black"
            textOverflow="ellipsis"
            fontSize="$1"
            flexGrow={1}
          >
            <Text
              color={color}
              text={event.kind}
              lineHeight={17}
              style={styles.kind}
              fontSize="$5"
            />
            {"   "}
            {event.name}
          </Text>
          <XStack gap="$3">
            <EventInfo icon={<CalendarRange size={15} color="black" />} text={startHour} />
            <EventInfo icon={<Clock4 size={15} color="black" />} text={durationString} />
            <EventInfo icon={<MapPin size={15} color="black" />} text={event.location} />
          </XStack>
        </YStack>
      </XStack>
    </TouchableOpacity>
  )
}

const EventInfo = ({ icon, text }: { icon: JSX.Element; text: string }) => (
  <Text color="black" text={text} leftElement={icon} style={styles.eventInfo} />
)

const styles = StyleSheet.create({
  day: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 24,
  },
  month: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 12,
  },
  kind: {
    textTransform: "capitalize",
    fontFamily: "Jost_900Black",
    fontWeight: "900",
  },
  eventInfo: {
    fontSize: 10,
  },
})
