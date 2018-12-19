// Importing package modules.
import React, { Component } from 'react';

import {
    View,
    Image,
    AsyncStorage,
    Platform,
    TouchableOpacity,
    BackHandler
} from "react-native";

import {
    Button,
    Text,
    Content,
    Container,
    Form,
    Item,
    Input,
    Spinner,
    Icon,
    Root,
    Toast,
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
    changeCurrentCondo,
    changeCondos
} from '../../actions/SessionActions';
import Stylesheet from './stylesheet';
import MulticolorBar from '../../components/multicolor-bar/'
import AddFileButton from '../../components/add-file-button'

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

/*
	Screen Name: Login. 
	Description: This screen is used to let the user log in with his/her email or with social options.
*/
class AddPost extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
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
                    <TouchableOpacity transparent onPress={() => this.props.navigator.toggleDrawer({ side: 'left', animated: true, to: 'open' })}>
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
                <View style={[Stylesheet.titleBarContent, { width: '105%' }]}>
                    <Text style={[Stylesheet.titleBarContent, { fontSize: 20 }]}>
                        { this.props.user.UserName }
                    </Text>
                    <Text style={[Stylesheet.titleBarContent, { fontSize: 14 }]}>
                        { this.props.currentCondo && this.props.currentCondo.CondoName }
                    </Text>
                </View>
            )
        };
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
                                    <Text style={ Stylesheet.titleText }>Agregar Post</Text>
                                    <View style={ Stylesheet.divisionLine }></View>
                                    <View style={Stylesheet.containerView}>
                                        <Form>
                                            <Text style={ Stylesheet.labelText }>Sección del blog:</Text>
                                            <Item picker style={ Stylesheet.formItem }>
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                    style={{ width: 350 }}
                                                    placeholder="Selecciona una sección..."
                                                    placeholderStyle={{ color: colors.brandLightGray, fontSize: 12 }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={this.state.selected1}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({selected1: itemValue})}
                                                >
                                                    <Picker.Item label="Wallet" value="key0" />
                                                    <Picker.Item label="ATM Card" value="key1" />
                                                    <Picker.Item label="Debit Card" value="key2" />
                                                    <Picker.Item label="Credit Card" value="key3" />
                                                    <Picker.Item label="Net Banking" value="key4" />
                                                </Picker>
                                            </Item>
                                            <Text style={ Stylesheet.labelText }>Título:</Text>
                                            <Input placeholderTextColor={ colors.brandLightGray } style={ [Stylesheet.formInput, { height: 29.5 }] } placeholder="Escribe el título..." />
                                            <Text style={ Stylesheet.labelText }>Contenido:</Text>
                                            <Input placeholderTextColor={ colors.brandLightGray } style={ [Stylesheet.formInput, { height: 142.5 }] } multiline={ true } placeholder="Agrega contenido..." />                                   
                                        </Form>
                                        <Text style={ [Stylesheet.labelText, { marginBottom: 8 }] }>Adjuntar imagen o archivo:</Text>
                                        <AddFileButton/>
                                    </View>
                                    <View style={ Stylesheet.divisionLine }></View>
                                    <Button
                                        block
                                        primary
                                        onPress={() => { console.log('button pressed') }}
                                        style={[Stylesheet.submitBtn, { marginTop: 20 }]}>
                                        <Text style={{ color: colors.normalWhite, fontSize: 12, paddingRight: 10 }}>
                                            Crear
                                        </Text>
                                        <Icon type="Ionicons"  name="ios-add"  color={colors.normalWhite} style={ Stylesheet.buttonIcon }/>
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
    return {
        state: state,
        condos: state.session.condos,
        currentCondo: state.session.currentCondo,
        user: state.session.user
    };
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
    changeActiveScreen, 
    changeSessionToken, 
    changeUser, 
    changeCurrentCondo,
    changeCondos
})(AddPost);