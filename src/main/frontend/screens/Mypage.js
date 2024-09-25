import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from './commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Mypage() {
  const {navigate} = useNavigation();
  const [loginData, setLoginData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadLoginData();
    }, [])
  )

  const loadLoginData = async () => {
    try {
      const value = await AsyncStorage.getItem('loginInfo');
      //const value = window.localStorage.getItem('loginInfo');
      if (value) {
        const parsedValue = JSON.parse(value);
        setLoginData(parsedValue);
      }
    } catch (e) {
      console.error('Failed to load loginData:', e);
    }
};

  useEffect(() => {
    if (loginData) {
      setIsLogin(true);
      console.log(loginData)
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
            <View style={[commonStyles.row, styles.container]}>
            <Image
                source={require('../assets/icon.png')}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{loginData.memName}</Text>
                <Text style={styles.id}>{loginData.memId}</Text>
            </View>
        </View>
          </View>
          
        :
          <View style={styles.topDiv}>
            <Text style={styles.what}>로그인이 필요한 서비스</Text>
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
        {/* <TouchableOpacity style={commonStyles.row}>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, commonStyles.leftAlign]}>뭘 쓸까요</Text>
          </View>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, commonStyles.rightAlign]}>→</Text>
          </View>
        </TouchableOpacity> */}
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
        {
          isLogin ?
            <TouchableOpacity style={[styles.btn, commonStyles.btn]} onPress={() => {
                removeData("loginInfo");
                setIsLogin(false);
                }} >
                <Text style={commonStyles.btnText}>로그아웃</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity style={[styles.btn, commonStyles.btn]} onPress={() => {
                navigate("LoginForm");
                }} >
                <Text style={commonStyles.btnText}>로그인</Text>
            </TouchableOpacity>
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
  },
  what: {
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 30,
    marginLeft: 10,
    marginTop:10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
},
name: {
    fontSize: 18,
    fontWeight: 'bold',
},
id: {
    fontSize: 14,
    color: 'gray',
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
  btnDiv: {
    width: '100%',
  },
  btn: {
      fontFamily: 'Pretendard-Regular',
  },
})