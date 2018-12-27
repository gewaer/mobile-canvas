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
    BackHandler,
    FlatList,
    List
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
    ListItem,
    Body,
    Left,
    Right,
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
    changeCondos,
    changePosts
} from '../../actions/SessionActions';
import Stylesheet from './stylesheet';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import ImagePlaceholder from '../../components/image-placeholder';

const axios = require('../../config/axios')

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

/*
	Screen Name: Login. 
	Description: This screen is used to let the user log in with his/her email or with social options.
*/
class PostDetail extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    onValueChange(value) {
        this.setState({
            pickerSelection1: value
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

    componentWillUnmount() {
        BackHandler.removeEventListener();
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
                    <TouchableOpacity transparent onPress={() => this.changeScreen('dashboard')}>
                        <Icon type={'MaterialIcons'} name={'chevron-left'} style={{ color: 'black', fontSize: 40, marginHorizontal: -10 }} />
                    </TouchableOpacity>
                </View>
            )
        };
    }

    // Defines title bar's body content
    titleBarBody() {
        return {
            content: (
                <View style={[Stylesheet.titleBarContent, { width: '135%', flexDirection: 'row' }]}>
                    <Icon type={'Ionicons'} name={'ios-contact'} style={ { color: '#B5B5B5',  fontSize: 48, marginRight: 12, marginTop: -5} } /> 
                    <View style = { { justifyContent: 'center' } }>
                        <Text style={[Stylesheet.titleBarContent, { fontSize: 15 }]}>
                            { this.props.user.UserName }
                        </Text>
                        <Text style={[Stylesheet.titleBarContent, { fontSize: 10, color: colors.brandLightGray }]}>
                            { this.props.currentCondo && this.props.currentCondo.CondoName }
                        </Text>
                    </View>
                </View>
            )
        };
    }

    renderFooter = () => {
        if (!this.state.isLoadingFooter) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <Spinner color={colors.brandLightBlack} />
            </View>
        );
    };

    render() {
        return (
            <Root>
                <Container style={{ backgroundColor: colors.normalWhite }}>
                    <TitleBar noShadow left={this.titleBarLeft()} body={this.titleBarBody()} bgColor={colors.normalWhite} />
                    <Content style={{ backgroundColor: colors.normalWhite, borderTopWidth: 1, borderTopColor: '#241D1E' }}>
                        {
                            this.state.isLoading ?
                                <Spinner color={colors.brandLightBlack} /> :
                                <View>
                                    <View style={ Stylesheet.topContainer }>
                                        <View style={ Stylesheet.titleContainer }>
                                            <Text style={ Stylesheet.titleText }>ITERA - MEXICO, RECURSOS HUMANOS</Text>
                                            <Text style={ { fontSize: 14, color: colors.brandLightGray } }>Maria Esther Ramos Tafoya</Text>
                                        </View>
                                        <ImagePlaceholder/>
                                        <View style={ Stylesheet.descriptionContainer }>
                                            <Text style={ { fontSize: 12 } }>Lorem ipsum</Text>
                                        </View>
                                    </View>
                                    <View style={ Stylesheet.divisionLine }></View>
                                    <View style={ Stylesheet.commentRow }>
                                        <View style={ Stylesheet.commentRowTop }>
                                            <Icon type={'Ionicons'} name={'ios-chatboxes'} style={ { color: 'black',  fontSize: 20, marginRight: 12, marginBottom: -12} } />
                                            <Text style={ { fontWeight: 'bold',  fontSize: 14 } }>Comentarios:</Text>
                                        </View>
                                        <View style={ Stylesheet.commentRowBotom }>
                                            <Icon type={'Ionicons'} name={'ios-contact'} style={ { color: '#B5B5B5',  fontSize: 32, marginRight: 12, marginTop: -5, marginBottom: -10} } /> 
                                            <AutoGrowingTextInput
                                                placeholderTextColor={ colors.brandLightGray }
                                                style={ [Stylesheet.formInput, { fontSize: 12, paddingLeft: 16, paddingRight: 16, paddingBottom: 5, width: 266 }] }
                                                placeholder="Escribe un comentario..."
                                                multiline={ true }
                                            />
                                            <Button
                                            rounded
                                            primary
                                            onPress={() => { console.log('button pressed') }}
                                            style={ Stylesheet.submitBtn }>
                                                <Icon type="Ionicons"  name="ios-send"  color={colors.normalWhite} style={ { fontSize: 15, marginLeft: 0, marginRight: 0 } }/>
                                            </Button>
                                        </View>
                                    </View>
                                    <View style={ Stylesheet.divisionLine }></View>
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
        posts: state.session.posts
    };
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
    changeActiveScreen, 
    changeSessionToken, 
    changeUser, 
    changeCurrentCondo,
    changeCondos,
    changePosts
})(PostDetail);