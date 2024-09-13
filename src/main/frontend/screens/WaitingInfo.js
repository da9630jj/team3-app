import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WaitingInfo() {
   const route = useRoute();
   const { navigate } = useNavigation();

   const { patieNum } = route.params; 

   if (patieNum === undefined) {
      return (
         <SafeAreaView style={styles.container}>
            <Text style={styles.errorText}>환자 번호가 누락되었습니다</Text>
         </SafeAreaView>
      );
   }

   const [waitPatie, setWaitPatie] = useState({});
   const [waitCount, setWaitCount] = useState(0); 
   const [estimatedWaitTime, setEstimatedWaitTime] = useState(0); 
   const [refreshing, setRefreshing] = useState(false);

   useEffect(() => {
      fetchWaitPatie();
   }, [patieNum]);

   const fetchWaitPatie = () => {
      // 기본 대기 정보
      axios.get(`http://localhost:8085/rec/waitPatie/${patieNum}`, { withCredentials: true })
      .then((res) => {
         console.log(res.data);
         setWaitPatie(res.data);
         const partNum = res.data.staffVO.part?.partNum;

         // 대기인원 정보
         if (partNum) {
            axios.get(`http://localhost:8085/rec/waitCount/${partNum}`, { withCredentials: true })
            .then((res) => {
               console.log(res.data);
               setWaitCount(res.data);
            })
            .catch((error) => { console.log(error); });

            // 예상 대기 시간 정보
            axios.get(`http://localhost:8085/rec/estimatedWaitTime/${partNum}`, { withCredentials: true })
            .then((res) => {
               console.log(res.data);
               setEstimatedWaitTime(res.data);
            })
            .catch((error) => { console.log(error); });
         }
         setRefreshing(false);
      })
      .catch((error) => {
         alert('대기 현황을 가져오는 중 오류가 발생했습니다.');
         setRefreshing(false);
      });
   };

   const onRefresh = () => {
      setRefreshing(true);
      fetchWaitPatie();
   };

   // 접수 취소
   function delFirPatie() {
      if (window.confirm('접수를 취소하시겠습니까?')) {
            axios.delete(`http://localhost:8085/patie/delFirPatie/${patieNum}`, { withCredentials: true })
               .then((res) => {
                  alert('접수가 취소되었습니다.');
                  navigate('Home');
               })
               .catch((error) => { console.log(error); });
      } 
   }

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView
               contentContainerStyle={styles.scrollViewContent}
               refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
         >
               <View style={styles.content}>
                  <Text style={styles.titleText}>{waitPatie.patieVO?.patieName || '정보 없음'} 님의 대기 현황</Text>
                  <View style={[styles.row, styles.sideAlign]}>
                     <Text style={styles.waitingNum}>{waitPatie.recNum || '정보 없음'}번</Text>
                     <TouchableOpacity onPress={onRefresh}>
                           <Text>새로고침</Text>
                     </TouchableOpacity>
                  </View>
                  <View>
                     <View style={styles.table}>
                           {/* 첫 번째 행 */}
                           <View style={styles.row}>
                              <View style={[styles.cell, styles.cell1]}>
                                 <Text style={[styles.cellText, styles.leftAlign]}>진료과</Text>
                              </View>
                              <View style={[styles.cell, styles.cell2]}>
                                 <Text style={[styles.cellText, styles.rightAlign]}>
                                       {waitPatie.staffVO?.part?.partName || '정보 없음'}
                                 </Text>
                              </View>
                           </View>

                           {/* 두 번째 행 */}
                           <View style={styles.row}>
                              <View style={[styles.cell, styles.cell1]}>
                                 <Text style={[styles.cellText, styles.leftAlign]}>대기인원</Text>
                              </View>
                              <View style={[styles.cell, styles.cell2]}>
                                 <Text style={[styles.cellText, styles.rightAlign]}>
                                       {waitCount || '정보 없음'}명
                                 </Text>
                              </View>
                           </View>

                           {/* 세 번째 행 */}
                           <View style={styles.row}>
                              <View style={[styles.cell, styles.cell1]}>
                                 <Text style={[styles.cellText, styles.leftAlign]}>예상 대기 시간</Text>
                              </View>
                              <View style={[styles.cell, styles.cell2]}>
                                 <Text style={[styles.cellText, styles.rightAlign]}>
                                       {estimatedWaitTime || '정보 없음'}분
                                 </Text>
                              </View>
                           </View>
                     </View>
                  </View>
                  <View style={styles.noDiv}>
                     <Text style={styles.noText}>먼가 더 쓸 게 생기겠지요...</Text>
                     <Text style={styles.noText}>먼가 더 쓸 게 생기겠지요...</Text>
                     <Text style={styles.noText}>먼가 더 쓸 게 생기겠지요...</Text>
                  </View>
               </View>
         </ScrollView>
         <View style={styles.btnDiv}>
               <TouchableOpacity style={styles.btn} onPress={() => delFirPatie()}>
                  <Text style={styles.btnText}>접수 취소</Text>
               </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
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
