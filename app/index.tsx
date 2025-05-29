import { userContext } from "@/context/userContext";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { setUser } = useContext(userContext);
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      setUser(user);
      router.replace("/(tabs)/Home");
    }
  }, [isSignedIn, user, setUser, router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Redirect href="/Landing" />
    </View>
  );
}
