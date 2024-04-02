import { Search, Users2 } from "@tamagui/lucide-icons"
import Avatar from "components/Avatar"
import { Input } from "components/Input"
import { Text, Title } from "components/Text"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { ScrollView, XStack, YStack } from "tamagui"
import { searchUsers } from "utils/api"

export default function Users() {
  const [search, setSearch] = useState<string>("")
  const [users, setUsers] = useState<any>(null)
  const expo = useRouter()

  useEffect(() => {
    searchUsers(47, search.toLocaleLowerCase()).then((res) => {
      setUsers(res)
    })
  }, [search])

  return (
    <YStack flex={1} p="$2" gap="$2">
      <Title icon={(props: any) => <Users2 {...props} />} tx="users.users" />
      <Input
        placeholder="Search"
        value={search}
        onChangeText={(t: string) => setSearch(t)}
        icon={(props: any) => <Search {...props} />}
      />
      <ScrollView flex={1}>
        <YStack gap="$2">
          {search !== "" &&
            users?.map((user: any) => (
              <XStack
                key={user.id}
                gap="$2"
                ai="center"
                onPress={() => expo.navigate(`/users/${user.id}`)}
              >
                <Avatar size="sm" image={user.image.link} />
                <YStack flex={1}>
                  <Text
                    fontSize={18}
                    fontWeight="bold"
                    numberOfLines={1}
                    textOverflow="ellipsis"
                    text={user.displayname}
                  />
                  <Text color="main" fontSize={16} fontWeight="bold" text={user.login} />
                </YStack>
              </XStack>
            ))}
          {search === "" && <Text tx="users.noUsersFound" />}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
