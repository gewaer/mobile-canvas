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
} from "native-base";

import {
	ListStyles,
	paddingHelpers,
	colors
} from "../../config/styles";

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
					<Icon type="Ionicons" name="ios-close"  style={ { color: 'white', position: 'absolute', alignSelf: 'flex-end', marginVertical: -6, fontSize: 23, paddingRight: 3, paddingTop: 3 } }></Icon>
				</View>
				
		);
	}
}

export default FilePlaceholder;