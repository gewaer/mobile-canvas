// Importing package modules.
import React, { Component } from "react";

import {
	View,
	Image,
	TouchableOpacity
} from "react-native";

import {
	Icon,
} from "native-base";

import Stylesheet from "./stylesheet";

import {
    colors,
} from "../../config/styles";

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
					<TouchableOpacity onPress={ onPress } style={ { position: 'absolute', alignSelf: 'flex-end',  } }>
						<Icon type="FontAwesome" name="close"  style={ { color: 'gray', fontSize: 16, marginVertical: -2, marginTop: -10, paddingTop: 2, marginRight: -5 } }></Icon>
					</TouchableOpacity>
				</View>
				:
				<View style={ [ style, { backgroundColor: '#00A1B4' } ] }>
					<View style={ Stylesheet.container }>
						<Icon type="Ionicons" name="ios-document"  style={ Stylesheet.icon }/>
					</View>
					<TouchableOpacity onPress={ onPress } style={ { position: 'absolute', alignSelf: 'flex-end',  } }>
						<Icon type="FontAwesome" name="close"  style={ { color: 'gray', fontSize: 16, marginVertical: -2, marginTop: -10, paddingTop: 2, marginRight: -5 } }></Icon>
					</TouchableOpacity>
				</View>
				
		);
	}
}

export default FilePlaceholder;