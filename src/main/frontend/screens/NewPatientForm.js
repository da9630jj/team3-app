
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ex_ip } from '../external_ip';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewPatientForm() {
   const { navigate } = useNavigation();
   const [parts, setParts] = useState([]);
   const [staffs, setStaffs] = useState([]);

   // 환자 정보 값 저장
   const [formDataPatie, setFormDataPatie] = useState({
      patieName: '',
      patieBirth: ['', ''],
      patieTel: ['', '', ''],
      patieAddr: ['', '']
   });

   // 사전 문진 값 저장
   const [formDataRec, setFormDataRec] = useState({
      recDetail: '',
      partNum: '',
      staffNum: '',
   });
   
   // 환자 정보 테이블 내용
   const tableDataPatie = [
      {
         label: '이름',
         component: (value, onChange) => (
         <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
         />
         )
      },
      {
         label: '주민번호',
         component: (value, onChange) => (
         <View style={styles.inputContainer}>
            <TextInput
               style={[styles.input, styles.inputSmall]}
               onChangeText={(text) => onChange(text, 0)}
               value={value[0]}
            />
            <Text style={styles.dash}>-</Text>
            <TextInput
               style={[styles.input, styles.inputSmall]}
               onChangeText={(text) => onChange(text, 1)}
               value={value[1]}
            />
         </View>
         )
      },
      {
         label: '연락처',
         component: (value, onChange) => (
         <View style={styles.inputContainer}>
            <TextInput
               style={[styles.input, styles.inputSmall]}
               onChangeText={(text) => onChange(text, 0)}
               value={value[0]}
            />
            <Text style={styles.dash}>-</Text>
            <TextInput
               style={[styles.input, styles.inputSmall]}
               onChangeText={(text) => onChange(text, 1)}
               value={value[1]}
            />
            <Text style={styles.dash}>-</Text>
            <TextInput
               style={[styles.input, styles.inputSmall]}
               onChangeText={(text) => onChange(text, 2)}
               value={value[2]}
            />
         </View>
         )
      },
      {
         label: '주소',
         component: (value, onChange) => (
         <View style={styles.inputContainer}>
            <TextInput
               style={[styles.input, styles.inputSmall]}
               onChangeText={(text) => onChange(text, 0)}
               value={value[0]}
            />
            <TextInput
               style={styles.input}
               placeholder='상세주소 입력'
               onChangeText={(text) => onChange(text, 1)}
               value={value[1]}
            />
         </View>
         )
      }
   ];

   // 사전 문진 테이블 내용
   const tableDataRec = [
      {
         label: '증상',
         component: (value, onChange) => (
         <TextInput
            style={[styles.input, styles.textArea]}
            onChangeText={onChange}
            value={value}
            multiline
         />
         )
      },
      {
         label: '진료부서',
         component: (value, onChange) => (
         <RNPickerSelect
            placeholder={{ label: '진료부서 선택', value: '' }}
            value={value}
            onValueChange={onChange}
            items={parts}
            style={pickerStyles}
         />
         )
      },
      {
         label: '담당의',
         component: (value, onChange) => (
         <RNPickerSelect
            placeholder={{ label: '담당의 선택', value: '' }}
            value={value}
            onValueChange={onChange}
            items={staffs}
            style={pickerStyles}
         />
         )
      }
   ];

   // 진료부서 조회
   useEffect(() => {
      axios.get(`${ex_ip}/rec/getPart`, {withCredentials: true})
         .then((res) => {
            setParts(res.data.map(part => ({ label: part.partName, value: part.partNum })));
         })
         .catch((error) => {
            alert(error);
         });
      }, []);


   // 담당의 조회 
   useEffect(() => {
      if (formDataRec.partNum) {
         axios.get(`${ex_ip}/rec/selectStaffName/${formDataRec.partNum}`, {withCredentials: true})
         .then((res) => {
            setStaffs(res.data.map(staff => ({ label: staff.staffName, value: staff.staffNum })));
         })
         .catch((error) => {
            alert(error);
         });
      }
   }, [formDataRec.partNum]);

   // 환자 정보 onChange 함수
   const patieInputChange = (field, value, index) => {
      setFormDataPatie(prevState => ({
         ...prevState,
         [field]: index !== undefined
         ? prevState[field].map((item, idx) => idx === index ? value : item)
         : value
      }));
   };

   // 사전 문진 onChange 함수
   const recInputChange = (field, value) => {
      setFormDataRec(prevState => ({
         ...prevState,
         [field]: value
      }));
   };

   return (
      <SafeAreaView style={styles.container}>
         <Text style={styles.titleText}>환자 정보</Text>
         {tableDataPatie.map((item, index) => (
         <View key={index} style={styles.row}>
            <View style={[styles.cell, styles.cell1]}>
               <Text style={styles.text}>{item.label}</Text>
            </View>
            <View style={[styles.cell, styles.cell2]}>
               {item.component(
               formDataPatie[Object.keys(formDataPatie)[index]],
               (value, i) => patieInputChange(Object.keys(formDataPatie)[index], value, i)
               )}
            </View>
         </View>
         ))}
         <View style={[styles.btnDiv, styles.btnSmallDiv]}>
            <TouchableOpacity
               style={[styles.btn, styles.btnSmall]}
               onPress={() => {
                  // 환자 등록 함수
               }} >
               <Text  Text style={styles.btnText}>등록</Text>
            </TouchableOpacity>
         </View>
         <Text style={[styles.titleText, styles.titleTextNext]}>사전 문진</Text>
         {tableDataRec.map((item, index) => (
         <View key={index} style={styles.row}>
            <View style={[styles.cell, styles.cell1]}>
               <Text style={styles.text}>{item.label}</Text>
            </View>
            <View style={[styles.cell, styles.cell2]}>
               {item.component(
               formDataRec[Object.keys(formDataRec)[index]],
               value => recInputChange(Object.keys(formDataRec)[index], value)
               )}
            </View>
         </View>
         ))}

         {/* --------------난중에 삭제--------------- */}
         <View>
         <Text style={[styles.titleText, styles.titleTextNext]}>적용 확인용</Text>
         <Text>이름: {formDataPatie.patieName}</Text>
         <Text>주민번호: {formDataPatie.patieBirth}</Text>
         <Text>연락처: {formDataPatie.patieTel}</Text>
         <Text>주소: {formDataPatie.patieAddr}</Text>
         <Text>증상: {formDataRec.recDetail}</Text>
         <Text>진료부서: {formDataRec.partNum}</Text>
         <Text>담당의: {formDataRec.staffNum}</Text>
         </View>
         {/* --------------난중에 삭제---------------- */}

         <View style={[styles.btnDiv, styles.bottomDiv]}>
         <TouchableOpacity
            style={styles.btn}
            onPress={() => {
               // 난중엔 등록 함수가 올 듯…
               navigate("WaitingInfo");
            }}
         >
            <Text style={styles.btnText}>작성 완료</Text>
         </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
   }

   // 스타일 정의
   const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
      justifyContent: 'center'
   },
   titleText: {
      fontWeight: 'bold',
   },
   titleTextNext: {
      marginTop: 100,
   },
   row: {
      flexDirection: 'row',
   },
   cell: {
      borderBottomWidth: 2,
      borderColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
   },
   cell1: { flex: 1 },
   cell2: { flex: 3 },
   text: { textAlign: 'center', fontSize: 16 },
   input: {
      width: '100%', // 전체 너비 사용
      textAlign: 'center',
      borderColor: 'none',
      padding: 5,
      backgroundColor: '#f1f1f1',
      borderRadius: 3,
      fontSize: 16,
   },
   inputSmall: {
      flex: 1,
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   dash: {
      marginHorizontal: 10
   },
   textArea: {
      height: 80
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
   btnSmallDiv: {
      marginLeft: 'auto',
      marginHorizontal: 12,
   },
   btnSmall: {
      backgroundColor: '#aaaaaa',
      width: 60,
   },
   btnText: {
      textAlign: 'center',
      fontWeight: 'bold',
   },
   bottomDiv: {
      marginTop: 'auto'
   }
   });

   // 선택 상자 스타일 정의
   const pickerStyles = StyleSheet.create({
   inputIOS: {
      fontSize: 12,
      width: '100%',
      color: '#000000',
      borderColor: '#000000',
      padding: 10
   },
   inputAndroid: {
      fontSize: 12,
      width: '100%',
      color: '#000000',
      borderRadius: 12,
      padding: 10
   },
});