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
import ExpandButton from '../../components/expand-button';

const axios = require('../../config/axios');

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

/*
	Screen Name: Login. 
	Description: This screen is used to let the user log in with his/her email or with social options.
*/
class Bills extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            pickerSelection: null,
            title: '',
            content: '',
            isDebtsExpanded: false,
            isPaySummExpanded: false
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
                                    <View style={ Stylesheet.divisionLine }></View>
                                    <View style={Stylesheet.containerView}>
                                        <Form>
                                            <Text style={ Stylesheet.labelText }>Consultar estado de cuenta de:</Text>
                                            <Item picker style={ Stylesheet.formItem }>
                                                <Picker
                                                    textStyle={{ fontSize: 12 }}
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                    style={{ width: 350 }}
                                                    placeholder="Selecciona una vivienda..."
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
                                        </Form>
                                    </View>
                                    <View style={ Stylesheet.divisionLine }></View>
                                    <ExpandButton
                                        isExpanded={ this.state.isDebtsExpanded }
                                        text={ 'Adeudos Pendientes' }
                                        color={ colors.brandRed }
                                        onPress={ () => {this.setState({ isDebtsExpanded: !this.state.isDebtsExpanded })} }
                                        style={{ marginTop: 16 }}
                                    />
                                    <ExpandButton
                                        isExpanded={ this.state.isPaySummExpanded }
                                        text={ 'Resumen de Pagos' }
                                        color={ '#68B143' }
                                        onPress={ () => {this.setState({ isPaySummExpanded: !this.state.isPaySummExpanded })} }
                                        style={{ marginTop: 16 }}
                                    />

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
})(Bills);