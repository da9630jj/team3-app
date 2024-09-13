import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ex_ip } from '../external_ip';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from './commonStyles';
import pickerStyles from './pickerStyles';

export default function RePatientForm() {
   const { navigate } = useNavigation();
   const [parts, setParts] = useState([]);
   const [staffs, setStaffs] = useState([]);

   // 환자 정보 값 저장
   const [formDataPatie, setFormDataPatie] = useState({
      patieName: '',
      patieBirth: ['', '']
   });

   // 사전 문진 값 저장
   const [formDataRec, setFormDataRec] = useState({
      recDetail: '',
      partNum: 0,
      staffNum: 0
   });

   // 환자 정보 테이블 내용
   const tableDataPatie = [
      {
         label: '이름',
         component: (value, onChange) => (
            <TextInput
               style={commonStyles.input}
               onChangeText={onChange}
               value={value}
            />
         )
      },
      {
         label: '주민번호',
         component: (value, onChange) => (
            <View style={commonStyles.inputContainer}>
               <TextInput
                  style={[commonStyles.input, commonStyles.inputSmall]}
                  onChangeText={(text) => onChange(text, 0)}
                  value={value[0]}
               />
               <Text style={commonStyles.dash}>-</Text>
               <TextInput
                  style={[commonStyles.input, commonStyles.inputSmall]}
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
               style={[commonStyles.input, commonStyles.textArea]}
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
      <SafeAreaView style={commonStyles.container}>
         <Text style={commonStyles.titleText}>환자 정보</Text>
         {tableDataPatie.map((item, index) => (
            <View key={index} style={commonStyles.row}>
               <View style={[commonStyles.cell, commonStyles.cell1]}>
                  <Text style={commonStyles.text}>{item.label}</Text>
               </View>
               <View style={[commonStyles.cell, commonStyles.cell2]}>
                  {item.component(
                     formDataPatie[Object.keys(formDataPatie)[index]],
                     (value, i) => patieInputChange(Object.keys(formDataPatie)[index], value, i)
                  )}
               </View>
            </View>
         ))}
         <View style={[commonStyles.btnDiv, commonStyles.btnSmallDiv]}>
            <TouchableOpacity
               style={[commonStyles.btn, commonStyles.btnSmall]}
               onPress={() => {
                  // 환자 등록 함수
               }} >
               <Text  Text style={commonStyles.btnText}>찾기</Text>
            </TouchableOpacity>
         </View>
         <Text style={[commonStyles.titleText, commonStyles.titleTextNext]}>사전 문진</Text>
         {tableDataRec.map((item, index) => (
            <View key={index} style={commonStyles.row}>
               <View style={[commonStyles.cell, commonStyles.cell1]}>
                  <Text style={commonStyles.text}>{item.label}</Text>
               </View>
               <View style={[commonStyles.cell, commonStyles.cell2]}>
                  {item.component(
                     formDataRec[Object.keys(formDataRec)[index]],
                     value => recInputChange(Object.keys(formDataRec)[index], value)
                  )}
               </View>
            </View>
         ))}

         {/* --------------난중에 삭제--------------- */}
         <View>
            <Text style={[commonStyles.titleText, commonStyles.titleTextNext]}>적용 확인용</Text>
            <Text>이름: {formDataPatie.patieName}</Text>
            <Text>주민번호: {formDataPatie.patieBirth}</Text>
            <Text>증상: {formDataRec.recDetail}</Text>
            <Text>진료부서: {formDataRec.partNum}</Text>
            <Text>담당의: {formDataRec.staffNum}</Text>
         </View>
         {/* --------------난중에 삭제---------------- */}

         <View style={[commonStyles.btnDiv, commonStyles.bottomDiv]}>
            <TouchableOpacity
               style={commonStyles.btn}
               onPress={() => navigate("WaitingInfo")}
            >
               <Text style={commonStyles.btnText}>작성 완료</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
}