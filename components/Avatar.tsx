import React from "react"
import { Avatar as TAvatar, ViewProps } from "tamagui"
import { colors } from "theme/color"

export type AvatarProps = {
  image: string
  color?: string
  size?: "sm" | "md" | "lg"
} & ViewProps

const sizes = {
  sm: "$6",
  md: "$8",
  lg: "$10",
}
export default function Avatar({ image, color, size = "md", ...rest }: AvatarProps) {
  return (
    <TAvatar circular size={sizes[size]} position="absolute" b={-10} l={20} zi={1000} {...rest}>
      <TAvatar.Image src={image} />
      <TAvatar.Fallback bg={color ?? colors.green} />
    </TAvatar>
  )
}
