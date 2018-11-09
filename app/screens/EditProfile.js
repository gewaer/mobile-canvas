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
    Dimensions,
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
    Picker,
    Root,
    Toast
} from 'native-base';

import { colors, paddingHelpers } from "../config/styles";
import { changeActiveScreen, changeActiveCompany } from '../actions/SessionActions';
import { connect } from 'react-redux';
import * as axios from 'axios'
import moment from 'moment';
const deviceHeight = Dimensions.get("window").height;

import TitleBar from "../components/TitleBar"
var _ = require('lodash');

const platform = Platform.OS;
class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            cardsInfo: [],
            isLoading: true,
            userName: '',
            userLastName: '',
            userEmail: '',
            userPassword: '',
            userDefaultFamily: '',
            userFamilies: [],
            initialPassword: '',
            passwordVisible: false
        };
    }

    backAndroid() {
        this.returnToProfileScreen()
        return true
    }

    capitalizeFilter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    uncapitalizeFilter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
        const { userInfo } = this.props;
        this.setState(
            { 
                userName: userInfo.firstname,
                userLastName: userInfo.lastname, 
                userEmail: userInfo.email, 
                userPassword: userInfo.password, 
                userDefaultFamily: userInfo.default_company, 
                userFamilies: this.props.userFamilies,
                initialPassword: userInfo.password,
                isLoading: false 
            }
        );
    }

    changeActiveFamily(family) {
        console.log("Company Id: ", family.id);
        //this.setState({ isLoading: true })
        this.props.changeActiveCompany({ company: family });
    }

    changeScreen(infoChanged) {
        this.props.navigator.push({
            screen: 'dac.Profile',
            passProps: {
                profileInfoChanged: infoChanged,
            },
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            }
        })
    }

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

    getOptions(items) {
        //items = items.sort(this.sortByName);
        const optionsItems = items.map((item, i) => {
            if (item) {
                if (typeof item !== "object") {
                    return (
                        <Picker.item key={i} label={String(item)} value={item} />
                    )
                } else {
                    return (
                        <Picker.item key={i} label={String(item.name)} value={item.id} />
                    )
                }
            }
        })
        return optionsItems;
    }

    getDefaultFamilyName() {
        let defaultFamily = this.state.userFamilies.find((family) => {
            return family.id == this.state.userDefaultFamily;
        });
        return defaultFamily;
    }

    sortByName(a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

    titleBarLeft() {
        return {
            content: (
                <View style={styles.titleBarContent}>
                    <Button transparent onPress={() => this.returnToProfileScreen()}>
                        <Icon type={'MaterialIcons'} name={'chevron-left'} style={{color: '#fff', fontSize: 22}} />
                    </Button>
                </View>
            )
        };
    }

    returnToProfileScreen() {
        this.props.navigator.push({
            screen: 'dac.Profile',
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            }
        })
    }

    canEdit() {
        return  this.state.userName && 
                this.state.userLastName && 
                this.state.userEmail && 
                this.state.userPassword;
    }

    updateUserInfo() {

        if (!this.canEdit()) {
            Toast.show({
                text: '¡Por favor, llene los campos vacíos!',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger'
            });
            return;
        }

        this.setState({ isLoading: true })

        const headersData = {
            headers: { 'Authorization': this.props.token }
        };

        let data = {
            'firstname': this.state.userName,
            'lastname': this.state.userLastName,
            'email': this.state.userEmail,
            'password': this.state.userPassword,
            'default_company': this.state.userDefaultFamily
        }

        axios.put(`https://apidev.ahorrando.la/v1/users/${this.props.userInfo.id}`, this.formatFormData(data), headersData)
        .then((response) => {
            let userSelectedFamilty = this.getDefaultFamilyName();
            if (userSelectedFamilty) {
                this.changeActiveFamily(userSelectedFamilty);
            }
            this.changeScreen(true);
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.response);
        });
    }

    titleBarRight() {
        return (
            {
                content: (
                    <View style={[styles.titleBarContent, { minHeight: 45 }]}>
                        <TouchableOpacity onPress={() => this.updateUserInfo()}>
                            <Text style={{ color: '#fff', paddingLeft: 0, fontSize: 16 }}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        );
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
                <Root>
                    <Container style={{ paddingBottom: 10 }}>
                        <TitleBar left={this.titleBarLeft()} body={titleBarbody} right={this.titleBarRight()}></TitleBar>
                        <Content padder>
                            <View style={styles.positionR}>                
                                <Item stackedLabel style={styles.formItem} error={!this.state.userName}>
                                    <Label style={[styles.formLabel, { fontSize: 12, color: this.state.userName ? colors.brandBlack : 'red' }]}>
                                        Name
                                    </Label>
                                    <Input
                                        style={styles.formInput}
                                        value={this.capitalizeFilter(this.state.userName)}
                                        onChangeText={(name) => this.setState({ userName: name })}
                                    />
                                </Item>
                                <Item stackedLabel style={styles.formItem} error={!this.state.userLastName}>
                                    <Label style={[styles.formLabel, { fontSize: 12, color: this.state.userLastName ? colors.brandBlack : 'red' }]}>
                                        Lastname
                                    </Label>
                                    <Input
                                        style={styles.formInput}
                                        value={this.capitalizeFilter(this.state.userLastName)}
                                        onChangeText={(lastName) => this.setState({ userLastName: lastName })}
                                    />
                                </Item>
                                <Item stackedLabel style={styles.formItem} error={!this.state.userEmail}>
                                    <Label style={[styles.formLabel, { fontSize: 12, color: this.state.userEmail ? colors.brandBlack : 'red' }]}>
                                        Email
                                    </Label>
                                    <Input
                                        style={styles.formInput}
                                        value={this.state.userEmail}
                                        onChangeText={(email) => this.setState({ userEmail: email })}
                                    />
                                </Item>
                                <View>
                                    <Item stackedLabel style={styles.formItem} error={!this.state.userPassword}>
                                        <Label style={[styles.formLabel, { fontSize: 12, color: this.state.userPassword ? colors.brandBlack : 'red' }]}>
                                            Password
                                        </Label>
                                        <Input
                                            style={styles.formInput}
                                            value={this.state.userPassword}
                                            onChangeText={(password) => this.setState({ userPassword: password })}
                                            secureTextEntry={!this.state.passwordVisible}
                                        />

                                    </Item>

                                    <Icon onPress={() => this.setState({ passwordVisible: !this.state.passwordVisible }) } type={'Ionicons'} name={this.state.passwordVisible ? 'ios-eye' : 'ios-eye-off'} style={{ position: 'absolute', right: 10, bottom: 10 }} />
                                </View>
                            
                                {
                                    this.state.initialPassword !== this.state.userPassword &&
                                    <Item stackedLabel style={styles.formItem} error={!this.state.confirmPassword || this.state.confirmPassword != this.state.userPassword}>
                                        <Label style={[styles.formLabel, { fontSize: 12, color: !this.state.confirmPassword || this.state.confirmPassword != this.state.userPassword ? 'red' : colors.brandBlack }]}>
                                            Confirm Password
                                        </Label>
                                        <Input
                                            style={styles.formInput}
                                            value={this.state.confirmPassword}
                                            secureTextEntry={true}
                                            onChangeText={(confirmPassword) => this.setState({ confirmPassword: this.uncapitalizeFilter(confirmPassword) })}
                                        />
                                    </Item>
                                }
                                <View style={{ width: '100%', borderBottomColor: '#D9D5DC', borderBottomWidth: 0.5 }}>
                                    <Label style={[styles.formLabel, { fontSize: 12, color: colors.brandBlack, marginTop: 10 }]}>
                                        Default Company
                                    </Label>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon type={'Ionicons'} name={'ios-arrow-down'} style={{ padding: 10, fontSize: 14, }} />}
                                        placeholderIconColor={colors.brandBlack}
                                        placeholder="ELEGIR"
                                        placeholderStyle={{ color: colors.brandGrey, paddingLeft: 0 }}
                                        style={{ width: '100%', borderBottomWidth: 0.5, borderBottomColor: colors.brandGrey }}
                                        selectedValue={this.state.userDefaultFamily}
                                        onValueChange={(family) => this.setState({ userDefaultFamily: family })}
                                    >
                                        {this.getOptions(this.state.userFamilies)}
                                    </Picker>
                                </View> 
                            </View>
                        </Content>
                    </Container>
                </Root>
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
    },
    formItem: {
        marginTop: 10,
    },
    buttonContainer: {
        borderTopWidth: 0.7,
        borderTopColor: '#D9D5DC',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: paddingHelpers.S, shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
});

const titleBarbody = {
    content: (
        <View style={styles.titleBarContent}>
            <Text style={{ color: '#fff', paddingLeft: platform === "ios" ? 0 : 10, fontSize: platform === "ios" ? 18 : 19.64 }}>
                Editar Perfil
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
    changeActiveScreen, changeActiveCompany
})(EditProfile);