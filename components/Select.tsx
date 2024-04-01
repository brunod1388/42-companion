import { LinearGradient } from "@tamagui/linear-gradient"
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons"
import { useTheme } from "context/themeContext"
import { Scope } from "i18n-js"
import { t } from "i18n/i18n"
import { useEffect, useMemo, useState } from "react"
import {
  Adapt,
  Sheet,
  YStack,
  Select as TSelect,
  SelectProps as TSelectProps,
  getFontSize,
  FontSizeTokens,
  XStack,
  Label,
} from "tamagui"
import { colors, ColorsType } from "theme/color"

export type SelectProps = {
  labelTx?: Scope
  label?: string
  items: { name?: string; nameTx?: Scope; value: string }[]
  placeholder?: string
  placeholderTx?: Scope
  value: string
  onValueChange: (value: string) => void
  color?: ColorsType
} & Omit<TSelectProps, "onValueChange" | "value">

export function Select({
  items,
  label = "",
  labelTx,
  placeholder = "",
  placeholderTx,
  value,
  color,
  onValueChange,
  ...props
}: SelectProps) {
  const labelValue = labelTx ? t(labelTx) : label
  const placeholderValue = placeholderTx ? t(placeholderTx) : placeholder
  const { mainColor, mode } = useTheme()
  const finalColor = color ? color : mainColor
  const bg = mode === "dark" ? colors.grey42 : "white"
  const text = mode === "dark" ? "white" : "black"
  return (
    <XStack ai="center" jc="space-between">
      <Label fontSize={18} color={text}>
        {labelValue}
      </Label>
      <TSelect value={value} onValueChange={onValueChange} disablePreventBodyScroll {...props}>
        <TSelect.Trigger
          width={220}
          iconAfter={<ChevronDown color={finalColor} />}
          bg={bg}
          br={0}
          borderColor={finalColor}
        >
          <TSelect.Value placeholder={placeholderValue} color={finalColor} />
        </TSelect.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            native={!!props.native}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: "spring",
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <TSelect.Content zIndex={200000}>
          <TSelect.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={["$background", "transparent"]}
              borderRadius="$4"
            />
          </TSelect.ScrollUpButton>

          <TSelect.Viewport
            // to do animations:
            // animation="quick"
            // animateOnly={['transform', 'opacity']}
            // enterStyle={{ o: 0, y: -10 }}
            // exitStyle={{ o: 0, y: 10 }}
            minWidth={200}
          >
            <TSelect.Group>
              <TSelect.Label bg={mainColor}>{labelValue}</TSelect.Label>
              {/* for longer lists memoizing these is useful */}
              {useMemo(
                () =>
                  items.map((item, i) => {
                    const itemLabel = item.nameTx ? t(item.nameTx) : item.name
                    return (
                      <TSelect.Item index={i} key={itemLabel} value={item.value}>
                        <TSelect.ItemText>{itemLabel}</TSelect.ItemText>
                        <TSelect.ItemIndicator marginLeft="auto">
                          <Check size={16} />
                        </TSelect.ItemIndicator>
                      </TSelect.Item>
                    )
                  }),
                [items]
              )}
            </TSelect.Group>
            {/* Native gets an extra icon */}
            {props.native && (
              <YStack
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width={"$4"}
                pointerEvents="none"
              >
                <ChevronDown size={getFontSize((props.size as FontSizeTokens) ?? "$true")} />
              </YStack>
            )}
          </TSelect.Viewport>

          <TSelect.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={["transparent", "$background"]}
              borderRadius="$4"
            />
          </TSelect.ScrollDownButton>
        </TSelect.Content>
      </TSelect>
    </XStack>
  )
}
