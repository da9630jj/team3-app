import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginForm(){
   return (
      <SafeAreaView style={styles.container}>
         <Text>LoginForm</Text>
      </SafeAreaView>
   )
   }

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
   },
})