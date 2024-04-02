import { XStack, YStack } from "tamagui"
import { Text } from "components/Text"
import { ProjectUsers } from "types/User"
import { useAuth } from "context/authContext"

export default function Projects({ user }: { user?: any }) {
  const { me } = useAuth()
  const projects = (user ?? me)?.projects_users

  return (
    <YStack gap="$4" flex={1}>
      {projects === undefined && <Text text="Loading..." />}
      {projects !== undefined &&
        projects.map((p: ProjectUsers) => {
          const color = p.status === "finished" ? "green" : "red"
          return (
            <XStack key={p.id}>
              <Text
                fontWeight="medium"
                text={p.project.name}
                flexGrow={1}
                textTransform="capitalize"
                fontSize="$5"
              />
              {p.marked && (
                <Text
                  fontWeight="black"
                  fontSize="$5"
                  color={color}
                  text={p.final_mark?.toString()}
                />
              )}
            </XStack>
          )
        })}
    </YStack>
  )
}
