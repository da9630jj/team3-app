import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from './commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Mypage() {
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();
  const [loginData, setLoginData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const loadLoginData = async () => {
    try {
      const value = await AsyncStorage.getItem('loginInfo');
      if (value) {
          const parsedValue = JSON.parse(value);
          setLoginData(parsedValue);
      }
    } catch (e) {
      console.error('Failed to load loginData:', e);
    }
};

  useEffect(() => {
    loadLoginData();
  }, []);

  useEffect(() => {
    if (loginData) {
      setIsLogin(true);
      console.log("로그인 데이터 있음")
    } else {
      console.log("로그인 데이터 없음")
      setIsLogin(false);
    }
}, [loginData]);

  const removeData = async (key) => {
    try {
    await AsyncStorage.removeItem(key);
    console.log(`${key}가 삭제되었습니다.`);
    } catch (error) {
    console.error('데이터 삭제 실패:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, commonStyles.container]}>
      {
        isLogin ? 
          <View style={styles.topDiv}>
            <Text style={commonStyles.titleText}>{loginData.patieName} 님 안녕하세요</Text>
            <Text style={styles.what}>뭐라고 쓰지</Text>
          </View>
        :
          <View style={styles.topDiv}>
            <Text style={commonStyles.titleText}>로그인이 필요합니다</Text>
            <Text style={styles.what}>로그인이 필요하다고</Text>
          </View>
      }
      <View style={styles.table}>
        <TouchableOpacity style={commonStyles.row} onPress={() => {
          isLogin ? alert("로그인했잖어") :  navigate("LoginForm");
          }}>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, commonStyles.leftAlign]}>개인 정보 수정</Text>
          </View>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, commonStyles.rightAlign]}>→</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.row}>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, commonStyles.leftAlign]}>나의 진료 이력</Text>
          </View>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, commonStyles.rightAlign]}>→</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.row}>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, commonStyles.leftAlign]}>증명서 발급하기</Text>
          </View>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, commonStyles.rightAlign]}>→</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.row}>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, commonStyles.leftAlign]}>뭘 쓸까요</Text>
          </View>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, commonStyles.rightAlign]}>→</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.row}>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, commonStyles.leftAlign]}>설정</Text>
          </View>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, commonStyles.rightAlign]}>→</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.btnDiv, commonStyles.btnDiv, commonStyles.bottomDiv]}>
        <TouchableOpacity style={[styles.btn, commonStyles.btn]} onPress={() => {
            removeData("loginInfo");
            setIsLogin(false);
            }} >
            <Text style={commonStyles.btnText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      // flex: 1,
      // backgroundColor: '#fff',
      // justifyContent: 'center',
      // padding: 16,
      alignItems: 'center',
  },
  // titleText: {
  //   fontWeight: 'bold',
  // },
  what: {
    fontWeight: 'bold',
    fontSize: 50,
    marginLeft: 10,
    marginTop:10,
  },
  topDiv: {
    borderBottomWidth: 2,
    borderColor: '#444',
    width: '100%',
    paddingVertical: 20,
  },
  table: {
    width: '100%',
    marginTop: 50,
    padding: 10,
  },
  // row: {
  //   flexDirection: 'row',
  // },
  cell: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 2,
  },
  cell1: { flex: 2 },
  cell2: { flex: 1 },
  cellText: {
    fontSize: 16,
    width: '100%',
    fontFamily: 'Pretendard-Regular',
  },
  // leftAlign: {
  //   textAlign: 'left',
  // },
  // rightAlign: {
  //   textAlign: 'right',
  // },
  btnDiv: {
    width: '100%',
    // marginTop: 20,
    // alignItems: 'center',
  },
  btn: {
      fontFamily: 'Pretendard-Regular',
      // backgroundColor: '#f1f1f1',
      // borderRadius: 3,
      // width: '100%',
      // paddingVertical: 10
  },
  // btnText: {
  //     textAlign: 'center',
  //     fontWeight: 'bold',
  // },
  // bottomDiv: {
  //   marginTop: 'auto'
  // },
})