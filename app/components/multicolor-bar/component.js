// Importing package modules.
import React, { Component } from "react";

import {
	View
} from "react-native";

import Stylesheet from "./stylesheet";

class MulticolorBar extends Component {

	static defaultProps = {
        colors: ['#68B143', '#E8523F', '#00A1B4', '#F49B48']
    } 
	
	render() {
	
		const {
			colors
		} = this.props;

		return (
			<View style={ Stylesheet.container }>
				{ colors.map((color, index) => {
					return(
						<View key={ index } style={ [Stylesheet.singleBox, { backgroundColor: color }] }></View>
					);
				})}
			</View>
		);
	}
}

export default MulticolorBar;