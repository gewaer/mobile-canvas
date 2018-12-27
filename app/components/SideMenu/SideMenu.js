// Importing package modules.
import React, { Component } from "react";
import { connect } from 'react-redux';

import {
	ScrollView,
	View,
	AsyncStorage,
	StyleSheet,
	Image
} from "react-native";

import {
	Body,
	Icon,
	Text,
	ListItem,
	List
} from "native-base";

// Importing local assets and components.
import {
	ListStyles,
	paddingHelpers,
	colors,
} from "../../config/styles";

import SideMenuRow from "../side-menu-row"

import Stylesheet from "./stylesheet";

// Importing Redux's actions
import {
	changeActiveScreen, 
    changeSessionToken, 
    changeUser, 
    changeCurrentCondo,
    changeCondos
} from '../../actions/SessionActions';

import { appImages } from "../../config/imagesRoutes";

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

	switchTab(index) {
		this.props.navigator.switchToTab({ tabIndex: index }); 
		this.props.navigator.toggleDrawer({
			side: 'left',
			animated: true
		});
	}

	// Removes session data from the storage and changes to welcome scren
	async logOut() {
		try {
			AsyncStorage.removeItem('sessionData', () => {
			this.props.changeActiveScreen({ activeScreen: 'login' });
			this.props.changeCurrentCondo({ currentCondo: {} });
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
							<Text style={ Stylesheet.title }>{ this.props.user.UserName }</Text>
							<Text style={ Stylesheet.subTitle }>{ this.props.currentCondo && this.props.currentCondo.CondoName }</Text>
						</View>
					</View>
					<ScrollView style={{paddingTop:paddingHelpers.XS}}>
						<List>
							<SideMenuRow title={ 'Inicio' } iconType={ 'Ionicons' } iconName={ 'ios-home' } onPress={ () => { this.switchTab(0) } }/>
							<SideMenuRow title={ 'Blogs' } iconType={ 'Ionicons' } iconName={ 'ios-create' } onPress={ () => { this.switchTab(1) } }/>
							<SideMenuRow title={ 'Mis Condominios' } iconType={ 'FontAwesome' } iconName={ 'building' } onPress={ () => { this.changeScreen('condominiums') } }/>
							<SideMenuRow title={ 'Estado de Cuenta' } iconType={ 'Ionicons' } iconName={ 'logo-usd' } onPress={ () => { this.switchTab(2) } }/>
							<SideMenuRow title={ 'Notificaciones' } iconType={ 'Ionicons' } iconName={ 'md-notifications' } onPress={ () => { this.switchTab(3) } }/>
							<SideMenuRow title={ 'Perfil' } iconType={ 'Ionicons' } iconName={ 'ios-contact' } onPress={ () => { this.switchTab(0) } }/>
							<SideMenuRow title={ 'Reportes' } iconType={ 'Ionicons' } iconName={ 'ios-settings' } onPress={ () => { this.changeScreen('reports') } }/>
							{ this.props.isAdmin && <SideMenuRow title={ 'Panel de Administración' } iconType={ 'Ionicons' } iconName={ 'ios-briefcase' } onPress={ () => { this.switchTab(0) } }/>}
							<SideMenuRow title={ 'Salir' } iconType={ 'Ionicons' } iconName={ 'ios-log-out' } onPress={ () => { this.logOut() } } shouldShowArrow={ false }/>
						</List>
					</ScrollView>
				</View>
				<View style = { Stylesheet.footerContainer }>
					<Image
						source={appImages.LogoChar.uri}
						style={ { width: 115, height: 35 } }
						resizeMode='contain' 
					/>
				</View>
			</View>
		);
	}
}

// Maps redux's state variables to this class' props
const mapStateToProps = state => {
	return {
        state: state,
        condos: state.session.condos,
        currentCondo: state.session.currentCondo,
		user: state.session.user,
		isAdmin: state.session.isAdmin
    };
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
	changeActiveScreen, 
    changeSessionToken, 
    changeUser, 
    changeCurrentCondo,
    changeCondos
})(SideMenu);