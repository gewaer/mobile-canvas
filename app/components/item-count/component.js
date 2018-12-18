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

class ItemCount extends Component {

	static defaultProps = {
		iconType: 'Ionicons',
		iconName: 'md-image',
		count: 0,
		iconStyle: {},
		containerStyle: {}
	} 
	
	render() {
		const {
			iconType,
			iconName,
			count,
			iconStyle,
			containerStyle
		} = this.props;
		return (
			<View style={ [this.props.containerStyle, { flexDirection: 'row', justifyContent: 'flex-end' }] }>
				<Text style={ Stylesheet.count }>{ this.props.count }</Text>
				<Icon type={ this.props.iconType } name={ this.props.iconName } style={ [Stylesheet.count, this.props.iconStyle] } />
			</View>
		);
	}
}

export default ItemCount;