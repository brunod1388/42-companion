import { createContext, useContext, useState } from "react"
import { TamaguiProvider } from "tamagui"
import { config } from "../tamagui.config"

export type ThemeContextType = {
  theme: string
  setTheme: (theme: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export function useTheme() {
  return useContext(ThemeContext)
}

export type ThemeProviderProps = {
  defaultTheme?: string
}
export function ThemeProvider({
  defaultTheme,
  children,
}: React.PropsWithChildren<ThemeProviderProps>) {
  const [theme, setTheme] = useState<string>(defaultTheme ?? "dark")

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <TamaguiProvider config={config} defaultTheme={"dark"}>
        {children}
      </TamaguiProvider>
    </ThemeContext.Provider>
  )
}
