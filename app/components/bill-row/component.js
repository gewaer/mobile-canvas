// Importing package modules.
import React, { Component } from "react";

import {
	View,
	TouchableOpacity,
} from "react-native";

import {
	Text
} from "native-base";

import Stylesheet from "./stylesheet";

class BillRow extends Component {

	static defaultProps = {
		title: 'Unidades de consumo de gas. Nuevo adeudo.',
		subTitle: '20 nov. 2018 a las 11:00 AM'
	} 
	
	render() {
		const {
			title,
			subTitle,
			onPress
		} = this.props;

		return (
			<TouchableOpacity style={ Stylesheet.itemContainer } onPress={ onPress }>
				<View style={ { justifyContent: 'center' } }>
					<View style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
						<Text numberOfLines={ 1 } style={ Stylesheet.title }>{ title }</Text>
						<Text style={ Stylesheet.title }>$68,000.00</Text>
					</View>
					<Text style={ Stylesheet.subTitle }>{ subTitle }</Text>
				</View>
			</TouchableOpacity>
			
		);
	}
}

export default BillRow;