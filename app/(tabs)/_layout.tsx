import { Home, Settings, User } from "@tamagui/lucide-icons"
import { useAuth } from "context/authContext"
import { Redirect, Tabs, useRouter } from "expo-router"
import { Text, View, YStack } from "tamagui"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "context/themeContext"
import { colors } from "theme/color"
import { StyleSheet, TouchableOpacity } from "react-native"

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/users",
    name: "users",
    component: User,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
]

export default function TabsLayout() {
  const { session, isLoading } = useAuth()
  const { top } = useSafeAreaInsets()
  const { mode } = useTheme()
  const router = useRouter()
  const { mainColor } = useTheme()
  if (!session) {
    return <Redirect href="/login" />
  }

  if (isLoading) {
    return (
      <YStack ai="center" jc="center">
        <Text>(app) Loading...</Text>
      </YStack>
    )
  }

  return (
    <View flex={1} pt={top} bg={mode === "dark" ? colors.black : colors.white}>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            alignItems: "center",
            display: "flex",
            paddingBottom: 0,
            paddingVertical: 10,
          },
          tabBarItemStyle: {
            flex: 1,
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
                <TouchableOpacity onPress={() => router.navigate(route.path)} style={styles.button}>
                  <route.component color={mainColor} />
                </TouchableOpacity>
              ),
            }}
          />
        ))}
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
})
