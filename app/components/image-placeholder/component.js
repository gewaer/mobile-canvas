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
		return (
			<TouchableOpacity style={ Stylesheet.container }>
				<Icon type="Ionicons" name="md-camera"  style={ Stylesheet.buttonIcon }/>
			</TouchableOpacity>
		);
	}
}

export default AddFileButton;