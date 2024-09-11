import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function NewPatientForm() {
   const { navigate } = useNavigation();
   const [parts, setParts] = useState([]);
   const [staffs, setStaffs] = useState([]);
   const [formDataPatie, setFormDataPatie] = useState({
      patieName: '',
      patieBirth: ['', ''],
      patieTel: ['', '', ''],
      patieAddr: ['', '']
   });
   const [formDataRec, setFormDataRec] = useState({
      recDetail: '',
      partName: '',
      staffName: ''
   });

   
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

   useEffect(() => {
      // 진료부서 조회
      axios.get('http://localhost:8085/rec/getPart', {withCredentials: true})
         .then((res) => {
            setParts(res.data.map(part => ({ label: part.partName, value: part.partNum })));
         })
         .catch((error) => {
            alert(error);
         });
      }, []);


   useEffect(() => {
      // 담당의 조회 
      axios.get(`http://localhost:8085/rec/selectStaffName/${formDataRec.partName}`, {withCredentials: true})
      .then((res) => {
         setStaffs(res.data.map(staff => ({ label: staff.staffName, value: staff.staffNum })));
         console.log(res.data);
      })
      .catch((error) => {
         console.error('Error fetching staffs:', error);
      });
   }, []);

   const patieInputChange = (field, value, index) => {
      setFormDataPatie(prevState => ({
         ...prevState,
         [field]: index !== undefined
         ? prevState[field].map((item, idx) => idx === index ? value : item)
         : value
      }));
   };

   const recInputChange = (field, value) => {
      setFormDataRec(prevState => ({
         ...prevState,
         [field]: value
      }));
   };

   return (
      <View style={styles.container}>
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
         <Text>진료부서: {formDataRec.partName}</Text>
         <Text>담당의: {formDataRec.staffName}</Text>
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
      </View>
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
   text: { textAlign: 'center', fontSize: 12 },
   input: {
      width: '100%', // 전체 너비 사용
      textAlign: 'center',
      borderColor: 'none',
      padding: 5,
      backgroundColor: '#f1f1f1',
      borderRadius: 3
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
   btnText: {
      textAlign: 'center',
      fontWeight: 'bold',
   },
   bottomDiv: {
      marginTop: 'auto'
   }
   });

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
