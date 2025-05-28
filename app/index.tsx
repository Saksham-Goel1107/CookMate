import { userContext } from "@/context/userContext";
import GlobalApi from "@/services/GlobalApi";
import { useLogto } from "@logto/rn";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const debug = process.env.DEBUG;
  const { getIdTokenClaims, isAuthenticated } = useLogto();
  const { setUser } = useContext(userContext);
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then(async (UserData) => {
        if (UserData?.email) {
          const existingUser = await GlobalApi.GetUserByEmail(UserData?.email);
          if (debug) {
            console.log(existingUser.data.data);
          }
          if (!(existingUser.data.data.length > 0)) {
            const data = {
              email: UserData?.email,
              name: UserData?.name,
              picture: UserData?.picture,
            };
            const resp = await GlobalApi.CreateNewUser(data);
            if (debug) {
              console.log(resp.data.data);
            }
            setUser(resp.data.data);
            router.replace("/Landing");
          } else {
            setUser(existingUser.data.data[0]);
            router.replace("/Landing");
          }
        }
      });
    }
  }, [isAuthenticated, getIdTokenClaims, debug, setUser,router]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    </View>
  );
}
