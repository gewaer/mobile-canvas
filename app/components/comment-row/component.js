// Importing package modules.
import React, { Component } from "react";

import {
	View,
	TouchableOpacity,
	Image,
	Alert
} from "react-native";

import {
	Icon,
	Text
} from "native-base";

import {
	colors,
} from "../../config/styles";

import Stylesheet from "./stylesheet";
import { dateHourFormat } from "../../lib/helpers";
import {
	MenuProvider,
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger
  } from 'react-native-popup-menu';

class PostRow extends Component {

	static defaultProps = {
		source: null,
		group: 'ITERA - MEXICO',
		user: 'Maria Esther Ramos',
		shouldModifyComment: false
	} 
	
	render() {
		const {
			comment,
			onDeletePress,
			source,
			shouldModifyComment
		} = this.props;

		return (
			<MenuProvider >
					<Menu>
						<MenuTrigger style={ Stylesheet.itemContainer } triggerOnLongPress= { true }>
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
									<Text style={ [{ fontSize: 12, color: colors.brandLightGray }] }>{ dateHourFormat(comment.CmmtCreatedDate) }</Text>
									<Text style={ Stylesheet.content }>{ comment.CmmtText }</Text>
								</View>
							</View>
						</MenuTrigger>
						<MenuOptions >
							{ shouldModifyComment ?
								<View>
									{/* <MenuOption onSelect={() => Alert.alert(`Editar`)}>
										<Text style={{}}>Editar</Text>
									</MenuOption> */}
									<MenuOption onSelect={ onDeletePress } >
										<Text style={{color: 'red'}}>Eliminar</Text>
									</MenuOption>
								</View> :
								null
							}
							<MenuOption>
								<Text style={{}}>Cancelar</Text>
							</MenuOption>
						</MenuOptions>
					</Menu>
			</MenuProvider>
			
		);
	}
}

export default PostRow;