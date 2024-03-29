import { Users2 } from "@tamagui/lucide-icons"
import { useQuery } from "@tanstack/react-query"
import { Input } from "components/Input"
import { Title } from "components/Text"
import { useState } from "react"
import { ScrollView, YStack } from "tamagui"
import { getUsers } from "utils/api"

export default function Users() {
  const [search, setSearch] = useState<string>("")

  const { data: users } = useQuery({ queryKey: ["users"], queryFn: () => getUsers })
  return (
    <YStack flex={1} p="$2">
      <Title icon={(props) => <Users2 {...props} />} tx="users.users" />
      <Input placeholder="Search" value={search} onChangeText={(t) => setSearch(t)} />
      <ScrollView flex={1}></ScrollView>
    </YStack>
  )
}
