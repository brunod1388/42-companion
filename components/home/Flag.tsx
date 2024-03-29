import React from "react"
import Banner from "assets/svg/flag.svg"
import { Stack, StackProps } from "tamagui"
import { Coalition } from "types/Coalition"
import { SvgUri } from "react-native-svg"

export type BannerProps = {
  coalition: Coalition
  size?: number
  ratio?: number
} & Omit<StackProps, "size">

export default function Flag({ size = 100, ratio = 0.65, coalition, ...rest }: BannerProps) {
  return (
    <Stack {...rest} w={size} h={size}>
      <Banner fill={coalition?.color} />
      <Stack
        bc="blue"
        jc="center"
        ai="center"
        position="absolute"
        w={size * ratio}
        h={size * ratio}
        l={(size * (1 - ratio)) / 2}
        t={(size * (1 - ratio)) / 3}
      >
        <SvgUri width="90%" height="90%" fill="white" uri={coalition?.image_url} />
      </Stack>
    </Stack>
  )
}
