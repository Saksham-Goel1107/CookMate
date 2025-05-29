import React from "react";
import { Tabs } from "expo-router";
import { Image } from "expo-image";

const _layout = () => {
  return (
    <Tabs screenOptions={{headerShown:false}}>
      <Tabs.Screen name="Home" options={{tabBarIcon:({ size,focused }) => (
        <Image source={require('@/assets/images/i1.png')} style={{width: size, height: size,opacity:focused?1:0.4}} />
      )}}/>
      <Tabs.Screen name="Explore" options={{tabBarIcon:({ size,focused }) => (
        <Image source={require('@/assets/images/i2.png')} style={{width: size, height: size,opacity:focused?1:0.4}} />
      )}}/>
      <Tabs.Screen name="CookBook" options={{tabBarIcon:({ size,focused }) => (
        <Image source={require('@/assets/images/i3.png')} style={{width: size, height: size,opacity:focused?1:0.4}} />
      )}}/>
      <Tabs.Screen name="Profile" options={{tabBarIcon:({ size,focused }) => (
        <Image source={require('@/assets/images/i4.png')} style={{width: size, height: size,opacity:focused?1:0.4}} />
      )}}/>
    </Tabs>
  );
};

export default _layout;
