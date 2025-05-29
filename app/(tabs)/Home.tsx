import { View } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'
import IntroHeader from '@/components/introHeader'
import { SignOutButton } from '@/components/SignOutButton'

const Home = () => {
  return (
    <View style={{height:'100%',backgroundColor:Colors.white}}>
     <IntroHeader />
     <SignOutButton/>
    </View>
  )
}

export default Home