import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { CacheManager } from 'react-native-expo-image-cache';

import Unsplash from 'unsplash-js';
const unsplash = new Unsplash({ accessKey: "Nkc9FB5HQ4Y0toRQSkTHCSuORUuLJUP4zD5SUBP2f58" });

const HomeScreen = ({ navigation }) => {
  const [searchResults, setSearchResults] = useState([]);

  const updateImages = () => {
    unsplash.search.photos("cats", 3, 10, { orientation: "portrait" })
      .then(res => res.json())
      .then(data => setSearchResults(data.results))
  }

  useEffect(() => {
    updateImages();
    console.log("call api");
  }, []);


  return (
    <View style={{
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    }}>
      <Button onPress={() => navigation.navigate("RNImage", { searchResults })} title="RN Image" />
      <Button onPress={() => navigation.navigate("EXImage", { searchResults })} title="Expo Image Cache" />
      <Button onPress={() => navigation.navigate("FastImage", { searchResults })} title="Fast Image" />

      <View style={{ height: 40 }}></View>

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