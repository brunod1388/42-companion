import React from "react"
import { styled, XStack, YStack } from "tamagui"
import { differenceInHours, format } from "date-fns"
import { Text } from "components/Text"
import { t } from "i18n/i18n"
import { CalendarRange, Clock4, MapPin } from "@tamagui/lucide-icons"
import { colors } from "theme/color"
import { TouchableOpacity } from "react-native"
import { EventType } from "./EventDetails"
import { useTheme } from "context/themeContext"

export type EventItemProps = {
  event: EventType
  onPress: () => void
}

const colorize = (kind: string) => {
  switch (kind) {
    case "association":
      return "violet"
    default:
      return "green"
  }
}

export default function EventItem({ event, onPress }: EventItemProps) {
  const day = new Date(event.begin_at).getDate()
  const month = format(new Date(event.begin_at), "MMMM")
  const startHour = format(new Date(event.begin_at), "p")
  const duration = differenceInHours(new Date(event.end_at), new Date(event.begin_at))
  const durationString = t("events.duration", { count: duration })
  const color = colorize(event.kind)

  return (
    <TouchableOpacity onPress={onPress}>
      <XStack borderColor={colors[color]} borderWidth={1}>
        <YStack jc="center" ai="center" bg={colors[color]} h={70} w={70}>
          <Text color="white" fontWeight="medium" fontSize="$7" text={day.toString()} />
          <Text color="white" fontWeight="regular" fontSize="$4" text={month} />
        </YStack>
        <YStack overflow="hidden" p="$1.5" flex={1} gap="$1">
          <Text
            numberOfLines={2}
            overflow="hidden"
            textOverflow="ellipsis"
            fontSize="$2"
            flexGrow={1}
            textTransform="capitalize"
          >
            <Text color={color} text={event.kind} lineHeight={17} fontSize="$5" fontWeight="bold" />
            {"   "}
            {event.name}
          </Text>
          <XStack gap="$3" flex={1}>
            <Text
              color={color}
              fontWeight="medium"
              leftElement={<CalendarRange size={13} color={colors[color]} />}
              text={startHour}
            />
            <Text
              color={color}
              fontWeight="medium"
              leftElement={<Clock4 size={13} color={colors[color]} />}
              text={durationString}
            />
            <Text
              color={color}
              fontWeight="medium"
              leftElement={<MapPin size={13} color={colors[color]} />}
              text={event.location}
              textOverflow="ellipsis"
            />
          </XStack>
        </YStack>
      </XStack>
    </TouchableOpacity>
  )
}
