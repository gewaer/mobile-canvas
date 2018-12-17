// Importing package modules.
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Linking,
    Image,
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
    Toast,
    List,
    ListItem,
    Body,
    Left,
    Right,
    Picker
} from "native-base";

import { connect } from 'react-redux';
import * as axios from 'axios'

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
import MulticolorBar from '../../components/multicolor-bar/'
import RadioRow from '../../components/radio-row'

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

/*
	Screen Name: Login. 
	Description: This screen is used to let the user log in with his/her email or with social options.
*/
class Reports extends Component {
    
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
            pickerSelection1: undefined,
            pickerSelection2: undefined
        };
    }

    onValueChange1(value) {
        this.setState({
            pickerSelection1: value
        });
    }

    onValueChange2(value) {
        this.setState({
            pickerSelection2: value
        });
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
                    <TouchableOpacity transparent onPress={() => this.pushScreen('dac.Welcome')}>
                        <Icon type={'Ionicons'} name={'ios-menu'} style={{ color: 'white', width: 22 }} />
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
                    <Title>
                        <Text style={[Stylesheet.titleBarContent, { fontSize: 20 }]}>
                            Reportes
                        </Text>
                    </Title>
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
                text: 'Email and password are required!',
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
        let formData = new FormData();
        formData.append('email', 'rogelio@mctekk.com');
        formData.append('password', 'nosenose');

        axios.post(`${VUE_APP_BASE_API_URL}/auth`, formData)
        .then((response) => {
            this.saveSessionData('sessionData', JSON.stringify(response.data));
            this.props.changeSessionToken({ token: response.data.token });
            //this.changeScreen('dashboard');
            this.getUserInfo(response.data.id, response.data.token);
        })
        .catch((error) => {
            console.log(error);
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
    getUserInfo(userId, token) {
        const data = {
            'Authorization': token,
        };
        axios.get(`${VUE_APP_BASE_API_URL}/users/${userId}`, { headers: data })
        .then((response) => {
            this.props.changeUser({ user: response.data });
            this.getUserDefaultCompany(response.data.default_company, token);
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
    getUserDefaultCompany(companyId, token) {
        const data = {
            'Authorization': token,
        };
        axios.get(`${VUE_APP_BASE_API_URL}/companies?q=(id:${companyId})`, { headers: data })
        .then((response) => {
            this.props.changeActiveCompany({ company: response.data[0] });
            this.changeScreen('dashboard');
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
                    <TitleBar noShadow left={this.titleBarLeft()} body={this.titleBarBody()} bgColor={colors.brandLightBlack} />
                    <MulticolorBar/>
                    <Content style={{ backgroundColor: colors.normalWhite }}>
                        {
                            this.state.isLoading ?
                                <Spinner color={colors.brandLightBlack} /> :
                                <View>
                                    <Text style={ Stylesheet.titleText }>¡Ayúdanos a mejorar!</Text>
                                    <View style={ Stylesheet.divisionLine }></View>
                                    <View style={Stylesheet.containerView}>
                                        <Form>
                                            <Text style={ Stylesheet.labelText }>Sección de la App:</Text>
                                            <Item picker style={ Stylesheet.formItem }>
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                    style={{ width: 350 }}
                                                    placeholder="Seleccionar..."
                                                    placeholderStyle={{ color: colors.brandLightGray, fontSize: 12 }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={this.state.pickerSelection1}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({pickerSelection1: itemValue})}
                                                >
                                                    <Picker.Item label="Wallet" value="key0" />
                                                    <Picker.Item label="ATM Card" value="key1" />
                                                    <Picker.Item label="Debit Card" value="key2" />
                                                    <Picker.Item label="Credit Card" value="key3" />
                                                    <Picker.Item label="Net Banking" value="key4" />
                                                </Picker>
                                            </Item>
                                            <Text style={ Stylesheet.labelText }>Tipo de reporte:</Text>
                                            <Item picker style={ Stylesheet.formItem }>
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                    style={{ width: 350 }}
                                                    placeholder="Seleccionar..."
                                                    placeholderStyle={{ color: colors.brandLightGray, fontSize: 12 }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={this.state.pickerSelection2}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({pickerSelection2: itemValue})}
                                                >
                                                    <Picker.Item label="Wallet" value="key0" />
                                                    <Picker.Item label="ATM Card" value="key1" />
                                                    <Picker.Item label="Debit Card" value="key2" />
                                                    <Picker.Item label="Credit Card" value="key3" />
                                                    <Picker.Item label="Net Banking" value="key4" />
                                                </Picker>
                                            </Item>
                                            <Text style={ Stylesheet.labelText }>Comentario:</Text>
                                            <Input placeholderTextColor={ colors.brandLightGray } style={ [Stylesheet.formInput, { fontSize: 12, paddingLeft: 16, paddingRight: 16 }] } multiline={ true } placeholder="Deja un comentario..." />                                   
                                        </Form>
                                    </View>
                                    <View style={ Stylesheet.divisionLine }></View>
                                    <Button
                                        block
                                        primary
                                        onPress={() => { console.log('button pressed') }}
                                        style={[Stylesheet.submitBtn, { marginTop: 20 }]}>
                                        <Text style={{ color: colors.normalWhite }}>
                                            Enviar reporte
                                        </Text>
                                        <Icon type="Ionicons"  name="ios-send"  color={colors.normalWhite} />
                                    </Button>
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
})(Reports);