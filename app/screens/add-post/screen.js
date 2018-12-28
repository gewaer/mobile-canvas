// Importing package modules.
import React, { Component } from 'react';

import {
    View,
    Image,
    AsyncStorage,
    Platform,
    TouchableOpacity,
    BackHandler,
    Alert
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
import MulticolorBar from '../../components/multicolor-bar/';
import AddFileButton from '../../components/add-file-button';

const axios = require('../../config/axios');

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
            pickerSelection: undefined,
            title: undefined,
            content: undefined
        };
    }

    onValueChange(value) {
        this.setState({
            pickerSelection: value
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

    createPost = () => {
        if (this.state.title && this.state.content && this.state.pickerSelection+1) {
            const data = new FormData();
            data.append('CondoId', this.props.currentCondo.CondoId);
            data.append('SectId', this.props.sections[this.state.pickerSelection+1].SectId);
            data.append('BlogTitle', this.state.title);
            data.append('BlogText', this.state.content);

            axios({
            url: `/blogs`,
            method: "POST",
            data
            }).then(() => {
                this.setState({ title: '', content: ''})
                Alert.alert(
                    "Crear Post",
                    "El post se ha creado exitosamente.", [
                        {
                            text: "OK",
                        }
                    ], {
                        cancelable: false
                    }
                );
            }).catch((error) => {
                Alert.alert(
                    "Crear Post",
                    "Se ha producido un error, no se se ha creado el post.", [
                        {
                            text: "OK",
                        }
                    ], {
                        cancelable: false
                    }
                );
            })
        } else {
            Alert.alert(
                "Campos requeridos",
                "No debe dejar campos vacíos", [
                    {
                        text: "OK",
                    }
                ], {
                    cancelable: false
                }
            );
        }
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
    
    sectionItems() {
        return this.props.sections.filter(section => section.SectCode).map((section, index) => {
            return(
                <Picker.Item
                    key={ index }
                    value={ index }
                    label={ section.SectName }
                />
            );
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
                                    <Text style={ Stylesheet.titleText }>Agregar Post</Text>
                                    <View style={ Stylesheet.divisionLine }></View>
                                    <View style={Stylesheet.containerView}>
                                        <Form>
                                            <Text style={ Stylesheet.labelText }>Sección del blog:</Text>
                                            <Item picker style={ Stylesheet.formItem }>
                                                <Picker
                                                    textStyle={{ fontSize: 12 }}
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                    style={{ width: 350 }}
                                                    placeholder="Selecciona una sección..."
                                                    placeholderStyle={{ color: colors.brandLightGray, fontSize: 12 }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={this.state.pickerSelection}
                                                    onValueChange={(itemValue) => this.onValueChange(itemValue)}
                                                >
                                                    {
                                                        this.sectionItems()
                                                    }
                                                </Picker>
                                            </Item>
                                            <Text style={ Stylesheet.labelText }>Título:</Text>
                                            <Input
                                                value={ this.state.title }
                                                placeholderTextColor={ colors.brandLightGray }
                                                style={ [Stylesheet.formInput, { height: 29.5 }] }
                                                placeholder="Escribe el título..."
                                                onChangeText={(title) => this.setState({ title: title })}
                                            />
                                            <Text style={ Stylesheet.labelText }>Contenido:</Text>
                                            <Input
                                                value={ this.state.content }
                                                placeholderTextColor={ colors.brandLightGray }
                                                style={ [Stylesheet.formInput, { height: 142.5 }] }
                                                multiline={ true } placeholder="Agrega contenido..."
                                                onChangeText={(content) => this.setState({ content: content })}
                                            />                                   
                                        </Form>
                                        <Text style={ [Stylesheet.labelText, { marginBottom: 8 }] }>Adjuntar imagen o archivo:</Text>
                                        <AddFileButton/>
                                    </View>
                                    <View style={ Stylesheet.divisionLine }></View>
                                    <Button
                                        block
                                        primary
                                        onPress={() => { this.createPost() }}
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
        user: state.session.user,
        sections: state.session.sections
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