import { Home, User } from "@tamagui/lucide-icons"
import { useSession } from "context/authContext"
import { Redirect, Tabs, useRouter } from "expo-router"
import { Button, Text, View } from "tamagui"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/account",
    name: "account",
    component: User,
  },
]

export default function TabsLayout() {
  const { session, isLoading } = useSession()
  const { top } = useSafeAreaInsets()
  const router = useRouter()

  if (!session) {
    return <Redirect href="/login" />
  }

  if (isLoading) {
    return <Text>(app) Loading...</Text>
  }

  return (
    <View style={{ paddingTop: top, height: "100%" }}>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            alignItems: "center",
            backgroundColor: "transparent",
            borderTopColor: "transparent",
            display: "flex",
            justifyContent: "center",
            paddingBottom: 0,
            paddingVertical: 10,
          },
          tabBarItemStyle: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: "red",
          },
          tabBarShowLabel: false,
        }}
      >
        {routes.map((route) => (
          <Tabs.Screen
            key={route.path}
            name={route.name}
            options={{
              tabBarButton: () => (
                <Button
                  circular
                  icon={route.component}
                  onPress={() => router.navigate(route.path)}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </View>
  )
}
