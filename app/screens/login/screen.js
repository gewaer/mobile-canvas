// Importing package modules.
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    ImageBackground,
    Linking,
    AsyncStorage,
    Platform,
    TouchableOpacity,
    BackHandler
} from "react-native";

import {
    Button,
    Title,
    Text,
    Content,
    Container,
    Form,
    Item,
    Input,
    Label,
    Spinner,
    Icon,
    Root,
    Toast
} from "native-base";

import { connect } from 'react-redux';

// Importing local assets and components.
import { appImages } from "../../config/imagesRoutes";
import TitleBar from '../../components/TitleBar';
import { VUE_APP_BASE_API_URL, FORGOT_PASSWORD_URL } from '../../config/env'

import {
    globalStyle,
    colors,
    paddingHelpers,
} from "../../config/styles";

// Importing Redux's actions
import { 
    changeActiveScreen, 
    changeSessionToken, 
    changeUser, 
    changeCondos 
} from '../../actions/SessionActions';
import Stylesheet from './stylesheet';
import MulticolorBar from '../../components/multicolor-bar/index';

const axios = require('../../config/axios')

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

/*
	Screen Name: Login. 
	Description: This screen is used to let the user log in with his/her email or with social options.
*/
class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            emailError: '',
            passwordError: '',
            error: null,
            loggedIn: false,
            isLoading: true,
            isLoginIn: false
        };
    }

    // Handles Android's back button's action
    backAndroid() {
        this.pushScreen('dac.Welcome');
        return true
    }

    componentDidMount() {
        // Creates an event listener for Android's back button
        this.handleSessionData();
        BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
    }

    async handleSessionData() {
		let data = JSON.parse(await AsyncStorage.getItem('sessionData'));
		if (data && data.token && data.id) {
			// Sets session's token in redux state.
			this.props.changeSessionToken({ token: data.token });
			this.getUserInfo();
		} else {
			this.setState({ isLoading: false })
		}
	}

    // Changes the active screen using redux.
    changeScreen(activeScreen) {
        this.props.changeActiveScreen({ activeScreen });
    }

    // Pushes to another screen in the navigator stack.
    pushScreen(activeScreen) {
        this.props.navigator.push({
            screen: activeScreen,
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            },
        });
    }

    // Defines title bar's left content
    titleBarLeft() {
        return {
            content: (
                <View></View>
            )
        };
    }

    // Defines title bar's body content
    titleBarBody() {
        return {
            content: (
                <View></View>
            )
        };
    }

    // Process LogIn
    logIn() {
        if (this.state.username && this.state.password) {
            this.setState({ isLoginIn: true });
            axios({
                url: '/auth',
                method: "POST",
                data: {
                    email: this.state.username,
                    password: this.state.password
                },
                timeout: 5000
            })
            .then((response) => {
                this.saveSessionData('sessionData', JSON.stringify(response.data));
                this.props.changeSessionToken({ token: response.data.token });
                this.getUserInfo();
            })
            .catch((error) => {
                this.setState({ isLoginIn: false });
                Toast.show({
                    text: error.response.data.errors.message ? error.response.data.errors.message : 'Error',
                    buttonText: 'Ok',
                    duration: 3000,
                    type: 'danger'
                });
            });
        } else {
            Toast.show({
                text: 'Email y contraseña requeridos.',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger'
            });
        }
    }

    // Saves user's session data in the local storage.
    async saveSessionData(item, value) {
        try {
            await AsyncStorage.setItem(item, value);
            let data = JSON.parse(await AsyncStorage.getItem(item));
            if (data) {
                return data;
            }

        } catch (error) {
            console.log(error)
        }
    }

    // Logs user in dev mode
    logInDevMode() {
        this.setState({ isLoginIn: true });
        axios({
            url: '/auth',
            method: "POST",
            data: {
                email: 'rene.bravo@iteraprocess.com',
                password: '135'
            },
            timeout: 5000
        })
        .then((response) => {
            this.saveSessionData('sessionData', JSON.stringify(response.data));
            this.props.changeSessionToken({ token: response.data.token });
            this.getUserInfo();
        })
        .catch((error) => {
            console.log(error.response);
            this.setState({ isLoginIn: false });
            Toast.show({
                text: error.response.data.errors.message ? error.response.data.errors.message : 'Error',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger'
            });
        });
    }

    // Tries to get the user's information using the stored token.
	// If the response is an error then the token is expired and removes the session data.
    getUserInfo() {
        axios.get(`/users`)
        .then((response) => {
            this.props.changeUser({ user: response.data });
            this.getUserCondos();
        })
        .catch((error) => {
            this.setState({ isLoginIn: false });
            Toast.show({
                text: error.response.data.errors.message ? error.response.data.errors.message : 'Error',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger'
            });
        })
    }

    // Gets user's default company.
    getUserCondos() {
        axios.get(`/condos`)
        .then((response) => {
            this.props.changeCondos({ condos: response.data });
            this.changeScreen('condominiums');
        })
        .catch((error) => {
            this.setState({ isLoginIn: false });
            Toast.show({
                text: error.response.data.errors.message ? error.response.data.errors.message : 'Error',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger'
            });
        })
    }

    render() {
        return (
            <Root>
                <Container style={{ backgroundColor: colors.normalWhite }}>
                    <TitleBar noShadow left={this.titleBarLeft()} body={this.titleBarBody()} bgColor={colors.normalWhite} />
                    <View style={{alignItems: 'center'}}>
                        <ImageBackground
                            source={appImages.Logo.uri}
                            style={ [globalStyle.logoTag, { margin: 24 }] }
                            resizeMode='contain' 
                        />
                    </View>
                    <MulticolorBar/>
                    <Content style={{ backgroundColor: colors.normalWhite }}>
                        {
                            this.state.isLoading ?
                                <Spinner color={colors.brandOrange} /> :
                                <View>
                                    <View>
                                        <View style={Stylesheet.containerView}>
                                            <Form>
                                                <Item floatingLabel last style={[Stylesheet.formItem, { marginTop: 0 }]}>
                                                    <Label style={globalStyle.formLabel}>
                                                        Email
                                                    </Label>
                                                    <Input
                                                        onChangeText={(userName) => this.setState({ username: userName })}
                                                        style={globalStyle.formInput}
                                                        keyboardType={'email-address'} 
                                                        autoCapitalize={'none'}
                                                    />
                                                </Item>
                                                <Item floatingLabel last style={Stylesheet.formItem} >
                                                    <Label style={globalStyle.formLabel}>
                                                        Contraseña
                                                    </Label>
                                                    <Input
                                                        onChangeText={(password) => this.setState({ password: password })}
                                                        style={globalStyle.formInput}
                                                        secureTextEntry={true}
                                                        autoCapitalize={'none'}
                                                    />
                                                </Item>
                                                {
                                                    this.state.isLoginIn ?
                                                        <Spinner color={colors.brandOrange} />
                                                    :
                                                        <Button
                                                            block
                                                            bordered
                                                            primary
                                                            onPress={() => this.logIn()}
                                                            style={[Stylesheet.submitBtn, { marginTop: 30 }]}>
                                                            <Text style={{ color: colors.brandRed }}>
                                                                Iniciar Sesión
                                                            </Text>
                                                        </Button>
                                                }
                                                { __DEV__ && !this.state.isLoginIn &&
                                                    <Button
                                                        block
                                                        bordered
                                                        primary
                                                        style={Stylesheet.submitBtn}
                                                        onPress={() => this.logInDevMode()}>
                                                        <Text style={{ color: colors.brandRed }}>
                                                            Development Mode
                                                        </Text>
                                                    </Button>
                                                }
                                            </Form>
                                            <View style={ Stylesheet.divisionLine }></View>
                                            {
                                                !this.state.isLoginIn &&
                                                <View>
                                                    <Button transparent block>
                                                        <Text
                                                            style={Stylesheet.linkBTN}
                                                            onPress={() => this.pushScreen('vv.ForgotPassword')}>
                                                            ¿Olvidaste tu contraseña?
                                                    </Text>
                                                    </Button>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                    {/* <View style={Stylesheet.containerViewBack}>
                                        <View style={Stylesheet.textContainer}>
                                            <H3 style={[globalStyle.text, {color: colors.brandBlack}]}> OR SIGN IN WITH </H3>
                                        </View>
                                        <View style={Stylesheet.btnContainer}>
                                            <Button
                                                block
                                                style={Stylesheet.facebookBtn}
                                                onPress={() => this.logIn()}
                                            >
                                                <Text style={Stylesheet.facebookText}>
                                                    Facebook
                                                </Text>
                                            </Button>
                                            <Button
                                                block
                                                style={[Stylesheet.googleBtn, {marginTop: 20}]}
                                                onPress={() => this.signInWithGoogleAsync()}
                                            >
                                                <Text style={Stylesheet.googleText}>
                                                    Google+
                                                </Text>
                                            </Button>
                                        </View>
                                    </View> */}
                                </View>
                        }
                    </Content>
                </Container>
            </Root>
        );
    }
}

// Maps redux's state variables to this class' props
const mapStateToProps = state => {
    return {
        state: state
    };
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
    changeActiveScreen, 
    changeSessionToken, 
    changeUser, 
    changeCondos
})(Login);