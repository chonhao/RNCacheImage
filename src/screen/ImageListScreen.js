import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import { Image as ExpoImageCache } from "react-native-expo-image-cache";
import FastImage from 'react-native-fast-image';


const ImageListScreen = ({ navigation, route }) => {
  var searchResults = route.params?.searchResults;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {searchResults && <FlatList
        data={searchResults}
        // initialNumToRender={1}
        renderItem={(item) => {
          var urifull = item.item.urls.full;
          var urithumb = item.item.urls.thumb;

          return (
            <TouchableOpacity onPress={() => {
              navigation.navigate("ImageView", {
                whichLibrary: route.params?.whichLibrary,
                item: {
                  width: item.item.width,
                  height: item.item.height,
                  urifull: urifull,
                  urithumb: urithumb,
                  alt_description: item.item.alt_description
                }
              })
            }}>
              {route.params?.whichLibrary === "EXPO" &&
                <ExpoImageCache
                  style={{
                    width: "100%",
                    aspectRatio: item.item.height / item.item.width,
                  }}
                  uri={urifull}
                  preview={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGD4DwABBAEAcCBlCwAAAABJRU5ErkJggg==" }}
                />
              }
              {route.params?.whichLibrary === "RN" && 
              <Image
                style={{
                  width: "100%",
                  aspectRatio: item.item.height / item.item.width,
                }}
                source={{ uri: urifull }}
              />}
              {route.params?.whichLibrary === "FAST" && 
              <FastImage
                style={{
                  width: "100%",
                  aspectRatio: item.item.height / item.item.width,
                }}
                source={{ uri: urifull }}
              />}
              <Text>{item.item.alt_description}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ImageListScreen;
