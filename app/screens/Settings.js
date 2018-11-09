/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,    
    Platform,
    BackHandler
} from "react-native";

import {
    Button,
    Text,
    Icon,
    List,
    ListItem,
    Right,
    Body,
    Content,
    Container,
    Spinner,
    Switch,
    Picker,
    Item
} from 'native-base';

import { colors, paddingHelpers } from "../config/styles";
import { changeActiveScreen } from '../actions/SessionActions';
import { connect } from 'react-redux';
const platform = Platform.OS;
import TitleBar from "../components/TitleBar"
var _ = require('lodash');
class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            cardsInfo: [],
            isLoading: true,
            selected2: undefined
        };
    }

    backAndroid() {
        this.changeScreen('dashboard');
        return true
    }

    componentDidMount() {
        this.setState({ isLoading: false });
        BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
    }

    changeScreen(activeScreen) {
        console.log("pressing");
        this.props.changeActiveScreen({ activeScreen });
    }

    titleBarLeft() {
        return {
            content: (
                <View style={styles.titleBarContent}>
                    <Button transparent onPress={() => this.props.navigator.toggleDrawer({
                        side: 'left',
                        animated: true,
                        to: 'open'
                    })}>
                        <Icon type={'MaterialIcons'} name={'menu'} style={{color: '#fff', fontSize: 22}} />
                    </Button>
                </View>
            )
        };
    }

    openAddCardModal() {
        this.props.navigator.push({
            screen: 'dac.EditSettings',
            passProps: {
                cardCreationAction: this.getUserCards
            },
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            }
        })
    }

    onValueChange2(value: string) {
        this.setState({
        selected2: value
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Container>
                    <TitleBar left={this.titleBarLeft()} body={titleBarbody}></TitleBar>
                    <Content>
                        <View style={{ margin: 'auto' }}>
                            <Spinner />
                        </View>
                    </Content>
                </Container >
            );
        } else {
            return (
                <Container>
                    <TitleBar left={this.titleBarLeft()} body={titleBarbody}></TitleBar>
                    <Content>
                        <View style={styles.positionR}>
                            <List>      
                                <ListItem style={[styles.listItem]}>
                                    <Body>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: "600", marginLeft: 0 }}>
                                                Enable Push Notifications
                                            </Text>
                                        </View>
                                    </Body>
                                    <Right>
                                        <Switch value={false} />
                                    </Right>
                                </ListItem>
                                <ListItem style={[styles.listItem]}>
                                    <Body>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: "600", marginLeft: 0 }}>
                                                Language
                                            </Text>
                                        </View>
                                    </Body>
                                    <Right>
                                        <Item picker style={{borderBottomWidth: 0}}>
                                            <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                style={{ width: undefined }}
                                                placeholder="English"
                                                placeholderStyle={{ color: "#111" }}
                                                placeholderIconColor="#007aff"
                                                selectedValue={this.state.selected2}
                                                onValueChange={this.onValueChange2.bind(this)}
                                            >
                                                <Picker.Item label="Ingles" value="key1" />
                                            </Picker>
                                        </Item>
                                    </Right>
                                </ListItem>
                            </List>
     
                        </View>
                    </Content>
                </Container>
            );
        }
    }
}

// Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background
    },

    addButton: {
        backgroundColor: colors.brandGreen, 
        borderRadius: 100, 
        width: 50, 
        height: 50, 
        alignItems: 'center', 
        position: 'absolute', 
        bottom: 10, 
        right: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    
    main: {
        fontSize: 20,
        textAlign: "center",
        color: colors.headerText,
        fontWeight: "400",
        fontStyle: "italic"
    },
    titleBarContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    viewBar: {
        backgroundColor: colors.brandGreen,
        alignItems: "center",
        padding: paddingHelpers.N
    },
    textHeading: {
        color: colors.brandWhite,
        fontWeight: "900",
        fontSize: 22,
        letterSpacing: 4,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.buttonBackground,
        margin: 5
    },
    buttonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: "500"
    },
    listItem: {
        marginLeft: 0,
        padding: paddingHelpers.S
    },
    dataTextTitle: {
        fontSize: 25,
        fontWeight: "900",
        color: colors.brandBlack,
    },
    dataTextSubTitle: {
        fontSize: 13,
        textAlign: 'center',
        fontWeight: "900",
        color: colors.brandGold,
        maxWidth: 160,
    },
    dataTextLabel: {
        fontSize: 15,
        fontWeight: "900",
        color: colors.brandDarkGrey,
        position: "absolute",
        right: 0,
        alignSelf: "flex-end"
    },
    dataTextInfo: {
        fontSize: 15,
        fontWeight: "900",
        color: colors.brandBlueDisabled
    },
    marginFix: {
        marginLeft: paddingHelpers.N
    },
    textContainer: {
        flexDirection: "row"
    },
    progressStyle: {
        borderRadius: 3,
        borderWidth: 0
    }
});


const titleBarbody = {
    content: (
        <View style={styles.titleBarContent}>
            <Text style={{ color: '#fff', paddingLeft: platform === "ios" ? 0 : 10, fontSize: platform === "ios" ? 18 : 19.64 }}>
                Settings
            </Text>
        </View>
    )
};

const mapStateToProps = state => {
    return {
        token: state.session.token,
        user: state.session.user,
        selectedCompanyId: state.session.selectedCompanyId,
        company: state.session.company
    };
};

export default connect(mapStateToProps, {
    changeActiveScreen
})(Settings);