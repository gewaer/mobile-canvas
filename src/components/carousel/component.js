// Importing package modules.
import React, { Component } from "react";
import {
	View,
  Image,
  Dimensions
} from "react-native";
import Stylesheet from "./stylesheet";
import { colors } from '@styles/colors';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getPercentage } from '../../utils/helpers';

const deviceWidth = Dimensions.get("window").width;
const itemWidth = getPercentage(deviceWidth, 80);
const imageHeight = itemWidth;

class MyCarousel extends Component {

	static defaultProps = {
    activeSlide: 0
  }

  _renderItem ({item, index}) {
    return (
      <View>
        <Image
          source={ item.uri }
          style={ {
            height: imageHeight,
            width: "100%",
            resizeMode: 'cover'
          } }
        />
      </View>
    );
  }

	render() {
		const {
      activeSlide,
      onSnapToItem,
      entries
		} = this.props;

		return (
      <View>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={ entries }
          renderItem={ this._renderItem }
          sliderWidth={ deviceWidth }
          itemWidth={ itemWidth }
          inactiveSlideOpacity={0.5}
          onSnapToItem={ onSnapToItem }
        />
        <Pagination
          dotsLength={ entries.length }
          activeDotIndex={ activeSlide }
          containerStyle={Stylesheet.paginationContainer}
          dotContainerStyle={Stylesheet.dotContainer}
          dotColor={colors.brandPrimary}
          dotStyle={Stylesheet.paginationDot}
          inactiveDotColor={colors.brandSecondary}
          inactiveDotOpacity={0.4}
          inactiveDotScale={1}
          carouselRef={this._carousel}
          tappableDots={!!this._carousel}
        />
      </View>
		);
	}
}

export default MyCarousel;
