import { AlarmClock } from "@tamagui/lucide-icons"
import { Link, router, Stack, usePathname } from "expo-router"
import { StyleSheet } from "react-native"
import { Stack as TStack, View, Text, Button } from "tamagui"

export default function NotFoundScreen() {
  const path = usePathname()
  console.log("error: ", path)
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <TStack jc="center" ai="center" h="100%">
        <View margin={10}>
          <Text>This screen doesn't exist.</Text>
          <Text>path: {path}</Text>
          <Link href="/" style={styles.link}>
            <Text style={styles.linkText}>Go to home screen!</Text>
          </Link>
          <Link href="/login">
            <Button circular icon={AlarmClock} onPress={() => router.navigate("/login")}></Button>
          </Link>
        </View>
      </TStack>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
})
