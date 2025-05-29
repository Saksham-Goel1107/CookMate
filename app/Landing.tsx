import Colors from "@/services/Colors";
import { Marquee } from "@animatereactnative/marquee";
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
  const { isSignedIn } = useAuth();
  const router = useRouter();

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
          onPress={() => {
            if (!isSignedIn) {
              router.push('/sign-in');
            }
            if (isSignedIn) {
              router.push('/(tabs)/Home');
            }
          }}
          style={styles.button}
        >
          <Text style={{ textAlign: "center", color: Colors.white, fontSize: 17, fontWeight: "700" }}>
            {isSignedIn ? "Let's Cook!" : "Get Started"}
          </Text>
        </TouchableOpacity>
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 12, color: Colors.GRAY, textAlign: "center" }}>
          By continuing, you agree to our{" "}
          <Text
            style={{ color: Colors.primary, textDecorationLine: "underline" }}
            onPress={() => router.push('/terms')}
          >
            Terms of Service
          </Text>
          {", "}
          <Text
            style={{ color: Colors.primary, textDecorationLine: "underline" }}
            onPress={() => router.push('/privacy')}
          >
            Privacy Policy
          </Text>
          {" and "}
          <Text
            style={{ color: Colors.primary, textDecorationLine: "underline" }}
            onPress={() => router.push('/consent')}
          >
            Consent
          </Text>
          .
        </Text>
      </View>
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
