import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ex_ip } from '../external_ip';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RePatientForm() {
   const { navigate } = useNavigation();
   const [parts, setParts] = useState([]);
   const [staffs, setStaffs] = useState([]);
   const [findPatie, setFindPatie] = useState([])
   const [isFind, setIsFind]=useState(false);

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
      patieNum:0
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
      axios.get(`http://localhost:8085/rec/getPart`, {withCredentials: true})
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
         axios.get(`http://localhost:8085/rec/selectStaffName/${formDataRec.partNum}`, {withCredentials: true})
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

   function findOnClick() {
      findRePatie(); 
   }
   
   function findRePatie() {
      const patieBirth = formDataPatie.patieBirth.join('-');
      axios.get('http://localhost:8085/patie/findRePatie', {
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
            setFormDataRec({...formDataRec, patieNum: foundPatie.patieNum}); // 수정된 부분
          } else {
            alert('환자 정보가 없습니다.');
          }
        } else {
          alert('환자 정보가 없습니다.');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('정보 조회에 실패했습니다.');
      });
   }
   

   // 환자 정보 찾기 버튼 클릭시
   function findOnClick() {
      findRePatie(); 
      if (findPatie.length > 0) {
         const [foundPatie] = findPatie;
         const patieBirth = formDataPatie.patieBirth.join('-');

         if (foundPatie.patieName === formDataPatie.patieName && foundPatie.patieBirth === patieBirth) {
            alert(`${foundPatie.patieName}님 확인 되었습니다.`);
            setFormDataRec({...formDataRec, patieNum : res.data})
         } else {
            alert('환자 정보가 없습니다.');
         }
      } else {
         alert('환자 정보가 없습니다.');
      }
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
      axios.post(`http://localhost:8085/rec/insertRec`, formDataRec, {withCredentials: true})
      .then((res) => {
         alert('진료 접수되었습니다.');
         console.log(formDataRec.patieNum)
         navigate('WaitingInfo', { patieNum: formDataRec.patieNum });
      })
      .catch((error) => {
         alert(error);
      });
   }
   
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
                  findOnClick();
                  // 환자 등록 함수
               }} >
               <Text  Text style={styles.btnText}>찾기</Text>
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
            <Text>증상: {formDataRec.recDetail}</Text>
            <Text>진료부서: {formDataRec.partNum}</Text>
            <Text>담당의: {formDataRec.staffNum}</Text>
         </View>
         {/* --------------난중에 삭제---------------- */}

         <View style={[styles.btnDiv, styles.bottomDiv]}>
            <TouchableOpacity
               style={styles.btn}
               onPress={() => {
                  insertRec()
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
      marginTop: 70,
   },
   row: {
      flexDirection: 'row',
   },
   cell: {
      borderBottomWidth: 2,
      borderColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 10,
   },
   cell1: { flex: 1 },
   cell2: { flex: 3 },
   text: { textAlign: 'center', fontSize: 16 },
   input: {
      width: '100%',
      textAlign: 'center',
      borderColor: 'none',
      padding: 5,
      backgroundColor: '#f1f1f1',
      borderRadius: 3,
      fontSize:16,
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
      fontSize: 16,
      width: '100%',
      color: '#000',
      borderColor: '#000',
      padding: 10
   },
   inputAndroid: {
      fontSize: 16,
      width: '100%',
      color: '#000',
      borderRadius: 12,
      padding: 10
   },
});
