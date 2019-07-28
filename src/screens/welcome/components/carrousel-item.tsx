import React from 'react'
import { View, Text } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import { globalStyles } from '@styles/globalStyles';
import { ICarrouselItem } from '../types';

const CarrouselItem = ({ mediaSource, title, content }: ICarrouselItem) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={mediaSource} style={styles.image} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.centered,
    display: "none",
    width: 300,
    height: 300
  },
  imageContainer: {

  },
  image: {
    width: 105,
    height: 90
  },
  title: {

  },
  content: {

  }
})

CarrouselItem.defaultProps = {
  mediaSource: '',
  title: 'Feature #1',
  content: 'Lorem Ipsun'
}

export default CarrouselItem
