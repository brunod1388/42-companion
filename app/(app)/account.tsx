import { View, Text } from 'react-native';
import React from 'react';
import { ScrollView, useTheme } from 'tamagui';

export default function Account() {
  const theme = useTheme()
  return (
    <View>
      <ScrollView>

      <Text>account page</Text>
      <Text>theme: {JSON.stringify(theme, null, 2)}</Text>
      </ScrollView>
    </View>
  );
}
