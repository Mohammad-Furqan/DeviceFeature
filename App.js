import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor:Colors.primary500},
          headerTintColor:Colors.gray700,
          contentStyle:{backgroundColor:Colors.gray700},  
        }}>
          <Stack.Screen 
            name="AllPlaces" 
            component={AllPlaces} 
            options={({navigation})=>({
              title:'Your Favorite Places',
              headerRight:({tintColor})=>(
                <IconButton 
                    icon='add' 
                    color={tintColor} 
                    size={24}
                    onPress={()=>navigation.navigate('AddPlace')} />)
                })
          }/>
          <Stack.Screen name="AddPlace" component={AddPlace} options={{
            title:'Add a new place',
          }} />
          <Stack.Screen name='Map' component={Map}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


