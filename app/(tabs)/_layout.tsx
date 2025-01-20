/** @format */

import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name='post-feed' options={{ headerShown: false }} />
    </Stack>
  );
}
