// Importing package modules.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios'

import {
    StyleSheet,
    View,
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

// Importing local assets and components.
import {
    globalStyle,
    colors,
    paddingHelpers,
} from "../config/styles";

import TitleBar from '../components/TitleBar';
import { VUE_APP_BASE_API_URL } from '../config/env'

// Importing Redux's actions
import {
    changeActiveScreen,
    changeSessionToken,
    changeUser,
    changeActiveCompany 
} from '../actions/SessionActions';

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

/*
	Screen Name: Register. 
	Description: This screen is used to let the user create an account.
*/
class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            password: '',
            confirmPassword: '',
            email: '',
            family: '',
            isLoading: false
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
        //this.props.changeActiveScreen({ activeScreen });
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
        if (this.state.isLoading) {
            return {
                content: (
                    <View></View>
                )
            }
        }
        
        return {
            content: (
                <View>
                    <TouchableOpacity transparent onPress={() => this.pushScreen('dac.Welcome')}>
                        <Icon type={'MaterialIcons'} name={'chevron-left'} style={{ color: '#fff', fontSize: platform === "ios" ? 22 : 24 }} />
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
                        <Text style={[styles.titleBarContent, { paddingLeft: platform === "ios" ? 0 : 10, fontSize: platform === "ios" ? 18 : 19.64 }]}>
                            Sign Up
                        </Text>
                    </Title>
                </View>
            )
        };
    }

    // Checks if all required fields are filled
    canCreate() {
        return this.state.firstname &&
            this.state.lastname &&
            this.state.email &&
            this.state.password &&
            this.state.confirmPassword &&
            this.state.family;
    }

    // Handles user's account creation
    createUser() {
        // Displays an error notification if the password and confirm password fields are not equal
        if (this.state.password != this.state.confirmPassword) {
            Toast.show({
                text: `Passwords don't match!`,
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger'
            });
            this.setState({ isLoading: false });
            return;
        }

        // Displays an error notification if any of the required feilds is empty
        if (!this.canCreate()) {
            Toast.show({
                text: '¡Por favor, llene los campos vacíos!',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger'
            });
            this.setState({ isLoading: false });
            return;
        }

        this.setState({ isLoading: true });

        let data = {
            'firstname': this.state.firstname,
            'lastname': this.state.lastname,
            'email': this.state.email,
            'password': this.state.password,
            'default_company': this.state.family
        }

        axios.post(`${VUE_APP_BASE_API_URL}/users`, this.formatFormData(data))
        .then((response) => {
            this.saveSessionData('sessionData', JSON.stringify(response.data.session));
            this.props.changeSessionToken({ token: response.data.session.token });
            this.props.changeUser({ user: response.data.user });
            this.getUserDefaultCompany(response.data.user.default_company, response.data.session.token);
        })
        .catch((error) => {
            this.setState({ isLoading: false });
            Toast.show({
                text: error.response && error.response.data && error.response.data.status ? error.response.data.status.message : 'Error',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger'
            });
        });
    }

    // Formats the data that is going to be sent to the API
    formatFormData(data) {
        let formData = []
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formData.push(encodedKey + '=' + encodedValue);
        }
        formData = formData.join('&');
        return formData;
    }

    // Gets the user's default company.
    getUserDefaultCompany(companyId, token) {
        const data = {
            'Authorization': token,
        };
        axios.get(`${VUE_APP_BASE_API_URL}/companies?q=(id:${companyId})`, { headers: data })
        .then((response) => {
            this.props.changeActiveCompany({ company: response.data[0] });
            this.changeScreen('dashboard');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
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

    render() {
        return (
            <Root>
                <Container style={{ backgroundColor: colors.brandSecondary }}>
                    <TitleBar noShadow left={this.titleBarLeft()} body={this.titleBarBody()}/>
                    <Content style={{ backgroundColor: colors.brandSecondary }}>
                        <View>
                            <View>
                                <View>
                                    <View style={styles.containerView}>
                                        <Form>
                                            <Item floatingLabel last style={[styles.formItem, { marginTop: 0 }]}>
                                                <Label style={globalStyle.formLabel}>
                                                    Name
                                                </Label>
                                                <Input
                                                    value={this.state.firstname}
                                                    onChangeText={(firstname) => this.setState({ firstname })}
                                                    style={globalStyle.formInput}
                                                />
                                            </Item>
                                            <Item floatingLabel last style={[styles.formItem, { marginTop: 0 }]}>
                                                <Label style={globalStyle.formLabel}>
                                                    Lastname
                                                </Label>
                                                <Input
                                                    value={this.state.lastname}
                                                    onChangeText={(lastname) => this.setState({ lastname })}
                                                    style={globalStyle.formInput}
                                                />
                                            </Item>
                                            <Item floatingLabel last style={styles.formItem}>
                                                <Label style={globalStyle.formLabel}>
                                                    Email
                                                </Label>
                                                <Input
                                                    value={this.state.email}
                                                    onChangeText={(email) => this.setState({ email })}
                                                    style={globalStyle.formInput}
                                                    keyboardType={'email-address'} 
                                                    autoCapitalize={'none'}
                                                />
                                            </Item>
                                            <Item floatingLabel last style={styles.formItem} >
                                                <Label style={globalStyle.formLabel}>
                                                    Password
                                                </Label>
                                                <Input
                                                    value={this.state.password}
                                                    onChangeText={(password) => this.setState({ password })}
                                                    style={globalStyle.formInput}
                                                    secureTextEntry={true}
                                                    autoCapitalize={'none'}
                                                />
                                            </Item>
                                            <Item floatingLabel last style={styles.formItem} >
                                                <Label style={globalStyle.formLabel}>
                                                    Confirm Password
                                                </Label>
                                                <Input
                                                    value={this.state.confirmPassword}
                                                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                                    style={globalStyle.formInput}
                                                    secureTextEntry={true}
                                                    autoCapitalize={'none'}
                                                />
                                            </Item>
                                            <Item floatingLabel last style={styles.formItem} >
                                                <Label style={globalStyle.formLabel}>
                                                    Company
                                                </Label>
                                                <Input
                                                    value={this.state.family}
                                                    onChangeText={(family) => this.setState({ family })}
                                                    style={globalStyle.formInput}
                                                />
                                            </Item>
                                            { 
                                                // If the app is creating the user hide the register button and show a loading spinner
                                                this.state.isLoading ?
                                                    <Spinner color={colors.brandWhite} /> 
                                                :
                                                    <Button
                                                        block
                                                        bordered
                                                        primary
                                                        onPress={() => this.createUser()}
                                                        style={[styles.submitBtn, {marginTop: 30}]}>
                                                        <Text style={{ color: colors.brandWhite }}>
                                                            SIGN UP
                                                        </Text>
                                                    </Button>
                                            }
                                        </Form>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Content>
                </Container>
            </Root>
        );
    }
}

// Stylesheet
const styles = StyleSheet.create({
    submitBtn: {
        marginTop: paddingHelpers.S,
        marginBottom: paddingHelpers.S,
        borderColor: colors.brandWhite
    },
    formItem: {
        borderBottomWidth: 2,
        borderBottomColor: colors.brandWhite
    },
    titleBarContent: {
        color: "white",
        fontWeight: "600"
    },
    containerView: {
        marginTop: paddingHelpers.XS,
        marginBottom: paddingHelpers.XS,
        paddingHorizontal: paddingHelpers.N,
    }
});

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
})(Register);