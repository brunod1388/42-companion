import { createContext, useContext } from "react"
import { useStorageState } from "../hooks/useStorageState"
import { makeRedirectUri, ResponseType, useAuthRequest } from "expo-auth-session"
import * as WebBrowser from "expo-web-browser"
import * as SecureStore from "expo-secure-store"
import { getToken } from "utils/api"
import { useRouter } from "expo-router"

WebBrowser.maybeCompleteAuthSession()

const discovery = {
  authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
}

export type AuhContextType = {
  signIn: () => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}

const AuthContext = createContext<AuhContextType>({} as AuhContextType)

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext)
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />")
    }
  }

  return value
}

export function SessionProvider(props: React.PropsWithChildren) {
  const API_UID = process.env.EXPO_PUBLIC_API_UID
  const SECRET = process.env.EXPO_PUBLIC_SECRET
  const router = useRouter()

  const [[isLoading, session], setSession] = useStorageState("session")
  const [[isCodeLoading, code], setCode] = useStorageState("code")
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: API_UID ?? "",
      scopes: ["public"],
      redirectUri: makeRedirectUri({
        native: "com.swiftycompanion://oauth",
      }),
    },
    discovery
  )

  const signIn = async () => {
    console.log("sessionState", session)
    console.log("sessionState.code", code)
    console.log("API_UID", API_UID)
    console.log("request", JSON.stringify(request, null, 2))
    console.log("response", JSON.stringify(response, null, 2))
    const res = await promptAsync()
    if (res.type !== "success") return
    const sessionState = res.params
    setSession(sessionState.state)
    setCode(sessionState.code)
    const token = await getToken(sessionState.code, sessionState.state)
    if (!token) return
    SecureStore.setItemAsync("session_token", token)
    router.replace("/home")
  }

  const signOut = async () => {
    setSession(null)
    setCode(null)
    SecureStore.deleteItemAsync("session_token")
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading: isLoading || isCodeLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
