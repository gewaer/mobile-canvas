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
		source: require('../../assets/images/vivook/logo-vivook.png'),
		title: 'Bienvenido(a) a Itera Intranet',
		subTitle: '20 nov. 2018 a las 11:00 AM',
		content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna...',
		isSelected: false,
		intImage: 1,
		intMsg: 0,
		intClip: 1
	} 
	
	render() {
		const {
			colors,
			title,
			content,
			subTitle,
			isSelected,
			onPress,
			intImage,
			intMsg,
			intClip
		} = this.props;

		return (
			<TouchableOpacity style={ Stylesheet.itemContainer }>
				<View style={ Stylesheet.topContainer } onPress={() => console.log("p")}>
					<Image
						source={this.props.source}
						style={ Stylesheet.thumbnail }
					/>
					<View style={ { justifyContent: 'center' } }>
						<Text style={ Stylesheet.title }>{ this.props.title }</Text>
						<Text style={ Stylesheet.subTitle }>{ this.props.subTitle }</Text>
					</View>
				</View>
				<Text numberOfLines={ 2 } style={ Stylesheet.content }>{ this.props.content }</Text>
				<View style={ { flexDirection: 'row', justifyContent: 'flex-end' } }>
					<ItemCount count={ this.props.intImage } iconType={ 'Ionicons' } iconName={ 'md-image' }/>
					<ItemCount count={ this.props.intMsg } iconType={ 'MaterialIcons' } iconName={ 'chat-bubble' } iconStyle={ { transform: [{ rotateY:'180deg' }] } } containerStyle={ {marginLeft: 5} }/>
					<ItemCount count={ this.props.intClip } iconType={ 'MaterialCommunityIcons' } iconName={ 'paperclip' } containerStyle={ {marginLeft: 5} }/>
				</View>
			</TouchableOpacity>
			
		);
	}
}

export default PostRow;