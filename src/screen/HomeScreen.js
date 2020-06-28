import React from 'react';
import { View, Button, Alert } from 'react-native';
import { CacheManager } from 'react-native-expo-image-cache';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={{
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    }}>
      <Button onPress={() => navigation.navigate("RNImage")} title="RN Image" />
      <Button onPress={() => navigation.navigate("EXImage")} title="Expo Image Cache" />
      
      <View style={{height: 40}}></View>
      
      <Button onPress={async () => {
        await CacheManager.clearCache();
        Alert.alert("Cache Cleared");
      }} title="Clear Expo Image Cache" 
        color="red"
      />
    </View>
  )
};

export default HomeScreen;