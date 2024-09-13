import { StyleSheet, View, TouchableOpacity, Text, Button, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from './commonStyles'

var { height, width } = Dimensions.get('window');

export default function Home() {
   const {navigate} = useNavigation();
   const [isRec, setIsRec] = useState(true);

   return (
      <SafeAreaView style={[commonStyles.container, styles.container]}>
         <View style={styles.logoContainer}>
            <Text style={[styles.logo]}>그린카페병원</Text>
         </View>
         <View style={styles.imageContainer}>
            <Image source={require('../assets/group_medical.png')} style={styles.backGroundImage} />
         </View>
         <View>
            {
               isRec ?
                  <TouchableOpacity style={[styles.btn, styles.btn3]} onPress={() => {navigate("WaitingInfo")}}>
                     <View style={[styles.row, commonStyles.row]}>
                        <View style={[styles.cell]}><Text style={[commonStyles.text, styles.cellText, commonStyles.leftAlign]}>나의 진료 현황</Text></View>
                        <View style={[styles.cell]}><Text style={[styles.cellText, commonStyles.rightAlign]}>→</Text></View>
                     </View>
                  </TouchableOpacity>
               :
               null
            }
            <TouchableOpacity style={[styles.btn, styles.btn1]} onPress={() => {navigate("RePatientForm")}}>
               <View style={[styles.row, commonStyles.row]}>
               <View style={[styles.cell]}><Text style={[commonStyles.text, styles.cellText, commonStyles.leftAlign]}>재방문 환자 전용</Text></View>
                  <View style={[styles.cell]}><Text style={[styles.cellText, commonStyles.rightAlign]}>→</Text></View>
               </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btn2]} onPress={() => {navigate("NewPatientForm")}}>
               <View style={[styles.row, commonStyles.row]}>
                  <View style={[styles.cell]}><Text style={[commonStyles.text, styles.cellText, commonStyles.leftAlign]}>초진 환자 전용</Text></View>
                  <View style={[styles.cell]}><Text style={[styles.cellText, commonStyles.rightAlign]}>→</Text></View>
               </View>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
   btn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width-32,
      marginVertical: 4,
      borderRadius: 3,
      height: 50,
   },
   btn1: {
      backgroundColor: '#8198cc',
   },
   btn2: {
      backgroundColor: '#a383cc',
   },
   btn3: {
      backgroundColor: '#a2b979',
   },
   row: {
      width: '100%',
   },
   cell: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
   },
   cell1: { flex: 2 },
   cell2: { flex: 1 },
   cellText: {
      width: '100%',
      color: '#fff',
   },
   imageContainer: {
      position: 'absolute',
      bottom: 120,
      alignItems: 'center',
      width: '100%',
   },
   backGroundImage: {
      resizeMode: 'contain',
      width: width, 
      height: 400,
   },
   logoContainer: {
      position: 'absolute',
      top: 150,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
   },
   logo: {
      fontSize: 50,
      fontFamily: 'Nasensitivity'
   }, 
})