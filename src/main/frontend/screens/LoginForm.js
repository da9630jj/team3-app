import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginForm(){
   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.inputContainer}>
            <TextInput
               style={styles.input}
               onChangeText={onChange}
               value={value}
            />
            <Text>ㅇㅇㅇ</Text>
            <TextInput
               style={styles.input}
               onChangeText={onChange}
               value={value}
            />
         </View>
      </SafeAreaView>
   )
   }

   const styles = StyleSheet.create({
      container: {
         flex: 1,
         padding: 16,
         backgroundColor: '#fff',
         justifyContent: 'center'
      },
      row: {
         flexDirection: 'row',
      },
      cell: {
         borderBottomWidth: 2,
         borderColor: '#ddd',
         justifyContent: 'center',
         alignItems: 'center',
         paddingVertical: 5,
         paddingHorizontal: 10,
      },
      text: { textAlign: 'center', fontSize: 16 },
      input: {
         width: '100%',
         textAlign: 'center',
         borderColor: 'none',
         padding: 5,
         backgroundColor: '#f1f1f1',
         borderRadius: 3,
         fontSize:16,
      },
      inputContainer: {
         flexDirection: 'row',
         alignItems: 'center'
      },

      btnDiv: {
         marginTop: 20,
         alignItems: 'center',
      },
      btn: {
         backgroundColor: '#f1f1f1',
         borderRadius: 3,
         width: '100%',
         paddingVertical: 10
      },
      btnText: {
         textAlign: 'center',
         fontWeight: 'bold',
      },
   });