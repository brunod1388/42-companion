import { Slot, SplashScreen } from "expo-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import { SessionProvider } from "../context/authContext"
import { ThemeProvider } from "context/themeContext"
import { ClickOutsideProvider } from "react-native-click-outside"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

const queryCLient = new QueryClient()

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("assets/fonts/Inter-Medium.otf"),
    InterBold: require("assets/fonts/Inter-Bold.otf"),
    Jost_400Regular: require("assets/fonts/Jost/Jost-Regular.ttf"),
    Jost_500Medium: require("assets/fonts/Jost/Jost-Medium.ttf"),
    Jost_700Bold: require("assets/fonts/Jost/Jost-Bold.ttf"),
    Jost_900Black: require("assets/fonts/Jost/Jost-Black.ttf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return (
    <ClickOutsideProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryCLient}>
          <SessionProvider>
            <Slot />
          </SessionProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ClickOutsideProvider>
  )
}
