import { StyleSheet, View, TouchableOpacity, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
   const {navigate} = useNavigation();
   const [isRec, setIsRec] = useState(true);
   return (
      <SafeAreaView style={styles.container}>
         <TouchableOpacity style={[styles.btn, styles.btn1]} onPress={() => {navigate("RePatientForm")}} >
            <Text style={[styles.btnText, styles.btnText1]}>재방문 환자 전용</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[styles.btn, styles.btn2]} onPress={() => {navigate("NewPatientForm")}} >
            <Text style={[styles.btnText, styles.btnText1]}>초진 환자 전용</Text>
         </TouchableOpacity>
         {
            isRec ?
               <TouchableOpacity style={[styles.btn, styles.btn3]} onPress={() => {navigate("WaitingInfo")}}>
                  {/* <Text style={[styles.btnText, styles.btnText2]}>나의 대기 현황</Text> */}
                  <View style={styles.row}>
                     <View style={[styles.cell]}><Text style={[styles.cellText, styles.leftAlign]}>나의 대기 현황</Text></View>
                     <View style={[styles.cell]}><Text style={[styles.cellText, styles.rightAlign]}>→</Text></View>
                  </View>
               </TouchableOpacity>
            :
            null
         }
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
   btn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 400,
      marginVertical: 8,
      borderRadius: 3,
   },
   btn1: {
      backgroundColor: '#8198cc',
      height: 200,
   },
   btn2: {
      backgroundColor: '#a383cc',
      height: 200,
   },
   btn3: {
      backgroundColor: '#a2b979',
      height: 50,
   },
   btnText: {
      color: '#fff',
      fontWeight: 'bold',
   },
   btnText1: {
      fontSize: 30,
   },
   btnText2: {
      fontSize: 16,
   },
   row: {
      flexDirection: 'row',
      width: '100%'
   },
   cell: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
   },
   cell1: { flex: 2 },
   cell2: { flex: 1 },
   leftAlign: {
      textAlign: 'left',
   },
   rightAlign: {
      textAlign: 'right',
   },
   cellText: {
      fontSize: 16,
      width: '100%',
      color: '#fff',
      fontWeight: 800,
   },
})