import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Mypage from './Mypage';

export default function TabNavigation() {
   const Tab = createBottomTabNavigator();
   return (
      <Tab.Navigator>
         <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
         <Tab.Screen name='Mypage' component={Mypage} options={{ headerShown: false }} />
      </Tab.Navigator>
   )
}