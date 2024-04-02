import React from "react"
import { XStack, YStack } from "tamagui"
import { SvgUri } from "react-native-svg"
import { Text } from "components/Text"

export default function Achievements({ user }: { user?: any }) {
  const achievements = user?.achievements
  return (
    <YStack gap="$3" flex={1}>
      {achievements?.map((achievement: any) => (
        <XStack key={achievement.id} ai="center" gap="$3">
          <YStack flex={1} alignSelf="stretch" p="$1">
            <Text fontSize="$4" fontWeight="bold" text={achievement.name} />
            <Text numberOfLines={2}>{achievement.description}</Text>
          </YStack>
          <SvgUri
            width={60}
            height={60}
            uri={(achievement.image as string).replace("/uploads", "https://cdn.intra.42.fr")}
          />
        </XStack>
      ))}
    </YStack>
  )
}
