import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Mypage() {
  const {navigate} = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topDiv}>
        <Text style={styles.titleText}>홍길동 님 안녕하세요</Text>
        <Text style={styles.what}>뭐라고 쓰지</Text>
      </View>
      <View style={styles.table}>
        <TouchableOpacity style={styles.row} onPress={() => {navigate("LoginForm")}}>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, styles.leftAlign]}>개인 정보 수정</Text>
          </View>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, styles.rightAlign]}>→</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, styles.leftAlign]}>나의 진료 이력</Text>
          </View>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, styles.rightAlign]}>→</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, styles.leftAlign]}>증명서 발급하기</Text>
          </View>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, styles.rightAlign]}>→</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, styles.leftAlign]}>뭘 쓸까요</Text>
          </View>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, styles.rightAlign]}>→</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, styles.leftAlign]}>설정</Text>
          </View>
          <View style={[styles.cell, styles.cell1]}>
            <Text style={[styles.cellText, styles.rightAlign]}>→</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.btnDiv, styles.bottomDiv]}>
        <TouchableOpacity style={styles.btn} onPress={() => {
            // 로그아웃을 합시다
            navigate("Home")
            }} >
            <Text style={styles.btnText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
  },
  titleText: {
    fontWeight: 'bold',
  },
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
  row: {
    flexDirection: 'row',
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
  },
  leftAlign: {
    textAlign: 'left',
  },
  rightAlign: {
    textAlign: 'right',
  },
  btnDiv: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  btn: {
      fontWeight: 800,
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
  },
})