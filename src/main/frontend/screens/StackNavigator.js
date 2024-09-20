import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigation';
import WaitingInfo from './WaitingInfo'; 
import NewPatientForm from './NewPatientForm';
import RePatientForm from './RePatientForm';
import LoginForm from './LoginForm';
import { StyleSheet, View, TouchableOpacity, Text, Button, Dimensions, Image } from 'react-native'
import Home from './Home';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function StackNavigator() {



   return (
      <Stack.Navigator>
         <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
         <Stack.Screen name="RePatientForm" component={RePatientForm} options={{title: ''}} />
         <Stack.Screen name="NewPatientForm" component={NewPatientForm} options={{title: ''}} />
         <Stack.Screen name="WaitingInfo" component={WaitingInfo} options={{title: ''}} />
         <Stack.Screen name="LoginForm" component={LoginForm} options={{title: ''}} />
      </Stack.Navigator>
   );
};
