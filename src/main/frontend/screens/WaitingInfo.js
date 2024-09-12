import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function WaitingInfo() {
   const {navigate} = useNavigation();
   const route = useRoute();
   // const {patieNum, recNum} = route.params;

   const [waitPatie, setWaitPatie] = useState({});

   // useEffect(()=>{
   //    axios.get(`/`)
   // })


   return (
      <SafeAreaView style={styles.container}>
         <View>
            <Text style={styles.titleText}>홍길동 님의 대기 현황</Text>
            <View style={[styles.row, styles.sideAlign]}>
               <Text style={styles.waitingNum}>001번</Text>
               <Text>새로고침</Text>
            </View>
         </View>
         <View>
            <View style={styles.table}>
               {/* 첫 번째 행 */}
               <View style={styles.row}>
                  <View style={[styles.cell, styles.cell1]}><Text style={[styles.cellText, styles.leftAlign]}>진료과</Text></View>
                  <View style={[styles.cell, styles.cell2]}><Text style={[styles.cellText, styles.rightAlign]}>XX과</Text></View>
               </View>
               
               {/* 두 번째 행 */}
               <View style={styles.row}>
                  <View style={[styles.cell, styles.cell1]}><Text style={[styles.cellText, styles.leftAlign]}>대기인원</Text></View>
                  <View style={[styles.cell, styles.cell2]}><Text style={[styles.cellText, styles.rightAlign]}>00번째</Text></View>
               </View>
               
               {/* 세 번째 행 */}
               <View style={styles.row}>
                  <View style={[styles.cell, styles.cell1]}><Text style={[styles.cellText, styles.leftAlign]}>예상 대기 시간</Text></View>
                  <View style={[styles.cell, styles.cell2]}><Text style={[styles.cellText, styles.rightAlign]}>0시간 00분</Text></View>
               </View>
            </View>
         </View>
         <View style={styles.noDiv}>
            <Text style={styles.noText}>먼가 더 쓸 게 생기겠지요...</Text>
            <Text style={styles.noText}>먼가 더 쓸 게 생기겠지요...</Text>
            <Text style={styles.noText}>먼가 더 쓸 게 생기겠지요...</Text>
         </View>
         <View style={[styles.btnDiv, styles.bottomDiv]}>
            <TouchableOpacity style={styles.btn} onPress={() => {
               /* 난중엔 등록 함수가 올 듯… */
               navigate("Home")
               }} >
               <Text style={styles.btnText}>접수 취소</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignContent: 'center',
   },
   titleText: {
      fontWeight: 'bold',
   },
   waitingNum: {
      fontWeight: 'bold',
      fontSize: 50,
      marginLeft: 10
   },
   sideAlign: {
      justifyContent: 'space-between'
   },
   table: {
      width: '100%',
      marginVertical: 20,
      backgroundColor: '#f1f1f1',
      borderRadius: 3,
   },
   row: {
      flexDirection: 'row',
   },
   cell: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
   },
   cell1: { flex: 1 },
   cell2: { flex: 2 },
   cellText: {
      fontSize: 16,
      width: '100%',
   },
   leftAlign: {
      textAlign: 'left',
   },
   rightAlign: {
      textAlign: 'right',
   },
   btnDiv: {
      marginTop: 20,
      alignItems: 'center',
   },
   btn: {
      fontWeight: 800,
      backgroundColor: '#f1f1f1',
      borderRadius: 3,
      width: '100%',
      paddingVertical: 10
   },
   btnText: {
      textAlign: 'center',
      fontWeight: 'bold',
   },
   bottomDiv: {
      marginTop: 'auto'
   },
   noDiv: {
      
   },
   noText: {
      paddingVertical: 5,
   }
});