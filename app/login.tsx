import { ImageBackground } from "react-native"
import { useSession } from "context/authContext"
import { StyleSheet } from "react-native"
import { styled, View } from "tamagui"
import { Button } from "components/Button"
import Logo from "assets/svg/42_Logo.svg"

export default function SignIn() {
  const { signIn, session } = useSession()

  console.log("session", JSON.stringify(session, null, 2))
  return (
    <BgImage source={require("assets/images/back-green.jpg")}>
      <LogoContainer>
        <Logo width="100%" height="100%" />
      </LogoContainer>
      <SButton onPress={signIn} tx="login.signIn" />
    </BgImage>
  )
}

const BgImage = styled(ImageBackground, {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})

const SButton = styled(Button, {
  alignSelf: "stretch",
  marginTop: 20,
  marginHorizontal: 40,
  marginBottom: 180,
})

const LogoContainer = styled(View, {
  width: "100%",
  height: 300,
})
