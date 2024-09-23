import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
      justifyContent: 'center'
   },
   titleText: {
      fontFamily: 'Pretendard-Bold',
   },
   titleTextNext: {
      marginTop: 50,
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
   input: {
      width: '100%', // 전체 너비 사용
      textAlign: 'center',
      borderColor: 'none',
      padding: 5,
      backgroundColor: '#f1f1f1',
      borderRadius: 3,
      fontFamily: 'Pretendard-Regular',
   },
   inputSmall: {
      flex: 1,
   },
   inputLong: {
      marginVertical: 2
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
      fontFamily: 'Pretendard-Bold',
   },
   bottomDiv: {
      marginTop: 'auto'
   },
   text: {
      textAlign: 'center',
      fontFamily: 'Pretendard-Medium',
      fontSize: 16,
   },
   leftAlign: {
      textAlign: 'left',
   },
   rightAlign: {
      textAlign: 'right',
   },
});

export default commonStyles;