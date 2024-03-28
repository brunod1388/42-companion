import React from "react"
import { ButtonProps as TButtonProps, styled, Button as TButton } from "tamagui"
import { t } from "i18n/i18n"
import { Scope } from "i18n-js"

export type ButtonProps = TButtonProps & {
  text?: string
  tx?: Scope
}
export function Button({ tx, text, children, ...rest }: ButtonProps) {
  const content = tx ? t(tx) : text

  return <StyledButton {...rest}>{children !== undefined ? children : content}</StyledButton>
}

const StyledButton = styled(TButton, {
  color: "$green10",
  backgroundColor: "$gray3",
  borderRadius: 8,
  padding: 10,
  paddingHorizontal: 20,
  margin: 4,
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
  variants: {
    outlined: {
      true: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "$green10",
      },
    },
  },
})
