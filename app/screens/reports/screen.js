// Importing package modules.
import React, { Component } from 'react';

import {
    View,
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
    Spinner,
    Icon,
    Root,
    Picker
} from "native-base";

import { connect } from 'react-redux';
import TitleBar from '../../components/TitleBar';
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
import MulticolorBar from '../../components/multicolor-bar/';
const axios = require('../../config/axios');

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
            error: null,
            isLoading: false,
            sectionSelection: null,
            typeSelection: null,
            types: [
                {
                    name: 'Mejora',
                    apiFormat: 'M'
                },
                {
                    name: 'Error',
                    apiFormat: 'E'
                }
            ],
            sections: [
                {
                    name: 'Blogs',
                    apiFormat: 'blogs'
                },
                {
                    name: 'Estado de cuenta',
                    apiFormat: 'cuenta'
                },
                {
                    name: 'Mi perfil',
                    apiFormat: 'perfil'
                }
            ]
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
                    <TouchableOpacity
                        transparent
                        onPress={() => {
                            this.props.navigator.pop();
                        }}
                    >
                        <Icon type={'MaterialIcons'} name={'chevron-left'} style={{ color: 'white', fontSize: 40, marginHorizontal: -10 }} />
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

    createReport = () => {
        let descripcion = this.state.content.trim();
        if (descripcion && this.state.sectionSelection && this.state.typeSelection) {
            const data = new FormData();
            data.append('CondoId', this.props.currentCondo.CondoId);
            data.append('tipo', this.state.types[this.state.typeSelection].apiFormat);
            data.append('seccion', this.state.sections[this.state.sectionSelection].apiFormat);
            data.append('descripcion', descripcion);

            axios({
                url: `/suggestions`,
                method: "POST",
                data
            }).then(() => {
                this.setState({ content: '' })
                Alert.alert(
                    "Crear Reporte",
                    "El reporte se ha creado exitosamente.", [
                        {
                            text: "OK",
                        }
                    ], {
                        cancelable: false
                    }
                );
            }).catch((error) => {
                Alert.alert(
                    "Crear Reporte",
                    "Se ha producido un error, no se se ha creado el reporte.", [
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
                                                    textStyle={{ fontSize: 12 }}
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                    style={{ width: 350 }}
                                                    placeholder="Seleccionar..."
                                                    placeholderStyle={{ color: colors.brandLightGray, fontSize: 12 }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={this.state.sectionSelection}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({sectionSelection: itemValue})}
                                                >
                                                    <Picker.Item label="Blogs" value="0" />
                                                    <Picker.Item label="Estado de cuenta" value="1" />
                                                    <Picker.Item label="Mi perfil" value="2" />
                                                </Picker>
                                            </Item>
                                            <Text style={ Stylesheet.labelText }>Tipo de reporte:</Text>
                                            <Item picker style={ Stylesheet.formItem }>
                                                <Picker
                                                    textStyle={{ fontSize: 12 }}
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                    style={{ width: 350 }}
                                                    placeholder="Seleccionar..."
                                                    placeholderStyle={{ color: colors.brandLightGray, fontSize: 12 }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={this.state.typeSelection}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({typeSelection: itemValue})}
                                                >
                                                    <Picker.Item label="Mejora" value="0" />
                                                    <Picker.Item label="Error" value="1" />
                                                </Picker>
                                            </Item>
                                            <Text style={ Stylesheet.labelText }>Comentario:</Text>
                                            <Input
                                                placeholderTextColor={ colors.brandLightGray }
                                                style={ [Stylesheet.formInput, { fontSize: 12, paddingLeft: 16, paddingRight: 16 }] }
                                                multiline={ true }
                                                placeholder="Deja un comentario..."
                                                value={ this.state.content }
                                                onChangeText={(content) => this.setState({ content: content })}
                                            />                                   
                                        </Form>
                                    </View>
                                    <View style={ Stylesheet.divisionLine }></View>
                                    <Button
                                        block
                                        primary
                                        onPress={() => { this.createReport() }}
                                        style={[Stylesheet.submitBtn, { marginTop: 20 }]}>
                                        <Text style={{ color: colors.normalWhite, paddingRight: 0, paddingLeft: 0 }}>
                                            Enviar reporte
                                        </Text>
                                        <Icon type="Ionicons"  name="ios-send"  color={colors.normalWhite} style={ { marginRight: 0, marginLeft: 10 } }/>
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
        currentCondo: state.session.currentCondo
    };
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
    changeActiveScreen, 
    changeSessionToken, 
    changeUser, 
    changeActiveCompany
})(Reports);