import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ex_ip } from '../external_ip';
import commonStyles from './commonStyles';
import pickerStyles from './pickerStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RePatientForm() {
   const { navigate } = useNavigation();
   const [parts, setParts] = useState([]);
   const [staffs, setStaffs] = useState([]);
   const [findPatie, setFindPatie] = useState([]);
   const [isPatientFound, setIsPatientFound] = useState(false);
   const [loginData, setLoginData] = useState(null);
   const [isLogin, setIsLogin] = useState(false);

   // 환자 정보 값 저장
   const [formDataPatie, setFormDataPatie] = useState({
      patieName: '',
      patieBirth: ['', '']
   });

   // 사전 문진 값 저장
   const [formDataRec, setFormDataRec] = useState({
      recDetail: '',
      partNum: 0,
      staffNum: 0,
      patieNum: 0
   });

   const loadLoginData = async () => {
      try {
         const value = await AsyncStorage.getItem('loginInfo');
         if (value != null) {
            const parsedValue = JSON.parse(value);
            setLoginData(parsedValue);
            setFormDataPatie({
               patieName: parsedValue.memName,
               patieBirth: parsedValue.memBirth.split('-')
            });
         }
      } catch (e) {
         console.error('Failed to load loginData:', e);
      }
   };
   
   // 로그인 정보 받기 + 진료부서 조회
   useEffect(() => {
      loadLoginData();
      axios.get(`${ex_ip}/rec/getPart`, {withCredentials: true})
      .then((res) => {
         setParts(res.data.map(part => ({ label: part.partName, value: part.partNum })));
      })
      .catch((error) => {
         alert(error);
      });
   }, []);
   
   useEffect(() => {
      if (loginData) {
         setIsLogin(true);
      } else {
         setIsLogin(false);
      }
}, [loginData]);

   // 환자 정보 테이블 내용
   const tableDataPatie = [
      {
         label: '이름',
         component: (value, onChange) => (
            <TextInput
               style={commonStyles.input}
               onChangeText={onChange}
               value={isLogin ? formDataPatie.patieName : value}
            />
         )
      },
      {
         label: '주민번호',
         component: (value, onChange) => {
            return (
               <View style={commonStyles.inputContainer}>
                  <TextInput
                     style={[commonStyles.input, commonStyles.inputSmall]}
                     onChangeText={(text) => onChange(text, 0)}
                     value={formDataPatie.patieBirth[0]}
                     />
                  <Text style={commonStyles.dash}>-</Text>
                  <TextInput
                     style={[commonStyles.input, commonStyles.inputSmall]}
                     onChangeText={(text) => onChange(text, 1)}
                     value={formDataPatie.patieBirth[1]}
                  />
               </View>
            )
         }
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

   // 환자 찾기
   function findRePatie() {
      const patieBirth = formDataPatie.patieBirth.join('-');
      axios.get(`${ex_ip}/patie/findRePatie`, {
         params: {
            patieName: formDataPatie.patieName,
            patieBirth: patieBirth
         },
         withCredentials: true
      })
      .then((res) => {
         if (res.data.length > 0) {
            setFindPatie(res.data);
            const [foundPatie] = res.data;
            const patieBirth = formDataPatie.patieBirth.join('-');
            
            if (foundPatie.patieName === formDataPatie.patieName && foundPatie.patieBirth === patieBirth) {
               alert(`${foundPatie.patieName}님 확인 되었습니다.`);
               setIsPatientFound(true); 
               setFormDataRec({...formDataRec, patieNum: foundPatie.patieNum});
            } else {
               alert('환자 정보가 없습니다.');
               setIsPatientFound(false); 
            }
         } else {
            alert('환자 정보가 없습니다.1');
            setIsPatientFound(false); 
         }
      })
      .catch((error) => {
         console.log(error);
         alert('정보 조회에 실패했습니다.');
         setIsPatientFound(false); 
      });
   }

   // 사전 문진 onChange 함수
   const recInputChange = (field, value) => {
      setFormDataRec(prevState => ({
         ...prevState,
         [field]: value
      }));
   };

   //작성완료 클릭 시 실행
   function insertRec() {
      if (!isPatientFound) {
         alert('환자 정보를 먼저 확인해 주세요.');
         return;
      }
      if (!formDataRec.recDetail || !formDataRec.partNum || !formDataRec.staffNum) {
         alert( '모든 필수 필드를 입력해주세요.');
         return;
      }

      axios.post(`${ex_ip}/rec/insertRec`, formDataRec, {withCredentials: true})
      .then((res) => {
         alert('진료가 접수되었습니다.');
         saveData(res.data)
         navigate('WaitingInfo', { patieNum: formDataRec.patieNum });
      })
      .catch((error) => {
         alert(error);
      });
   }

      // 세션에 데이터 저장
      const saveData = async (recNum) => {
         try {
         await AsyncStorage.setItem('recInfo', JSON.stringify({
            recNum: recNum,
            patieNum: formDataRec.patieNum,
            partNum: formDataRec.partNum
            }));
         } catch (e) {
         console.error('Failed to save data:', e);
         }
      };
   
   return (
      <KeyboardAvoidingView style={commonStyles.container}>
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
                  findRePatie();
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
         ))
}

         <View style={[commonStyles.btnDiv, commonStyles.bottomDiv]}>
            <TouchableOpacity
               style={commonStyles.btn}
               onPress={() => {
                  insertRec()
               }}
            >
               <Text style={commonStyles.btnText}>작성 완료</Text>
            </TouchableOpacity>
         </View>
      </KeyboardAvoidingView>
   );
}