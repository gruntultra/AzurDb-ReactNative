import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/views/Home';
import Ship from './components/views/Ship';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Gear from './components/views/Gear';
import Settings from './components/views/Settings';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = ()  => {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen component={Main} options={{ headerShown: false}} name='Main' />
      <Stack.Screen component={Settings} options={{
        }} name='Settings'/>
      <Stack.Screen component={Home} options={{
            headerShown: false
          }} name='Home' />
      <Stack.Screen component={Ship} options={{
          headerShown: false
        }} name='Ship'/>
        <Stack.Screen component={Gear} options={{
          headerShown: false
        }} name='Gear'/>
    </Stack.Navigator>
  </NavigationContainer>
}

const Main = ({navigation}) => {

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <View style={{position: 'absolute', top: 10, right: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name='settings-outline' size={22} color="#000"/>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.textStyle}>Azur Lane Database</Text>
      </View>
      <Image style={{height:'70%', width: '90%', marginVertical: 20}} source={require('./assets/images/Enterprise.png')}/>
      <TouchableOpacity
      onPress={() => navigation.navigate('Home', {navigation: navigation})}
       style={{backgroundColor: '#4169E1', padding: 20, width: '90%', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style ={{fontSize: 15, color:'#fff', fontFamily: 'Roboto-MediumItalic'}}>Welcome Commander</Text>
        <Ionicons name='caret-forward-outline' size={22} color="#000"/>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex:1, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#20315F',
    fontFamily: 'Roboto-Bold'
  }
});

export default App;
