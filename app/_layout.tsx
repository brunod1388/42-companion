import { Slot, SplashScreen } from "expo-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import { SessionProvider } from "../context/authContext"
import { ThemeProvider } from "context/themeContext"

import "../tamagui-web.css"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

const queryCLient = new QueryClient()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  })

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryCLient}>
        <SessionProvider>
          <Slot initialRouteName="login" />
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
