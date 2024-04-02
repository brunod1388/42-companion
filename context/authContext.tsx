import { createContext, useContext, useEffect, useState } from "react"
import { useStorageState } from "../hooks/useStorageState"
import { makeRedirectUri, ResponseType, useAuthRequest } from "expo-auth-session"
import * as WebBrowser from "expo-web-browser"
import * as SecureStore from "expo-secure-store"
import { getMe, getToken } from "utils/api"
import { useRouter } from "expo-router"
import { useQuery } from "@tanstack/react-query"

WebBrowser.maybeCompleteAuthSession()

const discovery = {
  authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
}

export type AuhContextType = {
  signIn: () => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
  me: any
}

const AuthContext = createContext<AuhContextType>({} as AuhContextType)

export function useAuth() {
  const value = useContext(AuthContext)
  //TODO: correct this
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be wrapped in a <SessionProvider />")
    }
  }

  return value
}

export function SessionProvider(props: React.PropsWithChildren) {
  const API_UID = process.env.EXPO_PUBLIC_API_UID
  const router = useRouter()
  const [[isSessionLoading, session], setSession] = useStorageState("session")
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

  const {
    isPending,
    isLoading: isUserLoading,
    isError,
    data: me,
    error,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => (session ? getMe() : null),
    enabled: !!session,
  })

  const signIn = async () => {
    // let token = await SecureStore.getItemAsync("session_token")
    // if (token && (await checkToken(token))) {
    //   router.replace("/home")
    //   return
    // }
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
    router.replace("/login")
  }

  useEffect(() => {
    if (!isSessionLoading && session !== null) userRefetch()
  }, [session, isSessionLoading])
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading: isSessionLoading || isCodeLoading,
        me,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
