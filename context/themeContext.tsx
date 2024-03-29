import { createContext, useContext, useState } from "react"
import { TamaguiProvider } from "tamagui"
import { tamaguiConfig } from "../tamagui.config"
import { DarkTheme, DefaultTheme, ThemeProvider as RNThemeProvider } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { colors } from "theme/color"

export type ThemeContextType = {
  mainColor: string
  setMainColor: (color: string) => void
  mode: "dark" | "light"
  setMode: (mode: "dark" | "light") => void
  toggleMode: () => void
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const [mode, setMode] = useState<"dark" | "light">("dark")
  const [mainColor, setMainColor] = useState<string>(colors.green)

  const toggleMode = () => setMode((prev) => (prev === "dark" ? "light" : "dark"))

  return (
    <ThemeContext.Provider value={{ mainColor, setMainColor, mode, setMode, toggleMode }}>
      <TamaguiProvider config={tamaguiConfig}>
        <RNThemeProvider value={mode === "dark" ? DarkTheme : DefaultTheme}>
          <StatusBar style={mode === "dark" ? "light" : "dark"} />
          {children}
        </RNThemeProvider>
      </TamaguiProvider>
    </ThemeContext.Provider>
  )
}
