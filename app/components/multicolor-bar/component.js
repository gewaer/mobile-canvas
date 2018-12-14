// Importing package modules.
import React, { Component } from "react";

import {
	ScrollView,
	View,
	TouchableOpacity,
	AsyncStorage,
	StyleSheet
} from "react-native";

import {
	Body,
	Icon,
	Text,
	ListItem,
	List,
	Right,
} from "native-base";

import {
	ListStyles,
	paddingHelpers,
	colors,
} from "../../config/styles";

import Stylesheet from "./stylesheet";

class MulticolorBar extends Component {

	static defaultProps = {
        colors: ['#68B143', '#E8523F', '#00A1B4', '#F49B48']
    } 
	
	render() {
	
		const {
			colors
		} = this.props;

		return (
			<View style={ Stylesheet.container }>
				{ this.props.colors.map((color, index) => {
					return(
						<View key={ index } style={ [Stylesheet.singleBox, { backgroundColor: color }] }></View>
					);
				})}
			</View>
		);
	}
}

export default MulticolorBar;