
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ex_ip } from '../external_ip';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import commonStyles from './commonStyles';
import pickerStyles from './pickerStyles';

export default function NewPatientForm() {
   const { navigate } = useNavigation();
   const [parts, setParts] = useState([]);
   const [staffs, setStaffs] = useState([]);

   // 환자 정보 값 저장
   const [formDataPatie, setFormDataPatie] = useState({
      patieName: '',
      patieBirth: ['', ''],
      patieTel: ['', '', ''],
      patieAddr: ['', ''],
      patieGen: 'F'
   });

   // 사전 문진 값 저장
   const [formDataRec, setFormDataRec] = useState({
      recDetail: '',
      partNum: '',
      staffNum: '',
      patieNum:0
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
      },
      {
         label: '연락처',
         component: (value, onChange) => (
         <View style={commonStyles.inputContainer}>
            <TextInput
               style={[commonStyles.input, commonStyles.inputSmall]}
               onChangeText={(text) => onChange(text, 0)}
               value={value[0]}
               keyboardType="number-pad"
            />
            <Text style={commonStyles.dash}>-</Text>
            <TextInput
               style={[commonStyles.input, commonStyles.inputSmall]}
               onChangeText={(text) => onChange(text, 1)}
               value={value[1]}
               keyboardType="number-pad"
            />
            <Text style={commonStyles.dash}>-</Text>
            <TextInput
               style={[commonStyles.input, commonStyles.inputSmall]}
               onChangeText={(text) => onChange(text, 2)}
               value={value[2]}
               keyboardType="number-pad"
            />
         </View>
         )
      },
      {
         label: '주소',
         component: (value, onChange) => (
         <>
            <TextInput
               style={[commonStyles.input, commonStyles.inputLong]}
               placeholder='주소 입력'
               placeholderTextColor='#999999'
               onChangeText={(text) => onChange(text, 0)}
               value={value[0]}
            />
            <TextInput
               style={[commonStyles.input, commonStyles.inputLong]}
               placeholder='상세주소 입력'
               placeholderTextColor='#999999'
               onChangeText={(text) => onChange(text, 1)}
               value={value[1]}
            />
         </>
         )
      },
      {
         label: '성별',
         component: (value, onChange) => (
            <RadioButton.Group onValueChange={value => onChange(value)} value={value}>
               <View style={commonStyles.inputContainer}>
                  <View style={[styles.genRow, commonStyles.cell1]}>
                     <RadioButton style={styles.genRadio} color='#444444' uncheckedColor='#dddddd' value='F' />
                     <Text>여성</Text>
                  </View>
                  <View style={[styles.genRow, commonStyles.cell1]}>
                     <RadioButton style={styles.genRadio} color='#444444' uncheckedColor='#dddddd' value='M' />
                     <Text>남성</Text>
                  </View>
               </View>
            </RadioButton.Group>
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
         axios.get(`${ex_ip}/rec/selectStaffName/${formDataRec.partNum}`,  {withCredentials: true})
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

   //환자 정보 등록 버튼 클릭 시 실행
   function regPatie(){
      console.log(formDataPatie)
      axios.post(`${ex_ip}/patie/insertPatie`, formDataPatie, {withCredentials: true})
      .then((res) => {
         console.log(11)
         console.log(res.data);
         setFormDataRec({...formDataRec, patieNum : res.data})
      })
      .catch((error) => {
         alert(error);
      });
   }
   
   //작성완료 클릭 시 실행
   function insertRec(){
      axios.post(`${ex_ip}/rec/insertRec`, formDataRec, {withCredentials: true})
      .then((res) => {
         alert('진료 접수되었습니다.');
         navigate(`WaitingInfo`, {patieNum : formDataRec.patieNum});
      })
      .catch((error) => {
         alert(error);
      });
   }

   return (
      <SafeAreaView style={commonStyles.container}>
         <Text style={commonStyles.titleText}>환자 정보</Text>
         {tableDataPatie.map((item, index) => (
         <View key={index} style={commonStyles.row}>
            <View style={[commonStyles.cell, commonStyles.cell1]}>
               <Text style={commonStyles.text}>{item.label}</Text>
            </View>
            <View style={[commonStyles.cell, commonStyles.cell2]}>
               {
                  item.component(
                  formDataPatie[Object.keys(formDataPatie)[index]],
                  (value, i) => patieInputChange(Object.keys(formDataPatie)[index], value, i)
                  )
               }
            </View>
         </View>
         ))}
         <View style={[commonStyles.btnDiv, commonStyles.btnSmallDiv]}>
            <TouchableOpacity
               style={[commonStyles.btn, commonStyles.btnSmall]}
               onPress={() => {
                  regPatie()
               }} >
               <Text  Text style={commonStyles.btnText} >등록</Text>
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
            <Text>이름: {formDataPatie.patieName}, 주민번호: {formDataPatie.patieBirth}</Text>
            <Text>연락처: {formDataPatie.patieTel}</Text>
            <Text>주소: {formDataPatie.patieAddr}</Text>
            <Text>성별: {formDataPatie.patieGen}</Text>
            <Text>증상: {formDataRec.recDetail}</Text>
            <Text>진료부서: {formDataRec.partNum}, 담당의: {formDataRec.staffNum}</Text>
         </View>
         {/* --------------난중에 삭제---------------- */}

         <View style={[commonStyles.btnDiv, commonStyles.bottomDiv]}>
         <TouchableOpacity
            style={commonStyles.btn}
            onPress={() => {
               // 난중엔 등록 함수가 올 듯…
               insertRec();
               
            }}
         >
            <Text style={commonStyles.btnText}>작성 완료</Text>
         </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
   }

   // 스타일 정의
   const styles = StyleSheet.create({
      genRow: {
         alignItems: 'center',
         flexDirection: 'row',
         paddingHorizontal: 40
      },
      genRadio: {
         marginRight: 8,
      },
   });

   // // 선택 상자 스타일 정의
   // const pickerStyles = StyleSheet.create({
   //    inputIOS: {
   //       fontSize: 12,
   //       width: '100%',
   //       color: '#000000',
   //       borderColor: '#000000',
   //       padding: 10
   //    },
   //    inputAndroid: {
   //       fontSize: 12,
   //       width: '100%',
   //       color: '#000000',
   //       borderRadius: 12,
   //       padding: 10
   //    },
   // });