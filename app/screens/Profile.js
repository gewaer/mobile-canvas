import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    TouchableOpacity,
    BackHandler
} from "react-native";

import {
    Button,
    Text,
    Icon,
    Label,
    Item,
    Input,
    Content,
    Container,
    Spinner,
    Root,
    Toast,
    Thumbnail
} from 'native-base';

import { colors, paddingHelpers } from "../config/styles";
import { changeActiveScreen } from '../actions/SessionActions';
import { connect } from 'react-redux';
import * as axios from 'axios'
import { VUE_APP_BASE_API_URL } from '../config/env'

import TitleBar from "../components/TitleBar"
var _ = require('lodash');

const platform = Platform.OS;
class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            userInfo: [],
            families: [],
            isLoading: true 
        };
    }

    backAndroid() {
        this.props.changeActiveScreen({ activeScreen: 'dashboard' });
        return true
    }

    capitalizeFilter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    componentDidMount() {
        this.getUserInfo();
        BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
    }

    goToEditProfileScreen() {
        this.props.navigator.push({
            screen: 'dac.EditProfile',
            passProps: {
                userInfo: this.state.userInfo,
                userFamilies: this.state.families,
            },
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            },
        });
    }

    getFamilies = () => {
        const data = {
            'Authorization': this.props.token,
        };

        axios.get(`${VUE_APP_BASE_API_URL}/companies?q=(users_id:${this.props.user.id})`, { headers: data })
        .then((response) => {
            this.setState({ families: response.data, isLoading: false }, () => {
                if (this.props.profileInfoChanged) {
                    Toast.show({
                        text: '¡Perfil actualizado correctamente!',
                        buttonText: 'Ok',
                        duration: 3000,
                        type: 'success'
                    });
                }
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getDefaultFamilyName() {
        let defaultFamily = this.state.families.find((family) => {
            return family.id == this.state.userInfo.default_company;
        });
        return defaultFamily ? defaultFamily.name : 'No Disponible';
    }

    getUserInfo() {
        const data = {
            'Authorization': this.props.token,
        };
        axios.get(`${VUE_APP_BASE_API_URL}/users/${this.props.user.id}`, { headers: data })
        .then((response) => {
            console.log(response.data);
            this.setState({ userInfo: response.data })
            this.getFamilies()
        })
        .catch(function (error) {
            // handle error
            console.log(error);

        })
        .then(function () {
            // always executed
        });
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

    titleBarRight() {
        return (
            {
                content: (

                    <View style={[styles.titleBarContent, { minHeight: 45 }]}>
                        <TouchableOpacity onPress={() => { this.goToEditProfileScreen() }}>
                            <Text style={{ color: '#fff', paddingLeft: 0, fontSize: 16}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    
                )
            }
        );
    }

    openAddCardModal() {
        this.props.navigator.push({
            screen: 'dac.EditProfile',
            passProps: {
                cardCreationAction: this.getUserCards
            },
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            }
        })
    }


    render() {
        if (this.state.isLoading) {
            return (
                <Container>
                    <Root>
                        <TitleBar left={this.titleBarLeft()} body={titleBarbody}></TitleBar>
                        <Content>
                            <View style={{ margin: 'auto' }}>
                                <Spinner />
                            </View>
                        </Content>
                    </Root>
                </Container >
            );
        } else {
            return (
                <Container>
                    <Root>
                        <TitleBar left={this.titleBarLeft()} body={titleBarbody} right={this.titleBarRight()}></TitleBar>
                        <Content padder>
                            <View style={styles.positionR}>     
                                <View style={styles.container}>
                                    <Thumbnail
                                        source={{ uri: 'https://banner2.kisspng.com/20180406/sve/kisspng-computer-icons-user-material-design-business-login-dizzy-5ac7f1c61041c2.5160856515230529980666.jpg' }}
                                        style={{ width: 120, height: 120 }}
                                        resizeMode='cover'
                                    />
                                </View>
                                <Item stackedLabel style={styles.formItem} >
                                    <Label style={[styles.formLabel, { fontSize: 12, color: colors.brandBlack,}]}>
                                        Name
                                    </Label>
                                    <Input
                                        style={styles.formInput}
                                        value={this.capitalizeFilter(this.state.userInfo.firstname)}
                                        disabled
                                        />
                                </Item>
                                <Item stackedLabel style={styles.formItem} >
                                    <Label style={[styles.formLabel, { fontSize: 12, color: colors.brandBlack, }]}>
                                        Lastname
                                    </Label>
                                    <Input
                                        style={styles.formInput}
                                        value={this.capitalizeFilter(this.state.userInfo.lastname)}
                                        disabled
                                    />
                                </Item>
                                <Item stackedLabel style={styles.formItem} >
                                    <Label style={[styles.formLabel, { fontSize: 12, color: colors.brandBlack, }]}>
                                        Email
                                    </Label>
                                    <Input
                                        style={styles.formInput}
                                        value={this.state.userInfo.email}
                                        disabled
                                    />
                                </Item>
                                <Item stackedLabel style={styles.formItem} >
                                    <Label style={[styles.formLabel, { fontSize: 12, color: colors.brandBlack, }]}>
                                        Password
                                    </Label>
                                    <Input
                                        style={styles.formInput}
                                        value={this.state.userInfo.password}
                                        secureTextEntry={true}
                                        disabled
                                    />
                                </Item>
                                <Item stackedLabel style={styles.formItem} >
                                    <Label style={[styles.formLabel, { fontSize: 12, color: colors.brandBlack, }]}>
                                        Default Company
                                    </Label>
                                    <Input
                                        style={styles.formInput}
                                        value={this.getDefaultFamilyName()}
                                        disabled
                                    />
                                </Item>
                            </View>
                        </Content>
                    </Root>
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
    },
    formItem: {
        marginTop: 10,
    },
   
});

const titleBarbody = {
    content: (
        <View style={styles.titleBarContent}>
            <Text style={{ color: '#fff', paddingLeft: platform === "ios" ? 0 : 10, fontSize: platform === "ios" ? 18 : 19.64 }}>
                My Profile
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
})(Profile);