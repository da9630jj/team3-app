import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './Home';
import { ex_ip } from '../external_ip';
import commonStyles from './commonStyles';

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
      axios.get(`${ex_ip}/rec/waitPatie/${patieNum}`, { withCredentials: true })
      .then((res) => {
         console.log(res.data);
         setWaitPatie(res.data);
         const partNum = res.data.staffVO.part?.partNum;

         // 대기인원 정보
         if (partNum) {
            axios.get(`${ex_ip}/rec/waitCount/${partNum}`, { withCredentials: true })
            .then((res) => {
               console.log(res.data);
               setWaitCount(res.data);
            })
            .catch((error) => { console.log(error); });

            // 예상 대기 시간 정보
            axios.get(`${ex_ip}/rec/estimatedWaitTime/${partNum}`, { withCredentials: true })
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
            axios.delete(`${ex_ip}/patie/delFirPatie/${patieNum}`, {withCredentials:true})
               .then((res) => {
                  alert('접수가 취소되었습니다.');
                  navigate('Home');
               })
               .catch((error) => { console.log(error); });
      } 
   }

   return (
      <SafeAreaView style={[styles.container, commonStyles.container]}>
         <ScrollView
               contentContainerStyle={styles.scrollViewContent}
               refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
         >
               <View style={styles.content}>
                  <Text style={commonStyles.titleText}>{waitPatie.patieVO?.patieName || '정보 없음'} 님의 대기 현황</Text>
                  <View style={[commonStyles.row, styles.sideAlign]}>
                     <Text style={styles.waitingNum}>{waitPatie.recNum || '정보 없음'}번</Text>
                     <TouchableOpacity onPress={onRefresh}>
                           <Text>새로고침</Text>
                     </TouchableOpacity>
                  </View>
                  <View>
                     <View style={styles.table}>
                           {/* 첫 번째 행 */}
                           <View style={commonStyles.row}>
                              <View style={[styles.cell, styles.cell1]}>
                                 <Text style={[styles.cellText, commonStyles.leftAlign]}>진료과</Text>
                              </View>
                              <View style={[styles.cell, styles.cell2]}>
                                 <Text style={[styles.cellText, commonStyles.rightAlign]}>
                                       {waitPatie.staffVO?.part?.partName || '정보 없음'}
                                 </Text>
                              </View>
                           </View>

                           {/* 두 번째 행 */}
                           <View style={commonStyles.row}>
                              <View style={[styles.cell, styles.cell1]}>
                                 <Text style={[styles.cellText, commonStyles.leftAlign]}>대기인원</Text>
                              </View>
                              <View style={[styles.cell, styles.cell2]}>
                                 <Text style={[styles.cellText, commonStyles.rightAlign]}>
                                       {waitCount || '정보 없음'}명
                                 </Text>
                              </View>
                           </View>

                           {/* 세 번째 행 */}
                           <View style={commonStyles.row}>
                              <View style={[styles.cell, styles.cell1]}>
                                 <Text style={[styles.cellText, commonStyles.leftAlign]}>예상 대기 시간</Text>
                              </View>
                              <View style={[styles.cell, styles.cell2]}>
                                 <Text style={[styles.cellText, commonStyles.rightAlign]}>
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
         <View style={commonStyles.btnDiv}>
            <TouchableOpacity style={commonStyles.btn} onPress={() => delFirPatie()}>
               <Text style={commonStyles.btnText}>접수 취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.btn} onPress={() => delFirPatie()}>
               <Text style={commonStyles.btnText}>홈으로 이동</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      alignContent: 'center',
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
   noDiv: {
      
   },
   noText: {
      paddingVertical: 5,
   }
});
