// Importing package modules.
import React, { Component } from "react";
import { connect } from 'react-redux';

import {
	ScrollView,
	View,
	TouchableOpacity,
	AsyncStorage,
	StyleSheet
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

import styles from "./styles";

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
			<View style={[styles.container, styles.navSectionStyle]}>
				<View>
					<View style={{paddingVertical: paddingHelpers.S, backgroundColor: colors.brandSecondary }}/>
					<ScrollView style={{paddingTop:paddingHelpers.N}}>
						<List>
							<ListItem style={ListStyles.listItemDarkBorder}>
								<Body style={{flexGrow: 2}}>
									<View style={[styles.navSectionStyle, {paddingLeft: 0}]}>
										<Text style={[{paddingLeft: 0, marginLeft: 0, marginRight: 0, color: colors.brandBlack, fontSize: 18, fontWeight: '900'}]}>
											{ this.props.company ? this.props.company.name : 'Familia no disponible' }
										</Text>
									</View>
								</Body>
								<Right style={{flexGrow: 1}}>
									<TouchableOpacity style={{ backgroundColor: colors.brandGold, borderRadius: 3, padding: 5 }} onPress={() => this.changeToDashboard()}>
										<Text style={{color:'#fff', fontSize: 13, fontWeight: '900'}}t>Change</Text>
									</TouchableOpacity>
								</Right>
							</ListItem>
							<ListItem style={ListStyles.listItemDarkBorder} onPress={() => this.changeScreen('dashboard')}>
								<View style={{ width: 30, alignItems: 'center' }}>
									<Icon type={'MaterialIcons'} name={'dashboard'} style={{ fontSize: 22 }} />
								</View>
								<Body>
									<View style={styles.navSectionStyle}>
										<Text style={styles.navItemStyle}>
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
									<View style={styles.navSectionStyle}>
										<Text style={styles.navItemStyle}>
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
									<View style={styles.navSectionStyle}>
										<Text style={styles.navItemStyle}>
											Settings
										</Text>
									</View>
								</Body>
							</ListItem>
						</List>
						<View style={{ marginTop: paddingHelpers.XL3 }}>
							<List>
								<ListItem style={ListStyles.listItemNoBorder}>
									<Body>
										<View style={[styles.navSectionStyle, {paddingLeft: 0}]}>
											<TouchableOpacity onPress={() => this.logOut()}>
												<Text style={{paddingLeft: 0, marginLeft: 0, marginRight: 0,}}>
													Log Out
												</Text>
											</TouchableOpacity>
										</View>
									</Body>
									<Right>
										<Icon onPress={() => this.logOut()} type={'MaterialCommunityIcons'} name={'logout-variant'} style={{color: colors.brandBlack}}/>
									</Right>
								</ListItem>
							</List>
						</View>
					</ScrollView>
				</View>
				<View style = {[ styles.footerContainer, localStyles.footer ]}/>
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