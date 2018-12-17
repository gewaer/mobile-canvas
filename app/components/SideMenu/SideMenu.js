// Importing package modules.
import React, { Component } from "react";
import { connect } from 'react-redux';

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

// Importing local assets and components.
import {
	ListStyles,
	paddingHelpers,
	colors,
} from "../../config/styles";

import Stylesheet from "./stylesheet";

// Importing Redux's actions
import { changeActiveScreen } from '../../actions/SessionActions';

/*
	Screen Name: SideMenu. 
	Description: Is declared as a screen but is used as a side menu component. This screen is used as a navigator.
*/
class SideMenu extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dropdownOpened: false
		};
	}

	// Changes the active screen using redux.
	changeScreen(activeScreen) {
		this.props.changeActiveScreen({ activeScreen });
	}

	// Changes to dashboard
	changeToDashboard = () => {
		this.props.navigator.switchToTab({ tabIndex: 1 }); 
		this.props.navigator.toggleDrawer({
			side: 'left',
			animated: true
		});
	}

	// Removes session data from the storage and changes to welcome scren
	async logOut() {
		try {
			AsyncStorage.removeItem('sessionData', () => {
			this.props.changeActiveScreen({ activeScreen: 'welcome' });
			})
		} catch (error) {
			console.error(error);
		}
	}
	
	render() {
		return (
			<View style={[Stylesheet.container, Stylesheet.navSectionStyle]}>
				<View>
					<View style={{paddingVertical: paddingHelpers.S, backgroundColor: colors.brandLightBlack }}/>
					<View style={[ Stylesheet.itemContainer, { backgroundColor: colors.brandLightBlack }]}>
						<Image
							source={require('../../assets/images/vivook/logo-vivook.png')}
							style={ Stylesheet.thumbnail }
						/>
						<View style={ { justifyContent: 'center' } }>
							<Text style={ Stylesheet.title }>Sarai Ramirez Rodriguez</Text>
							<Text style={ Stylesheet.subTitle }>Itera Intranet</Text>
						</View>
					</View>
					<ScrollView style={{paddingTop:paddingHelpers.XS}}>
						<List>
							<ListItem style={ListStyles.listItemDarkBorder} onPress={() => this.changeScreen('dashboard')}>
								<View style={{ width: 30, alignItems: 'center' }}>
									<Icon type={'MaterialIcons'} name={'dashboard'} style={{ fontSize: 22 }} />
								</View>
								<Body>
									<View style={Stylesheet.navSectionStyle}>
										<Text style={Stylesheet.navItemStyle}>
											Dashboard
										</Text>
									</View>
								</Body>
							</ListItem>
							<ListItem style={ListStyles.listItemDarkBorder} onPress={() => this.changeScreen('profile')}>
								<View style={{ width: 30, alignItems: 'center' }}>
									<Icon type={'FontAwesome'} name={'user'} style={{ fontSize: 22 }} />
								</View>
								<Body>
									<View style={Stylesheet.navSectionStyle}>
										<Text style={Stylesheet.navItemStyle}>
											My Profile
										</Text>
									</View>
								</Body>
							</ListItem>
							<ListItem style={ListStyles.listItemDarkBorder} onPress={() => this.changeScreen('settings')}>
								<View style={{ width: 30, alignItems: 'center' }}>
									<Icon type={'MaterialIcons'} name={'settings'} style={{ fontSize: 22 }} />
								</View>
								<Body>
									<View style={Stylesheet.navSectionStyle}>
										<Text style={Stylesheet.navItemStyle}>
											Settings
										</Text>
									</View>
								</Body>
							</ListItem>
						</List>
					</ScrollView>
				</View>
				<View style = {[ Stylesheet.footerContainer, localStyles.footer ]}/>
			</View>
		);
	}
}

// Stylesheet
const localStyles = StyleSheet.create({
	footer: {
		position: 'absolute',
		right: 0,
		left: 0,
		bottom: 0,
		zIndex: 1
	}
});

// Maps redux's state variables to this class' props
const mapStateToProps = state => {
	return {
		company: state.session.company
	};
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
	changeActiveScreen
})(SideMenu);