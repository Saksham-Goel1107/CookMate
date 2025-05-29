import { userContext } from "@/context/userContext";
import Colors from "@/services/Colors";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { setUser } = useContext(userContext);
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (isSignedIn && user) {
          // Format user data to match your app's needs
          const userData = {
            name: user.primaryEmailAddress?.emailAddress?.split('@')[0],
            picture: user.imageUrl || 'https://ui-avatars.com/api/?name=' + (user.firstName || 'User'),
            email: user.primaryEmailAddress?.emailAddress,
            id: user.id
          };
          setUser(userData);
          router.replace("/(tabs)/Home");
        } else {
          router.replace("/Landing");
        }
      } catch (error) {
        console.error("Navigation error:", error);
        router.replace("/Landing");
      }
    };

    const timer = setTimeout(() => {
      initializeApp();
    }, 100);

    return () => clearTimeout(timer);
  }, [isSignedIn, user, setUser, router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff'
      }}
    >
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}
