// Importing package modules.
import React, { Component } from 'react';

import {
    View,
    TouchableOpacity,
    BackHandler,
    Image
} from "react-native";

import {
    Text,
    Content,
    Container,
    Spinner,
    Icon,
    Root,
    Button
} from "native-base";

import { connect } from 'react-redux';
import TitleBar from '../../components/TitleBar';

import {
    globalStyle,
    colors,
    paddingHelpers,
} from "../../config/styles";
import Stylesheet from './stylesheet';
import MulticolorBar from '../../components/multicolor-bar/';

class Profile extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            //bill: this.props.params.bill,
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

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
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
                <View style={[{ width: '105%', alignItems: 'center' }]}>
                    <Text style={[Stylesheet.titleBarContent, { fontSize: 20 }]}>
                        Perfil
                    </Text>
                </View>
            )
        };
    }

    photoSection() {
        return(
            <View style={ Stylesheet.photoSection }>
                { this.props.user.appOptions && this.props.user.appOptions.foto ?
                    <Image
                        source={ { uri: this.props.user.appOptions.foto } }
                        style={ Stylesheet.profilePhoto }
                    /> :
                    <Icon type={'Ionicons'} name={'ios-contact'} style={ { color: '#B5B5B5',  fontSize: 180, alignSelf: 'center', marginBottom: -32, marginTop: -13 } } />
                }
                <Button
                    block
                    bordered
                    primary
                    onPress={() => console.log('button')}
                    style={[Stylesheet.button, { marginTop: 17 }]}>
                    <Icon type="Ionicons" name="ios-camera"  color={colors.normalWhite} style={ { marginLeft: 0, marginRight: 0, paddingTop: 0, color: colors.brandGreenDeep} } />
                    <Text style={{ color: colors.brandGreenDeep, paddingLeft: 8 }}>
                        Editar
                    </Text>
                </Button>
            </View>
        )
    }

    profileRow(label, content, color){
        return(
            <View>
                <View style={ Stylesheet.profileRowLabel }>
                    <Text style={ { fontSize: 12 } }>{ label }</Text>
                </View>
                <View style={ [Stylesheet.profileRowContent, { borderColor: color }] }>
                    <Text style={ { fontSize: 16 } }>{ content }</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <Root>
                <Container>
                    <TitleBar noShadow left={this.titleBarLeft()} body={this.titleBarBody()} bgColor={colors.brandLightBlack} />
                    <MulticolorBar/>
                    <Content style={{ backgroundColor: '#EEEEEE' }}>
                        {
                            this.state.isLoading ?
                                <Spinner color={colors.brandLightBlack} /> :
                                <View>
                                    { this.photoSection() }
                                    { this.profileRow('NOMBRE', this.props.user.UserName, colors.brandRed) }
                                    { this.profileRow('VIVIENDA', this.props.user.apartment[0].AptName, colors.brandGreen) }
                                    { this.profileRow('CONDOMINIO', this.props.user.condo.CondoName, colors.brandOrange) }
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
        sections: state.session.sections
    };
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
})(Profile);