import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Marquee } from "@animatereactnative/marquee";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "@/services/Colors";
import { useLogto } from '@logto/rn';

const Landing = () => {
  const imageList = [
    require("../assets/images/1.jpg"),
    require("../assets/images/2.jpg"),
    require("../assets/images/3.jpg"),
    require("../assets/images/4.jpg"),
    require("../assets/images/5.jpg"),
    require("../assets/images/6.jpg"),
    require("../assets/images/c1.jpg"),
    require("../assets/images/c2.jpg"),
    require("../assets/images/c3.jpg"),
  ];
  const { signIn } = useLogto();
  return (
    <GestureHandlerRootView>
      <View>
        <Marquee
          spacing={10}
          speed={0.9}
          style={{ transform: [{ rotate: "-4deg" }], marginTop: 33 }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image source={image} key={index} style={styles.image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={0.8}
          style={{ transform: [{ rotate: "-4deg" }], marginTop: 15 }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image source={image} key={index} style={styles.image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={0.6}
          style={{ transform: [{ rotate: "-4deg" }], marginTop: 15 }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image source={image} key={index} style={styles.image} />
            ))}
          </View>
        </Marquee>
      </View>
      <View
        style={{ backgroundColor: Colors.white, height: "100%", padding: 20 }}
      >
        <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>
          CookMate | Find Create & Enjoy Delecious Recipies🤤
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 17,
            fontWeight: "600",
            color: Colors.GRAY,
          }}
        >
          Generate Recipies in seconds with the power of Ai
        </Text>
        <TouchableOpacity
          onPress={async () => {
            const redirectUri =
              __DEV__
          ? 'exp://192.168.29.254:8081'
          : 'CookMate://callback';
            await signIn(redirectUri);
          }}
          style={styles.button}
        >
          <Text style={{ textAlign: "center", color: Colors.white, fontSize: 17, fontWeight: "700" }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 140,
    borderRadius: 26,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
  },
});
