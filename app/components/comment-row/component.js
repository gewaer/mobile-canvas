// Importing package modules.
import React, { Component } from "react";

import {
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
import ItemCount from "../item-count";

class PostRow extends Component {

	static defaultProps = {
		source: null,
		group: 'ITERA - MEXICO',
		user: 'Maria Esther Ramos',
		content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna...'
	} 
	
	render() {
		const {
			title,
			content,
			subTitle,
			isSelected,
			onPress,
			imagesCount,
			commentsCount,
			atchCount,
			source
		} = this.props;

		return (
			<TouchableOpacity style={ Stylesheet.itemContainer } onPress={ this.props.onPress }>
				<View style={ Stylesheet.topContainer }>
					{ this.props.source ?
					<Image
						source={ { uri: this.props.source } }
						style={ Stylesheet.thumbnail }
					/> :
						<Icon type={'Ionicons'} name={'ios-contact'} style={ { color: '#B5B5B5',  fontSize: 32, marginRight: 12, marginTop: -5, marginBottom: -10} } />
					}
					<View style={ { maxWidth: '85%' } }>
						<Text style={ Stylesheet.title }>{ this.props.group }, { this.props.user } </Text>
						<Text style={ Stylesheet.content }>{ this.props.content }</Text>
					</View>
				</View>
			</TouchableOpacity>
			
		);
	}
}

export default PostRow;