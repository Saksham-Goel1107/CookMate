import { userContext } from "@/context/userContext";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [User, setUser] = useState();

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <userContext.Provider value={{ User, setUser }}>
        <SafeAreaProvider>
          <StatusBar hidden={true} />
          <Slot />
        </SafeAreaProvider>
      </userContext.Provider>
    </ClerkProvider>
  );
}
