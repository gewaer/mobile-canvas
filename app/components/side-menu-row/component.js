// Importing package modules.
import React, { Component } from "react";

import {
	View,
	TouchableOpacity,
} from "react-native";

import {
	Icon,
	Text
} from "native-base";

import {
	colors
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
			shouldShowArrow,
			onPress
		} = this.props;

		return (
			<TouchableOpacity style={ Stylesheet.itemContainer } onPress={ onPress }>
				<View style={ Stylesheet.leftContainer }>
					<Icon type={ iconType } name={ iconName } style={{ fontSize: 22, color: colors.brandRed }} />
				</View>
				<View style={Stylesheet.bodyContainer}>
					<Text style={Stylesheet.text}>
						{ title }
					</Text>
				</View>
				{ shouldShowArrow &&
					<View style={ Stylesheet.rightContainer }>
						<Icon type={'Ionicons'} name={'ios-arrow-forward'} style={{ color: colors.brandLightGray, fontSize: 22 }} />
					</View>
				}
			</TouchableOpacity>
		);
	}
}

export default SideMenuRow;