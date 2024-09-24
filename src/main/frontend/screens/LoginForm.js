import { View, Text, StyleSheet, TextInput, TouchableOpacity, BackHandler } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import commonStyles from './commonStyles'
import axios from 'axios';
import { ex_ip } from '../external_ip';
import { useNavigation  } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginForm({navigation}){
   //const { navigate } = useNavigation();



   // 로그인 값 저장
   const [formDataLogin, setFormDataLogin] = useState({
      memId: '',
      memPw: ''
   });

   // 로그인 onChange 함수 선언
   const handleInputChange = (field, value) => {
      setFormDataLogin(prevState => ({
      ...prevState,
      [field]: value
      }));
   };

   const [loginMember, setLoginMember] = useState({});

   // 로그인 버튼 함수 선언
   const handleSubmit = () => {
      axios.post(`${ex_ip}/patie/login`, formDataLogin)
      .then((res) => {
         setLoginMember(res.data);
         saveData(res.data);
         navigation.goBack();

      })
      .catch((error) => {alert(error)});
   };

   // 아이디 찾기 버튼 함수 선언
   const handleSearchId = () => {
      console.log('아이디를 잘 찾아보세요');
   };

   // 비밀번호 찾기 버튼 함수 선언
   const handleSearchPw = () => {
      console.log('비번을 잘 찾아보세요');
   };

   // 회원가입하기 버튼 함수 선언
   const handleJoin = () => {
      console.log('회원가입을 합시다');
   };

   // 세션에 데이터 저장
   const saveData = async () => {
      try {
      const loginData = {
         memId: loginMember.memId,
         memNum: loginMember.memNum,
         memName: loginMember.memName,
         memBirth: loginMember.memBirth,
      };

      console.log(loginData);

      await AsyncStorage.setItem('loginInfo', JSON.stringify(loginData));
      } catch (e) {
         console.error('Failed to save data:', e);
      }
   };

   return (
      <SafeAreaView style={commonStyles.container}>
         {/* 아이디 비번 입력 창 */}
         <View style={commonStyles.row}>
            <View style={[styles.cell, styles.cell1]}>
               <Text style={[commonStyles.text, styles.text]}>아이디</Text>
            </View>
            <View style={[styles.cell, styles.cell2]}>
               <TextInput
               style={[commonStyles.input, styles.input]}
               placeholder="아이디 입력"
               placeholderTextColor="#dddddd"
               value={formDataLogin.memId}
               onChangeText={(text) => handleInputChange('memId', text)}
               />
            </View>
         </View>
         <View style={commonStyles.row}>
            <View style={[styles.cell, styles.cell1]}>
               <Text style={[commonStyles.text, styles.text]}>비밀번호</Text>
            </View>
            <View style={[styles.cell, styles.cell2]}>
               <TextInput
               style={[commonStyles.input, styles.input]}
               placeholder="비밀번호 입력"
               placeholderTextColor="#dddddd"
               value={formDataLogin.memPw}
               onChangeText={(text) => handleInputChange('memPw', text)}
               />
            </View>
         </View>
         {/* 로그인 버튼 */}
         <View style={commonStyles.btnDiv}>
            <TouchableOpacity style={commonStyles.btn} onPress={handleSubmit}>
               <Text style={commonStyles.btnText}>로그인</Text>
            </TouchableOpacity>
         </View>
         {/* 아이디 찾기/비번 찾기 */}
         <View style={styles.extraDiv}>
            <View style={[commonStyles.row, styles.rightAlign]}>
               <TouchableOpacity style={styles.extraBtn} onPress={handleSearchId}>
                  <Text style={styles.extraText}>아이디 찾기</Text>
               </TouchableOpacity>
               <Text style={styles.extraText}> | </Text>
               <TouchableOpacity style={styles.extraBtn} onPress={handleSearchPw}>
                  <Text style={styles.extraText}>비밀번호 찾기</Text>
               </TouchableOpacity>
            </View>
         </View>
         <View style={[commonStyles.row, styles.rightAlign]}>
            <TouchableOpacity style={styles.extraBtn} onPress={handleJoin}>
               <Text style={styles.extraText}>회원가입하기</Text>
            </TouchableOpacity>
         </View>

         <View>
            <Text>아이디: {formDataLogin.memId}</Text>
            <Text>비밀번호: {formDataLogin.memPw}</Text>
            <Text>로그인 멤버: {loginMember.memNum}번, {loginMember.memName}님, {loginMember.memId}, {loginMember.memBirth}
            </Text>
         </View>
      </SafeAreaView>
   );
}

   const styles = StyleSheet.create({
      container: {
         flex: 1,
         padding: 16,
         backgroundColor: '#fff',
         justifyContent: 'center'
      },
      cell: {
         justifyContent: 'center',
         alignItems: 'center',
         paddingVertical: 5,
         paddingHorizontal: 10,
      },
      cell1: { flex: 1 },
      cell2: { flex: 4 },
      text: { textAlign: 'right', width:'100%' },
      input: {
         borderBottomColor: '#dddddd',
         borderBottomWidth: 2,
         backgroundColor: 'none'
      },
      rightAlign: {
         justifyContent:'flex-end',
         marginTop: 3
      },
      extraText: {
         color: '#999999',
         padding: 2,
      },
      extraDiv: {
         marginTop: 10
      },
   });