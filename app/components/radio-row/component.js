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

class MulticolorBar extends Component {

	static defaultProps = {
		colors: ['#68B143', '#E8523F', '#00A1B4', '#F49B48'],
		source: require('../../assets/images/vivook/logo-vivook.png'),
		title: 'Itera Intranet',
		subTitle: 'Sarai Ramirez Rodriguez',
		isSelected: false
    } 
	
	render() {
	
		const {
			colors,
			title,
			subTitle,
			isSelected
		} = this.props;

		return (
			<View style={ Stylesheet.itemContainer } onPress={() => console.log("p")}>
				<Left style={{ maxWidth: 40 }}>
				<Image
					source={this.props.source}
					style={ Stylesheet.thumbnail }
				/>
					
				</Left>
				<Body>
				
					<View>
						<Text style={ Stylesheet.title }>{ this.props.title }</Text>
						<Text style={ Stylesheet.subTitle }>{ this.props.subTitle }</Text>
					</View>
				</Body>
				<Right>
					<TouchableOpacity onPress={() => { this.props.onPress }}>
						{
							this.props.isSelected ? <Icon type={'Ionicons'} name={'ios-radio-button-on'} style={{ color: 'black', fontSize: 22 }} />
							: <Icon type={'Ionicons'} name={'ios-radio-button-off'} style={{ color: 'black', fontSize: 22 }} />
						}
						
					</TouchableOpacity>
				</Right>
			</View>
		);
	}
}

export default MulticolorBar;