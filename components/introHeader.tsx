import { userContext } from "@/context/userContext";
import { Image } from "expo-image";
import React, { useContext } from "react";
import { Text, View } from "react-native";

const IntroHeader = () => {  const { User } = useContext(userContext);
  return (
    <View>
      <View style={{flexDirection:'row',alignItems:'center',gap:8}}>
        <Image
          source={{ uri: User?.picture }}
          style={{ width: 45, height: 45, borderRadius: 99 }}
        />
        <Text style={{ fontSize: 20 }}>Hello, {User?.name}</Text>
      </View>
    </View>
  );
};

export default IntroHeader;
