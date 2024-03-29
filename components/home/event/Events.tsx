import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getEvents } from "utils/api"
import { ScrollView, YStack } from "tamagui"
import EventItem from "./EventItem"
import { Text } from "components/Text"
import Dialog from "components/Dialog"
import EventDetails, { EventType } from "./EventDetails"
import { useAuth } from "context/authContext"

export default function Events() {
  const { me } = useAuth()
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(me?.campusId),
  })
  const [open, setOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventType>()

  if (isLoading) {
    return <Text>Loading...</Text>
  }
  if (isError) {
    return <Text>Error: could not fetch events {JSON.stringify(error, null, 2)}</Text>
  }

  //sort to take out the past events
  const events = data
    .filter((e: any) => new Date(e.begin_at) > new Date())
    .sort((a: any, b: any) => new Date(a.begin_at).getTime() - new Date(b.begin_at).getTime())

  const handlePress = (event: EventType) => {
    setSelectedEvent(event)
    setOpen(!open)
  }

  return (
    <>
      <YStack p="$2" gap="$3">
        <ScrollView>
          <YStack gap="$2">
            {events.map((event: any) => (
              <EventItem event={event} key={event.id} onPress={() => handlePress(event)} />
            ))}
          </YStack>
        </ScrollView>
      </YStack>
      <Dialog open={open} close={() => setOpen(false)}>
        <EventDetails event={selectedEvent} close={() => setOpen(false)} />
      </Dialog>
    </>
  )
}
