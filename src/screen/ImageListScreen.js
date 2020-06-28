import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import Unsplash from 'unsplash-js';
import { Image as ExpoImageCache } from "react-native-expo-image-cache";

const unsplash = new Unsplash({ accessKey: "Nkc9FB5HQ4Y0toRQSkTHCSuORUuLJUP4zD5SUBP2f58" });


const ImageListScreen = ({ navigation, route }) => {
  const [searchResults, setSearchResults] = useState([]);

  const updateImages = () => {
    unsplash.search.photos("cats", 3, 10, { orientation: "portrait" })
      .then(res => res.json())
      .then(data => setSearchResults(data.results))
  }

  useEffect(() => {
    updateImages();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {searchResults && <FlatList
        data={searchResults}
        initialNumToRender={3}
        renderItem={(item) => {
          var urifull = item.item.urls.full;
          var urithumb = item.item.urls.thumb;

          return (
            <TouchableOpacity onPress={ () => {
              navigation.navigate("ImageView", {
                useExpoImageCache: route.params?.useExpoImageCache,
                item: {
                  width: item.item.width,
                  height: item.item.height,
                  urifull: urifull,
                  urithumb: urithumb,
                  alt_description: item.item.alt_description
                }
              })
            }}>
              {route.params?.useExpoImageCache
                ? <ExpoImageCache
                  style={{
                    width: "100%",
                    aspectRatio: item.item.height / item.item.width,
                  }}
                  uri={urifull}
                  // preview={urithumb}
                />
                : <Image
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
