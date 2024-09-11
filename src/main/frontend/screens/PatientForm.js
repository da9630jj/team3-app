import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import RNPickerSelect from 'react-native-picker-select';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    ssn: '',
    phonePrefix: '010',
    phoneMid: '',
    phoneEnd: '',
    address: ''
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const tableData = [
    ['이름', <TextInput style={[styles.input, styles.cellWidth1]} value={formData.name} onChangeText={(text) => handleInputChange('name', text)} />],
    ['주민등록번호', <TextInput style={[styles.input, styles.cellWidth1]} value={formData.ssn} onChangeText={(text) => handleInputChange('ssn', text)} />],
    ['연락처', (
      <View style={styles.phoneContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Select', value: '' }}
          value={formData.phonePrefix}
          onValueChange={(value) => handleInputChange('phonePrefix', value)}
          items={[
            { label: '010', value: '010' },
            { label: '011', value: '011' },
            { label: '016', value: '016' }
          ]}
          style={pickerStyles}
        />
        <TextInput
          style={[styles.input, styles.phonePart]}
          value={formData.phoneMid}
          onChangeText={(text) => handleInputChange('phoneMid', text)}
          keyboardType="numeric"
          maxLength={4}
        />
        <TextInput
          style={[styles.input, styles.phonePart]}
          value={formData.phoneEnd}
          onChangeText={(text) => handleInputChange('phoneEnd', text)}
          keyboardType="numeric"
          maxLength={4}
        />
      </View>
    )],
    ['주소', <TextInput style={[styles.input, styles.cellWidth2]} value={formData.address} onChangeText={(text) => handleInputChange('address', text)} />]
  ];

  return (
    <View style={styles.container}>
      <Table borderStyle={styles.border}>
        {tableData.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={index % 2 === 0 ? styles.row1 : styles.row2}
            textStyle={styles.text}
          />
        ))}
      </Table>
    </View>



  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', justifyContent:'center' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  row1: { height: 60, flexDirection: 'row' },
  row2: { height: 60, flexDirection: 'row' },
  text: { textAlign: 'center', fontWeight: '100' },
  border: { borderWidth: 1, borderColor: '#c8e1ff' },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, paddingHorizontal: 8 },
  phoneContainer: { flexDirection: 'row', alignItems: 'center' },
  phonePart: { flex: 1, marginHorizontal: 4 },
  cellWidth1: { flex: 1 }, 
  cellWidth2: { flex: 3 }
});

// RNPickerSelect 스타일 정의
const pickerStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginHorizontal: 4
  },
  inputAndroid: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginHorizontal: 4
  }
});