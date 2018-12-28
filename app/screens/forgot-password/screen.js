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
    BackHandler,
    Alert
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
    Root,
    Toast,
    Icon
} from "native-base";
//import Icon from "react-native-vector-icons/FontAwesome"

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
    changeActiveCompany 
} from '../../actions/SessionActions';
import Stylesheet from './stylesheet';
import MulticolorBar from '../../components/multicolor-bar/index'

const axios = require('../../config/axios');

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
            isLoading: false,
            isLoginIn: false,
            email: ''
        };
    }

    // Handles Android's back button's action
    backAndroid() {
        this.pushScreen('dac.Welcome');
        return true
    }

    componentDidMount() {
        // Creates an event listener for Android's back button
        BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
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
                <View>
                    <TouchableOpacity transparent onPress={() => this.props.navigator.pop()}>
                        <Icon type={'MaterialIcons'} name={'chevron-left'} style={{ color: 'black', fontSize: 40 }} />
                    </TouchableOpacity>
                </View>
            )
        };
    }

    // Defines title bar's body content
    titleBarBody() {
        return {
            content: (
                <View>
                    {/* <Title>
                        <Text style={[Stylesheet.titleBarContent, { paddingLeft: platform === "ios" ? 0 : 10, fontSize: platform === "ios" ? 18 : 19.64 }]}>
                            Sign In
                        </Text>
                    </Title> */}
                </View>
            )
        };
    }

    // Process LogIn
    logIn() {
        if (this.state.username && this.state.password) {
            this.setState({ isLoginIn: true });
            let formData = new FormData();
            formData.append('email', this.state.username);
            formData.append('password', this.state.password);

            axios.post(`${VUE_APP_BASE_API_URL}/auth`, formData)
            .then((response) => {
                this.saveSessionData('sessionData', JSON.stringify(response.data));
                this.props.changeSessionToken({ token: response.data.token });
                this.getUserInfo(response.data.id, response.data.token);
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
                text: 'Ingrese el email.',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger'
            });
        }
    }

    sendEmail = () => {
        if (this.state.email) {
            const data = new FormData();
            data.append('email', this.state.email);
            console.log('send')
            axios({
            url: `/auth/forgot`,
            method: "POST",
            data
            }).then((response) => {
                console.log(response.data)
                Alert.alert(
                    "Recuperar contraseña",
                    "El email para recuperar la contraseña ha sido enviado.", [
                        {
                            text: "OK",
                        }
                    ], {
                        cancelable: false
                    }
                );
                this.setState({ email: '' })
            }).catch((error) => {
                console.log(error.response.data.errors.data.message)
                Alert.alert(
                    "Recuperar contraseña",
                    "Email inválido.", [
                        {
                            text: "OK",
                        }
                    ], {
                        cancelable: false
                    }
                );
            })
        } else {
            Toast.show({
                text: 'Ingrese el email.',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger'
            });
        }
    }

    render() {
        return (
            <Root>
                <Container style={{ backgroundColor: colors.normalWhite }}>
                    <TitleBar noShadow left={this.titleBarLeft()} body={this.titleBarBody()} />
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
                                <Spinner color={colors.brandWhite} /> :
                                <View>
                                    <View>
                                        <View style={Stylesheet.containerView}>
                                            <Form>
                                                <Item floatingLabel last style={[Stylesheet.formItem, { marginTop: 0 }]}>
                                                    <Label style={globalStyle.formLabel}>
                                                        Email
                                                    </Label>
                                                    <Input
                                                        value={ this.state.email }
                                                        onChangeText={(email) => this.setState({ email: email })}
                                                        style={globalStyle.formInput}
                                                        keyboardType={'email-address'} 
                                                        autoCapitalize={'none'}
                                                    />
                                                </Item>
                                                <Text style={ Stylesheet.underInputLabel }>Ingresa tu correo electrónico para recuperar la contraseña.</Text>
                                                <Button
                                                    block
                                                    primary
                                                    onPress={() => this.sendEmail()}
                                                    style={[Stylesheet.submitBtn, { marginTop: 30 }]}>
                                                    <Text style={{ color: colors.normalWhite }}>
                                                        Enviar
                                                    </Text>
                                                    <Icon type="Ionicons" name="ios-mail"  color={colors.normalWhite} />
                                                </Button>
                                            </Form>
                                            
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
    return {};
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
    changeActiveScreen, 
    changeSessionToken, 
    changeUser, 
    changeActiveCompany
})(Login);