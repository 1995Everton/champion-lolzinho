import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './pages/list';
import Details from './pages/details';
import Skins from './pages/skins';

const Stack = createStackNavigator();

export default class Routes extends React.Component {
    render(){
        return (
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="Details" component={Details} />
                <Stack.Screen name="Skins" component={Skins} />
              </Stack.Navigator>
            </NavigationContainer>
          );
    }
}
