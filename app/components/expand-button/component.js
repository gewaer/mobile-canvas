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
			style
		} = this.props;

		return (
			<Button
				block
				onPress={ this.props.onPress }
				style={ [this.props.style, Stylesheet.submitBtn, this.props.isExpanded ? { borderWidth: 1, borderColor: this.props.color, backgroundColor: 'white'  } : { backgroundColor: this.props.color }] }>
				<Text style={{ color: this.props.isExpanded ? this.props.color : 'white', fontSize: 14 }}>
					{ this.props.text }
				</Text>
				<Icon style={{ fontSize: 20, color: this.props.isExpanded ? this.props.color : 'white' }} type="Ionicons" name={ this.props.isExpanded ? "ios-arrow-up-outline" : "ios-arrow-down-outline" }/>
			</Button>
		);
	}
}

export default ExpandButton;