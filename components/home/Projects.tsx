import { ScrollView, View, XStack, YStack } from "tamagui"
import { Text } from "components/Text"
import { ProjectUsers } from "types/User"
import { useAuth } from "context/authContext"

export default function Projects() {
  const { me } = useAuth()
  const projects = me?.projects_users

  return (
    <View p="$2" flex={1}>
      <ScrollView flex={1}>
        <YStack p="$2" gap="$4">
          {projects === undefined && <Text text="Loading..." />}
          {projects !== undefined &&
            projects.map((p: ProjectUsers) => {
              const color = p.status === "finished" ? "green" : "red"
              return (
                <XStack key={p.id}>
                  <Text
                    fontFamily="Jost_500Medium"
                    text={p.project.name}
                    flexGrow={1}
                    textTransform="capitalize"
                    fontSize="$5"
                  />
                  {p.marked && (
                    <Text
                      fontFamily="Jost_900Black"
                      fontSize="$5"
                      color={color}
                      text={p.final_mark?.toString()}
                    />
                  )}
                </XStack>
              )
            })}
        </YStack>
      </ScrollView>
    </View>
  )
}
