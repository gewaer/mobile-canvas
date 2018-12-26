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
		colors: ['#68B143', '#E8523F', '#00A1B4', '#F49B48'],
		source: null,
		title: 'Bienvenido(a) a Itera Intranet',
		subTitle: '20 nov. 2018 a las 11:00 AM',
		content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna...',
		isSelected: false,
		imagesCount: 1,
		commentsCount: 0,
		atchCount: 1
	} 
	
	render() {
		const {
			colors,
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
						<Icon type={'Ionicons'} name={'ios-contact'} style={ { color: '#B5B5B5',  fontSize: 48, marginRight: 12, marginBottom: -9} } /> 
					}
					<View style={ { justifyContent: 'center' } }>
						<Text style={ Stylesheet.title }>{ this.props.title }</Text>
						<Text style={ Stylesheet.subTitle }>{ this.props.subTitle }</Text>
					</View>
				</View>
				<Text numberOfLines={ 2 } style={ Stylesheet.content }>{ this.props.content }</Text>
				<View style={ { flexDirection: 'row', justifyContent: 'flex-end' } }>
					<ItemCount count={ this.props.imagesCount } iconType={ 'Ionicons' } iconName={ 'md-image' }/>
					<ItemCount count={ this.props.commentsCount } iconType={ 'MaterialIcons' } iconName={ 'chat-bubble' } iconStyle={ { transform: [{ rotateY:'180deg' }] } } containerStyle={ {marginLeft: 5} }/>
					<ItemCount count={ this.props.atchCount } iconType={ 'MaterialCommunityIcons' } iconName={ 'paperclip' } containerStyle={ {marginLeft: 5} }/>
				</View>
			</TouchableOpacity>
			
		);
	}
}

export default PostRow;