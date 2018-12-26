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
			source
		} = this.props;

		return (
			<TouchableOpacity style={ Stylesheet.itemContainer } onPress={ this.props.onPress }>
				{ this.props.source ?
				<Image
					source={ { uri: this.props.source } }
					style={ Stylesheet.thumbnail }
				/> :
				<View style={ [Stylesheet.thumbnail, { justifyContent: 'center', alignItems: 'center' }] }>
					<Icon type={'FontAwesome'} name={'building'} style={ { color: '#B5B5B5',  fontSize: 25} } /> 
				</View> }
				<View>
					<Text style={ Stylesheet.title }>{ this.props.title }</Text>
					<Text style={ Stylesheet.subTitle }>{ this.props.subTitle }</Text>
				</View>
				<View style={ Stylesheet.rightStyle }>
					{
						this.props.isSelected ? <Icon type={'Ionicons'} name={'ios-radio-button-on'} style={{ color: 'black', fontSize: 22 }} />
						: <Icon type={'Ionicons'} name={'ios-radio-button-off'} style={{ color: 'black', fontSize: 22 }} />
					}
				</View>
			</TouchableOpacity>
		);
	}
}

export default RadioRow;