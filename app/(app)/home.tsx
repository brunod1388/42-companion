import React, { useEffect } from "react"
import { Stack, styled, Text } from "tamagui"
import { get } from "utils/api"
import { useQuery } from "@tanstack/react-query"
import { ImageBackground } from "react-native"

export default function Home() {
  const getUser = async (): Promise<any> => {
    const user = await get("/v2/me")
    // console.log("user", user)
    return user
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["me"],
    queryFn: getUser,
  })

  const User = () => {
    if (isPending) {
      return <Text>Loading...</Text>
    }
    if (isError) {
      return <Text>{JSON.stringify(error, null, 2)}</Text>
    }
    return <Text>{JSON.stringify(data, null, 2)}</Text>
  }

  // useEffect(() => {
  //   if (data) console.log("data", JSON.stringify(data, null, 2))
  // }, [])

  return (
    <Stack bg="#f005" flex={1}>
      <Stack flex={1}>
        <Banner source={require("assets/images/back-green.jpg")}>
          <Text color="white">Home</Text>
        </Banner>
      </Stack>
      <Stack bg="$blue2" flex={2}></Stack>
    </Stack>
  )
}

const Banner = styled(ImageBackground, {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})
