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
    changeCondos,
    changeIsAdmin
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
class Condominios extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    // Handles Android's back button's action
    backAndroid() {
        this.pushScreen('dac.Welcome');
        return true
    }

    componentDidMount() {
        this.validateCondos();
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

    // Defines title bar's body content
    titleBarBody() {
        return {
            content: (
                <View>
                    <Title>
                        <Text style={[Stylesheet.titleBarContent, { fontSize: 20 }]}>
                            Mis Condominios
                        </Text>
                    </Title>
                </View>
            )
        };
    }

    validateCondos(){
        if(this.props.condos.length == 1 && !this.props.currentCondo.CondoName){
            this.setCurrentCondo(this.props.condos[0])
        }
    }

    setCurrentCondo(condo){
        if(this.props.currentCondo != condo){
            this.props.changeCurrentCondo({ currentCondo: condo });
            if(condo.CondoAdminId == this.props.user.UserId){
                this.props.changeIsAdmin({ isAdmin: true })
            } else {
                this.props.changeIsAdmin({ isAdmin: false })
            }
        }
        this.changeScreen('dashboard');
    }

    render() {
        return (
            <Root>
                <Container style={{ backgroundColor: colors.normalWhite }}>
                    <TitleBar noShadow body={this.titleBarBody()} bgColor={colors.brandLightBlack} />
                    <MulticolorBar/>
                    <Content style={{ backgroundColor: colors.normalWhite }}>
                        {
                            this.state.isLoading ?
                                <Spinner color={colors.brandLightBlack} /> :
                                <View style={Stylesheet.containerView}>
                                    { this.props.condos && this.props.condos.map((condo, index) => {
                                        return(
                                            <RadioRow
                                                key={index}
                                                isSelected={ this.props.currentCondo.CondoId == condo.CondoId }
                                                title={ condo.CondoName }
                                                subTitle={ this.props.user.UserName }
                                                onPress={ () => { this.setCurrentCondo(condo) } }
                                                source={ condo.rutalogo }
                                            />
                                        );
                                        })
                                    }
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
    changeCondos,
    changeIsAdmin
})(Condominios);