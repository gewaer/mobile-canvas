// Importing package modules.
import React, { Component } from "react";

import {
	ScrollView,
	View,
	TouchableOpacity,
	AsyncStorage,
	StyleSheet,
	Image
} from "react-native";

import {
	Body,
	Icon,
	Text,
	ListItem,
	List,
	Right,
	Left,
	Button
} from "native-base";

import {
	ListStyles,
	paddingHelpers,
	colors,
} from "../../config/styles";

import Stylesheet from "./stylesheet";

class ExpandButton extends Component {

	static defaultProps = {
		text: 'Adeudos Pendientes',
		isExpanded: false,
		color: colors.brandRed
    } 
	
	render() {
	
		const {
			text,
			isExpanded,
			color,
			style,
			onPress,
			isDisabled
		} = this.props;

		return (
			<Button
				disabled = { isDisabled }
				block
				onPress={ onPress }
				style={ [style, Stylesheet.submitBtn, isExpanded ? { borderWidth: 1, borderColor: color, backgroundColor: 'white'  } : { backgroundColor: isDisabled ? colors.brandLightGray : color }] }>
				<Text style={{ color: isExpanded ? color : 'white', fontSize: 14 }}>
					{ text }
				</Text>
				<Icon style={{ fontSize: 20, color: isExpanded ? color : 'white' }} type="Ionicons" name={ isExpanded ? "ios-arrow-up-outline" : "ios-arrow-down-outline" }/>
			</Button>
		);
	}
}

export default ExpandButton;