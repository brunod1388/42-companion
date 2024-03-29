import { ImageBackground } from "react-native"
import { useAuth } from "context/authContext"
import { styled, View } from "tamagui"
import { Button } from "components/Button"
import Logo from "assets/svg/42_Logo.svg"

export default function Login() {
  const { signIn } = useAuth()

  return (
    <BgImage source={require("assets/images/back-green.jpg")}>
      <LogoContainer>
        <Logo width="100%" height="100%" />
      </LogoContainer>
      <Button onPress={signIn} tx="login.signIn" />
    </BgImage>
  )
}

const BgImage = styled(ImageBackground, {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})

const LogoContainer = styled(View, {
  width: "100%",
  height: 300,
})
