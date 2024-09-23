import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Mypage from './Mypage';
import { Ionicons } from 'react-native-vector-icons';

export default function TabNavigation() {
   const Tab = createBottomTabNavigator();
   return (
      <Tab.Navigator
         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
               let iconName;
               if (route.name === '홈') {
                  iconName = focused ? 'home' : 'home-outline';
               } else if (route.name === '마이페이지') {
                  iconName = focused ? 'person' : 'person-outline';
               }
               return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#8198cc',
            tabBarInactiveTintColor: '#999999',
         })}>
         <Tab.Screen name='홈' component={Home} options={{ headerShown: false }} />
         <Tab.Screen name='마이페이지' component={Mypage} options={{ headerShown: false }} />
      </Tab.Navigator>
   )
}