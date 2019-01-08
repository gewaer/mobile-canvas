// Importing package modules.
import React, { Component } from "react";

import {
	View
} from "react-native";

import {
	Icon,
	Text,
} from "native-base";

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
			<View style={ [containerStyle, { flexDirection: 'row', justifyContent: 'flex-end' }] }>
				<Text style={ Stylesheet.count }>{ count }</Text>
				<Icon type={ iconType } name={ iconName } style={ [Stylesheet.count, iconStyle] } />
			</View>
		);
	}
}

export default ItemCount;