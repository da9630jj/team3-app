import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigation';
import WaitingInfo from './WaitingInfo'; 
import NewPatientForm from './NewPatientForm';
import RePatientForm from './RePatientForm';

const Stack = createStackNavigator();

export default function StackNavigator() {
   return (
      <Stack.Navigator>
         <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
         <Stack.Screen name="RePatientForm" component={RePatientForm} options={{title: ''}} />
         <Stack.Screen name="NewPatientForm" component={NewPatientForm} options={{title: ''}} />
         <Stack.Screen name="WaitingInfo" component={WaitingInfo} options={{title: ''}} />
      </Stack.Navigator>
   );
};
