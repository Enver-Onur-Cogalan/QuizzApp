import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './screens/HomeScreen';
import QuizzScreen from './screens/QuizzScreen';
import ResultScreen from './screens/ResultScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Quizz.app' }} />
        <Stack.Screen name="Quiz" component={QuizzScreen} options={{ title: 'Quiz' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Success' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}