import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ImageListScreen from './src/screen/ImageListScreen';
import ImageViewScreen from './src/screen/ImageViewScreen';
import HomeScreen from './src/screen/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Image Library Test" }}/>
        <Stack.Screen name="RNImage" component={ImageListScreen} options={{ title: "RN Image" }} initialParams={{ useExpoImageCache: false}} />
        <Stack.Screen name="EXImage" component={ImageListScreen} options={{ title: "Expo Image Cache" }} initialParams={{ useExpoImageCache: true}} />
        <Stack.Screen name="ImageView" component={ImageViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;