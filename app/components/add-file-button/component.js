// Importing package modules.
import React, { Component } from "react";

import {
	TouchableOpacity
} from "react-native";

import {
	Icon,
} from "native-base";

import Stylesheet from "./stylesheet";

class AddFileButton extends Component {
	
	render() {
		const {
			onPress
		} = this.props;

		return (
			<TouchableOpacity style={ Stylesheet.container } onPress={ onPress }>
				<Icon type="Ionicons" name="ios-add"  style={ Stylesheet.buttonIcon }/>
			</TouchableOpacity>
		);
	}
}

export default AddFileButton;