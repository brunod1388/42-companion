import axios from "axios"
import { makeRedirectUri } from "expo-auth-session"

axios.defaults.baseURL = "https://api.intra.42.fr/"

export async function get(url: string, params?: any): Promise<any> {
  return axios.get(url, { params })
}

export function post(url: string, data: any): Promise<any> {
  return axios.post(url, data)
}

export async function getToken(code: string, state: string): Promise<any | null> {
  let res

  try {
    res = await axios.post("oauth/token", {
      grant_type: "authorization_code",
      client_id: process.env.EXPO_PUBLIC_API_UID,
      client_secret: process.env.EXPO_PUBLIC_SECRET,
      code: code,
      state: state,
      redirect_uri: makeRedirectUri({
        native: "com.swiftycompanion://oauth",
      }),
    })
  } catch (e) {
    console.error("Error while getting token:", e)
    return null
  }
  axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.access_token
  return res.data.access_token
}

export const getMe = async (): Promise<any> => {
  const user = await get("/v2/me")

  return {
    ...user.data,
    avatar: user.data.image.link,
    campusId: user.data.campus[0].id,
  }
}

export const getUsers = async (campus_id: number, paramas: any): Promise<any> => {
  const users = await get(`/v2/campus/${campus_id}/users`, paramas)
  return users.data
}

export const getCoalition = async (user_id: number): Promise<any> => {
  const coalitions_data = await get(`/v2/users/${user_id}/coalitions`)
  const coalition_user_data = await get(`/v2/users/${user_id}/coalitions_users`)

  return coalitions_data.data.map((coalition: any) => {
    const scores = coalition_user_data.data.find(
      (coalition_user: any) => coalition_user.coalition_id === coalition.id
    )
    return {
      ...coalition,
      scores: { ...scores },
    }
  })
}

export const getEvents = async (user_id: number): Promise<any> => {
  const events = await get(`/v2/campus/${user_id}/events`)
  return events.data
}

export const checkToken = async (token: string) => {
  console.log("Checking token", token)
  let res
  try {
    res = await axios.get("oauth/token/info", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (e) {
    console.error("Error check token : ", e)
    return false
  }
  console.log(res.data)

  return true
}
