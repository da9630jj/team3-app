import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
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
      partNum: '',
      staffNum: ''
   });

   useEffect(() => {
      // 진료부서 조회
      axios.get('http://localhost:8085/rec/getPart', {withCredentials: true})
         .then((res) => {
         setParts(res.data.map(part => ({ label: part.partName, value: part.partNum })));
            // setParts(res.data);
            console.log("이아래");
            console.log(parts)
            console.log("********* 이건 아니지 *********" + res.data);
         })
         .catch((error) => {
            alert(error);
         });
},[])

useEffect(() => {
   // 선택된 진료부서가 있을 때만 담당의 조회
   if (formDataRec.partNum) {
      axios.get(`http://localhost:8085/rec/selectStaffName/${formDataRec.partNum}`, { withCredentials: true })
         .then(res => {
            setStaffs(res.data.map(staff => ({ label: staff.staffName, value: staff.staffNum })));
         })
         .catch(error => {
            alert('담당의 데이터를 가져오는 중 오류가 발생했습니다.');
         });
   } else {
      setStaffs([]); // 진료부서가 선택되지 않았을 때는 담당의 목록을 비웁니다.
   }
}, [formDataRec.partNum]);


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

   const handleSubmit = () => {
      // 필수 값이 비어 있는지 확인
      if (!formDataPatie.patieName || !formDataPatie.patieTel[0] || !formDataPatie.patieBirth[0] ||
         !formDataPatie.patieAddr[0] || !formDataRec.partNum || !formDataRec.staffNum) {
         Alert.alert('경고', '모든 필드를 입력하세요.');
         return;
      }

      // 데이터 전송 로직
      axios.post('/patie/insertPatie', {
         ...formDataPatie,
         patieBirth: formDataPatie.patieBirth.join('-'),
         patieTel: formDataPatie.patieTel.join('-'),
         patieAddr: formDataPatie.patieAddr.join(' ')
      })
         .then(res => {
         const patieNum = res.data;
         return axios.post('/rec/insertRec', {
            ...formDataRec,
            patieNum: patieNum,
            recDetail: formDataRec.recDetail
         });
         })
         .then(() => {
         Alert.alert('완료', '등록되었습니다.');
         navigate('WaitingInfo'); // Adjust this as needed for your navigation
         })
         .catch(error => {
         console.error('Error submitting form:', error);
         });
   };

   return (
      <View style={styles.container}>
         <Text style={styles.titleText}>첫방문 환자 진료 정보 추가</Text>
         <Text style={styles.titleText}>환자 기본 정보</Text>
         <View style={styles.row}>
         <View style={styles.cell}>
            <Text style={styles.text}>이름</Text>
         </View>
         <View style={styles.cell}>
            <TextInput
               style={styles.input}
               onChangeText={(text) => patieInputChange('patieName', text)}
               value={formDataPatie.patieName}
            />
         </View>
         </View>
         <View style={styles.row}>
         <View style={styles.cell}>
            <Text style={styles.text}>주민등록번호</Text>
         </View>
         <View style={styles.cell}>
            <View style={styles.inputContainer}>
               <TextInput
               style={[styles.input, styles.inputSmall]}
               onChangeText={(text) => patieInputChange('patieBirth', [text, formDataPatie.patieBirth[1]], 0)}
               value={formDataPatie.patieBirth[0]}
               keyboardType='numeric'
               />
               <Text style={styles.dash}>-</Text>
               <TextInput
               style={[styles.input, styles.inputSmall]}
               onChangeText={(text) => patieInputChange('patieBirth', [formDataPatie.patieBirth[0], text], 1)}
               value={formDataPatie.patieBirth[1]}
               keyboardType='numeric'
               />
            </View>
         </View>
         </View>
         <View style={styles.row}>
         <View style={styles.cell}>
            <Text style={styles.text}>연락처</Text>
         </View>
         <View style={styles.cell}>
            <View style={styles.inputContainer}>
               <TextInput
               style={[styles.input, styles.inputSmall]}
               onChangeText={(text) => patieInputChange('patieTel', [text, formDataPatie.patieTel[1], formDataPatie.patieTel[2]], 0)}
               value={formDataPatie.patieTel[0]}
               keyboardType='numeric'
               />
               <Text style={styles.dash}>-</Text>
               <TextInput
               style={[styles.input, styles.inputSmall]}
               onChangeText={(text) => patieInputChange('patieTel', [formDataPatie.patieTel[0], text, formDataPatie.patieTel[2]], 1)}
               value={formDataPatie.patieTel[1]}
               keyboardType='numeric'
               />
               <Text style={styles.dash}>-</Text>
               <TextInput
               style={[styles.input, styles.inputSmall]}
               onChangeText={(text) => patieInputChange('patieTel', [formDataPatie.patieTel[0], formDataPatie.patieTel[1], text], 2)}
               value={formDataPatie.patieTel[2]}
               keyboardType='numeric'
               />
            </View>
         </View>
         </View>
         <View style={styles.row}>
         <View style={styles.cell}>
            <Text style={styles.text}>주소</Text>
         </View>
         <View style={styles.cell}>
            <View style={styles.inputContainer}>
               <TextInput
               style={[styles.input, styles.inputSmall]}
               onChangeText={(text) => patieInputChange('patieAddr', [text, formDataPatie.patieAddr[1]], 0)}
               value={formDataPatie.patieAddr[0]}
               />
               <TextInput
               style={styles.input}
               onChangeText={(text) => patieInputChange('patieAddr', [formDataPatie.patieAddr[0], text], 1)}
               value={formDataPatie.patieAddr[1]}
               />
            </View>
         </View>
         </View>

         <Text style={[styles.titleText, styles.titleTextNext]}>진료 정보</Text>
         <View style={styles.row}>
         <View style={styles.cell}>
            <Text style={styles.text}>증상</Text>
         </View>
         <View style={styles.cell}>
            <TextInput
               style={[styles.input, styles.textArea]}
               onChangeText={(text) => recInputChange('recDetail', text)}
               value={formDataRec.recDetail}
               multiline
            />
         </View>
         </View>
         <View style={styles.row}>
         <View style={styles.cell}>
            <Text style={styles.text}>진료부서</Text>
         </View>
         <View style={styles.cell}>
            <RNPickerSelect
               placeholder={{ label: '진료부서 선택', value: '' }}
               value={formDataRec.partNum}
               onValueChange={(value) => recInputChange('partNum', value)}
               items={parts}
               style={pickerStyles}
            />
         </View>
         </View>
         <View style={styles.row}>
         <View style={styles.cell}>
            <Text style={styles.text}>담당의</Text>
         </View>
         <View style={styles.cell}>
            <RNPickerSelect
               placeholder={{ label: '담당의 선택', value: '' }}
               value={formDataRec.staffNum}
               onValueChange={(value) => recInputChange('staffNum', value)}
               items={staffs}
               style={pickerStyles}
            />
         </View>
         </View>

         <View style={[styles.btnDiv, styles.bottomDiv]}>
         <TouchableOpacity
            style={styles.btn}
            onPress={handleSubmit}
         >
            <Text style={styles.btnText}>작성 완료</Text>
         </TouchableOpacity>
         </View>
      </View>
   );
   }

   const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
   },
   titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   titleTextNext: {
      marginTop: 20,
   },
   row: {
      flexDirection: 'row',
      marginBottom: 10,
   },
   cell: {
      flex: 1,
   },
   text: {
      fontSize: 16,
   },
   input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 4,
      backgroundColor: '#fff',
   },
   inputSmall: {
      width: '30%',
   },
   textArea: {
      height: 100,
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   dash: {
      fontSize: 18,
      marginHorizontal: 5,
   },
   btnDiv: {
      marginTop: 20,
   },
   btn: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 5,
   },
   btnText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
   },
   });

   const pickerStyles = StyleSheet.create({
   inputIOS: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 4,
      backgroundColor: '#fff',
   },
   inputAndroid: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 4,
      backgroundColor: '#fff',
   },
});
