import { NavigationContainer } from '@react-navigation/native';
// import PatientForm from './screens/PatientForm';
import TabNavigation from './screens/TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import RePatientForm from './screens/RePatientForm';
import WaitingInfo from './screens/WaitingInfo';
import NewPatientForm from './screens/NewPatientForm';
import StackNavigator from './screens/StackNavigator';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="RePatientForm" component={RePatientForm}/>
        <Stack.Screen name="NewPatientForm" component={NewPatientForm}/>
        <Stack.Screen name="WaitingInfo" component={WaitingInfo}/>
      </Stack.Navigator> */}
      <StackNavigator />
    </NavigationContainer>
  );
}