// Importing package modules.
import React, { Component } from "react";

import {
	View,
	TouchableOpacity,
	Image
} from "react-native";

import {
	Icon,
	Text
} from "native-base";

import Stylesheet from "./stylesheet";

class RadioRow extends Component {

	static defaultProps = {
		source: null,
		title: 'Itera Intranet',
		subTitle: 'Sarai Ramirez Rodriguez',
		isSelected: false
    } 
	
	render() {
	
		const {
			title,
			subTitle,
			isSelected,
			source,
			onPress
		} = this.props;

		return (
			<TouchableOpacity style={ Stylesheet.itemContainer } onPress={ onPress }>
				{ source ?
				<Image
					source={ { uri: source } }
					style={ Stylesheet.thumbnail }
				/> :
				<View style={ [Stylesheet.thumbnail, { justifyContent: 'center', alignItems: 'center' }] }>
					<Icon type={'FontAwesome'} name={'building'} style={ { color: '#B5B5B5',  fontSize: 25} } /> 
				</View> }
				<View>
					<Text style={ Stylesheet.title }>{ title }</Text>
					<Text style={ Stylesheet.subTitle }>{ subTitle }</Text>
				</View>
				<View style={ Stylesheet.rightStyle }>
					{
						isSelected ? <Icon type={'Ionicons'} name={'ios-radio-button-on'} style={{ color: 'black', fontSize: 22 }} />
						: <Icon type={'Ionicons'} name={'ios-radio-button-off'} style={{ color: 'black', fontSize: 22 }} />
					}
				</View>
			</TouchableOpacity>
		);
	}
}

export default RadioRow;