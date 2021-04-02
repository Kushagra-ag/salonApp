import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

export default function CarouselCardItem({ item, index }) {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={item.imgUrl }
        style={styles.image}
      />
      <Text style={styles.header}>{item.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 15,

    overflow: 'hidden'
  },
  image: {
    width: ITEM_WIDTH,
    height: 180,
  },
  header: {
    color: "#999",
    // fontSize: 28,
    // fontWeight: "bold",
    textAlign: 'center',
    paddingTop: 15
  }
})