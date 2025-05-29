import { userContext } from "@/context/userContext";
import { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [User, setUser] = useState();

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <userContext.Provider value={{ User, setUser }}>
        <SafeAreaProvider>
          <StatusBar hidden={true} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="terms" />
            <Stack.Screen name="privacy" />
            <Stack.Screen name="consent" />
          </Stack>
        </SafeAreaProvider>
      </userContext.Provider>
    </ClerkProvider>
  );
}
