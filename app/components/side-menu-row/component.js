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
	Left
} from "native-base";

import {
	ListStyles,
	paddingHelpers,
	colors,
} from "../../config/styles";

import Stylesheet from "./stylesheet";

class SideMenuRow extends Component {

	static defaultProps = {
		title: 'Inicio',
		iconType: 'Ionicons',
		iconName: 'ios-home',
		shouldShowArrow: true
    } 
	
	render() {
	
		const {
			title,
			iconType,
			iconName,
			shouldShowArrow
		} = this.props;

		return (
			<TouchableOpacity style={ Stylesheet.itemContainer } onPress={ this.props.onPress }>
				<View style={ Stylesheet.leftContainer }>
					<Icon type={ this.props.iconType } name={ this.props.iconName } style={{ fontSize: 22, color: colors.brandRed }} />
				</View>
				<View style={Stylesheet.bodyContainer}>
					<Text style={Stylesheet.text}>
						{ this.props.title }
					</Text>
				</View>
				{ this.props.shouldShowArrow &&
					<View style={ Stylesheet.rightContainer }>
						<Icon type={'Ionicons'} name={'ios-arrow-forward'} style={{ color: colors.brandLightGray, fontSize: 22 }} />
					</View>
				}
			</TouchableOpacity>
		);
	}
}

export default SideMenuRow;