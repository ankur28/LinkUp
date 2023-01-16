
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChat from './screens/AddChat';
import ChatScreen from './screens/ChatScreen';
import About from './screens/About';

const Stack = createNativeStackNavigator()

const globalOptions = {
  headerStyle: {backgroundColor:'#E63946'},
  headerTitleStyle: { color: 'white' },
  headerTintColor:  'white' 
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalOptions}>
        <Stack.Screen name='Login' component={LoginScreen}  />
        <Stack.Screen name='Register' component={RegisterScreen}  />
        <Stack.Screen name='Home' component={HomeScreen}  />
        <Stack.Screen name='AddChat' component={AddChat}  />
        <Stack.Screen name='Chat' component={ChatScreen}  />
        <Stack.Screen name='About' component={About}  />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}


