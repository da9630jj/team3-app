import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ex_ip } from '../external_ip';
import commonStyles from './commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; // Expo에서 제공하는 아이콘 사용

export default function WaitingInfo() {
   const { navigate } = useNavigation();
   const [waitPatie, setWaitPatie] = useState({});
   const [waitCount, setWaitCount] = useState(0); 
   const [estimatedWaitTime, setEstimatedWaitTime] = useState(0); 
   const [refreshing, setRefreshing] = useState(false);
   const [data, setData] = useState(null);

   const loadData = async () => {
      try {
         const value = await AsyncStorage.getItem('recInfo');
         if (value != null) {
            const parsedValue = JSON.parse(value);
            setData(parsedValue);
         }
      } catch (e) {
         console.error('Failed to load data:', e);
      }
   };

   const removeData = async (key) => {
      try {
      await AsyncStorage.removeItem(key);
      console.log(`${key}가 삭제되었습니다.`);
      } catch (error) {
      console.error('데이터 삭제 실패:', error);
      }
   };
   
   useEffect(() => {
      loadData();
   }, []);

   useEffect(() => {
      if (data) {
         console.log("저장된 데이터:");
         console.log(data);
         console.log(data.recNum);
         fetchWaitPatie();
      }
   }, [data]);

   const fetchWaitPatie = () => {
      // 기본 대기 정보 
      axios.get(`${ex_ip}/rec/waitPatie/${data.recNum}`, { withCredentials: true })
         .then((res) => {
            setWaitPatie(res.data);
            console.log("waitPatie: " + waitPatie)
            const partNum = res.data.staffVO.part?.partNum;

            // 대기인원 및 예상 대기 시간 정보
            if (partNum) {
               Promise.all([
                  axios.get(`${ex_ip}/rec/waitCount/${partNum}`, { withCredentials: true }),
                  axios.get(`${ex_ip}/rec/estimatedWaitTime/${partNum}`, { withCredentials: true })
               ])
               .then(([waitCountRes, estimatedWaitTimeRes]) => {
                  setWaitCount(waitCountRes.data);
                  setEstimatedWaitTime(estimatedWaitTimeRes.data);
               })
               .catch((error) => console.log("대기인원 갖고오기 실패: " + error));
            }
         })
         .catch((error) => {
            alert('대기 현황을 가져오는 중 오류가 발생했습니다.');
            alert(error);
         })
         .finally(() => setRefreshing(false));
   };

   const onRefresh = () => {
      setRefreshing(true);
      fetchWaitPatie();
   };

   // 접수 취소
   function delFirPatie() {
      Alert.alert(
         '접수를 취소하시겠습니까?',
         '',
         [
            {
               text: '취소',
               onPress: () => console.log('취소 선택'),
               style: 'cancel',
            },
            {
            text: '확인',
            onPress: () => {
               axios.delete(`${ex_ip}/rec/delRec/${data.recNum}`, { withCredentials: true })
                  .then((res) => {
                     alert('접수가 취소되었습니다.');
                     removeData('recInfo');
                     navigate('Home');
                  })
                  .catch((error) => {
                     console.log(error);
                  });
               },
            },
         ],
         { cancelable: false }
      );
      }

   return (
      <KeyboardAvoidingView style={[styles.container, commonStyles.container]}>
         <ScrollView
               contentContainerStyle={styles.scrollViewContent}
               refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
               <View style={styles.content}>
                  <Text style={commonStyles.titleText}>{waitPatie.patieVO?.patieName || '정보 없음'} 님의 대기 현황</Text>
                  <View style={[commonStyles.row, styles.sideAlign]}>
                     <Text style={styles.waitingNum}>{waitPatie.recNum || '정보 없음'}번</Text>
                     <TouchableOpacity onPress={onRefresh} style={commonStyles.row}>
                        <Text style={styles.buttonText}>새로고침</Text>
                        <MaterialIcons style={styles.button} name="refresh" size={14} color="#666" />
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
                           <View style={[commonStyles.row, styles.row]}>
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
                  </View>
               </View>
         </ScrollView>
         <View style={commonStyles.btnDiv}>
            <TouchableOpacity style={[commonStyles.btn, styles.btn]} onPress={() => delFirPatie()}>
               <Text style={commonStyles.btnText}>접수 취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[commonStyles.btn, styles.btn]} onPress={() => navigate('Home')}>
               <Text style={commonStyles.btnText}>홈으로 이동</Text>
            </TouchableOpacity>
         </View>
      </KeyboardAvoidingView>
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
   },
   buttonText: {
      marginRight: 5,
   },
   button: {
      marginTop: 3
   },
   btn: {
      marginTop: 5,
   }
});
