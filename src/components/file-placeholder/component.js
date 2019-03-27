// Importing package modules.
import React, { Component } from "react";

import {
	View,
	Image,
	TouchableOpacity,
	Text
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
		isImage: false,
		icon: {
			extension: 'doc',
			icon: 'ios-document',
			iconType: 'Ionicons'
		},
		fileName: 'placeholder.doc'
    } 
	
	render() {
		const {
			onRemovePress,
			onPress,
			isImage,
			style,
			source,
			displayRemove,
			icon,
			fileName
		} = this.props;

		return (
			isImage ? 
				<TouchableOpacity style={ [style, Stylesheet.externalContainer] } onPress={ onPress }>
					<Image
						source={ { uri: source } }
						style={ Stylesheet.container }
					/>
					{	
						displayRemove &&
						<TouchableOpacity onPress={ onRemovePress } style={ { alignSelf: 'flex-end' } }>
							<Icon type="Ionicons" name="ios-remove-circle"  style={ { color: 'red', fontSize: 16, marginTop: -10, paddingTop: 2, marginRight: 5 } }></Icon>
						</TouchableOpacity>
					}
				</TouchableOpacity>
				:
				<TouchableOpacity style={ [ style, Stylesheet.externalContainer ] } onPress={ onPress }>
					<View style={ [{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00A1B4' }, Stylesheet.container] }>
						<Icon type={ icon.iconType } name={ icon.icon }  style={ Stylesheet.icon }/>
						<Text numberOfLines={ 1 } style={ { marginHorizontal: 2, color: 'white', fontSize: 10 } }>{ fileName }</Text>
					</View>
					{
						displayRemove &&
						<TouchableOpacity onPress={ onRemovePress } style={ { alignSelf: 'flex-end',  } }>
							<Icon type="Ionicons" name="ios-remove-circle"  style={ { color: 'red', fontSize: 16, marginTop: -10, paddingTop: 2, marginRight: 5 } }></Icon>
						</TouchableOpacity>
					}
				</TouchableOpacity>
				
		);
	}
}

export default FilePlaceholder;