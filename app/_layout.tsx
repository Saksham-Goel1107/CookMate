import { userContext } from "@/context/userContext";
import { LogtoConfig, LogtoProvider, UserScope } from "@logto/rn";
import { Stack } from "expo-router";
import { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [User, setUser] = useState()
  const config: LogtoConfig = {
    endpoint: "https://08c3k8.logto.app/",
    appId: "uvkdhvj7wlaup26ekgrea",
    scopes: [UserScope.Email],
  };
  return (
    <LogtoProvider config={config}>
      <userContext.Provider value={{User, setUser}}>
        <SafeAreaProvider>
          <StatusBar hidden={true} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </SafeAreaProvider>
      </userContext.Provider>
    </LogtoProvider>
  );
}
