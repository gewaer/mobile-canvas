// Importing package modules.
import React, { Component } from "react";

import {
	View,
	TouchableOpacity,
	Image
} from "react-native";

import {
	Icon,
	Text
} from "native-base";

import {
	colors,
} from "../../config/styles";

import Stylesheet from "./stylesheet";
import { dateFormat } from "../../lib/helpers";

class PostRow extends Component {

	static defaultProps = {
		source: null,
		group: 'ITERA - MEXICO',
		user: 'Maria Esther Ramos',
	} 
	
	render() {
		const {
			comment,
			onPress,
			source
		} = this.props;

		return (
			<TouchableOpacity style={ Stylesheet.itemContainer } onPress={ onPress }>
				<View style={ Stylesheet.topContainer }>
					{ source ?
					<Image
						source={ { uri: source } }
						style={ Stylesheet.thumbnail }
					/> :
						<Icon type={'Ionicons'} name={'ios-contact'} style={ { color: '#B5B5B5',  fontSize: 32, marginRight: 12, marginTop: -5, marginBottom: -10} } />
					}
					<View style={ { maxWidth: '85%' } }>
						<Text style={ Stylesheet.title }>{ comment.user.UserName } - { this.props.group }</Text>
						<Text style={ [{ fontSize: 12, color: colors.brandLightGray }] }>{ dateFormat(comment.CmmtCreatedDate) }</Text>
						<Text style={ Stylesheet.content }>{ comment.CmmtText }</Text>
					</View>
				</View>
			</TouchableOpacity>
			
		);
	}
}

export default PostRow;