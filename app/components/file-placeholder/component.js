// Importing package modules.
import React, { Component } from "react";

import {
	View,
	Image
} from "react-native";

import {
	Icon,
} from "native-base";

import Stylesheet from "./stylesheet";

class FilePlaceholder extends Component {

	static defaultProps = {
		isImage: false
    } 
	
	render() {
		const {
			onPress,
			isImage,
			style,
			source
		} = this.props;

		return (
			isImage ? 
				<View style={ style }>
					<Image
						source={ { uri: source } }
						style={ Stylesheet.container }
					/>
				</View>
				:
				<View style={ [ style, { backgroundColor: '#00A1B4' } ] }>
					<View style={ Stylesheet.container } onPress={ onPress }>
						<Icon type="Ionicons" name="ios-document"  style={ Stylesheet.icon }/>
					</View>
					<Icon type="MaterialCommunityIcons" name="close-circle-outline"  style={ { color: 'black', position: 'absolute', alignSelf: 'flex-end', marginVertical: -2, fontSize: 18, paddingRight: 1, paddingTop: 2 } }></Icon>
				</View>
				
		);
	}
}

export default FilePlaceholder;