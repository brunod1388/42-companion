import LevelBar from "components/LevelBar"
import { Text } from "components/Text"
import React from "react"
import { YStack } from "tamagui"

export type SkillsProps = {
  user?: any

  color: string
}
export default function Skills({ user, color }: SkillsProps) {
  const userCursus = user?.cursus_users
  const skills = userCursus?.map((cursus: any) => cursus.skills).flat()

  return (
    <YStack gap="$2">
      {skills?.map((skill: any) => (
        <YStack key={skill.id}>
          <Text fontWeight="bold" fontSize={16} text={skill.name} />
          <LevelBar color={color} level={skill.level as number} h={20} />
        </YStack>
      ))}
    </YStack>
  )
}
