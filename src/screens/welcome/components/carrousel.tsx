import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import Carousel from 'react-native-snap-carousel';

export default class Carrousel extends PureComponent {
  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  }

  render() {
    return (
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={this.state.entries}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    );
  }
}
