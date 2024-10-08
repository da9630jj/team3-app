import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigation';
import WaitingInfo from './WaitingInfo'; 
import NewPatientForm from './NewPatientForm';
import RePatientForm from './RePatientForm';
import LoginForm from './LoginForm';
import Mypage from './Mypage';
import Home from './Home';

const Stack = createStackNavigator();

export default function StackNavigator() {

   return (
      <Stack.Navigator initialRouteName="TabNavigator">
         <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
         <Stack.Screen name="Home" component={Home} options={{title: ''}} />
         <Stack.Screen name="RePatientForm" component={RePatientForm} options={{title: ''}} />
         <Stack.Screen name="NewPatientForm" component={NewPatientForm} options={{title: ''}} />
         <Stack.Screen name="WaitingInfo" component={WaitingInfo} options={{title: ''}} />
         <Stack.Screen name="Mypage" component={Mypage} options={{title: ''}} />
         <Stack.Screen name="LoginForm" component={LoginForm} options={{title: ''}} />
      </Stack.Navigator>
   );
};
