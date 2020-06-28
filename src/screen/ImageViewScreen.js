import React from 'react';
import { View, Image, Text } from 'react-native';

import { Image as ExpoImageCache } from "react-native-expo-image-cache";

const ImageViewScreen = ({ navigation, route }) => {
  var item = route.params?.item;
  var urifull = item.urifull;
  var urithumb = item.urithumb;
  var alt_description = item.alt_description;
  var width = item.width;
  var height = item.height;
  navigation.setOptions({title: alt_description});

  return (
    <View style={{
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    }}>
      {route.params?.useExpoImageCache
        ? <ExpoImageCache
          style={{
            width: "100%",
            aspectRatio: height / width,
          }}
          uri={urifull}
          preview={urithumb}
        />
        : <Image
          style={{
            width: "100%",
            aspectRatio: height / width,
          }}
          source={{ uri: urifull }}
        />}
        <Text>using {route.params?.useExpoImageCache ? "Expo Image Cache":"RN Image"}</Text>
    </View>
  )
}

export default ImageViewScreen;