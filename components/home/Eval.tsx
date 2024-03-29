import { ScrollView, View, YStack } from "tamagui"
import { Text } from "components/Text"
import { ProjectUsers } from "types/User"
import { useAuth } from "context/authContext"

export default function Eval() {
  const { me } = useAuth()
  const projects = me?.projects_users.filter((p: any) => p.status === "waiting_for_correction")
  return (
    <YStack p="$2" gap="$3">
      <ScrollView>
        <YStack gap="$3">
          {projects === undefined && <Text text="Loading..." />}
          {projects !== undefined &&
            projects.map((p: ProjectUsers) => (
              <View key={p.id}>
                <Text>{p.project.name}</Text>
              </View>
            ))}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
