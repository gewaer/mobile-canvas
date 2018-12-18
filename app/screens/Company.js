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
    TouchableOpacity,
    BackHandler
} from "react-native";

import {
    Button,
    Item,
    Label,
    Input,
    Text,
    Icon,
    Content,
    Container,
    Spinner,
    Root,
    Toast,
    Thumbnail
} from 'native-base';

import { colors } from "../config/styles";
import { connect } from 'react-redux';
import moment from 'moment';

import TitleBar from "../components/TitleBar"
var _ = require('lodash');

const platform = Platform.OS;

class Company extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            userInfo: [],
            families: [],
            companyName: '',
            isLoading: false, 
            company: {}
        };
    }

    backAndroid() {
        this.changeScreen();
        return true
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());

        if (this.props.companyUpdated) {
            Toast.show({
                text: 'Company successfully updated!',
                buttonText: 'Ok',
                duration: 3000,
                type: 'success'
            });
        }
    }

    changeScreen() {
        this.props.navigator.push({
            screen: 'dac.Companies',
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: false,
            }
        })
    }

    componentWillMount() {
        this.setState({ companyName: this.props.family.name, company: this.props.family });
    }

    changeToEditScreen() {
        this.props.navigator.push({
            screen: 'dac.EditCompany',
            passProps: {
                company: this.state.company,
            },
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            }
        });
    }

   titleBarbody() {
       return {
            content: (
                <View style={styles.titleBarContent}>
                    <Text style={{ color: '#fff', paddingLeft: platform === "ios" ? 0 : 10, fontSize: platform === "ios" ? 18 : 19.64 }}>
                        { this.props.family.name }
                    </Text>
                </View>
            )
       }
    }
    
    titleBarLeft() {
        return {
            content: (
                <View style={styles.titleBarContent}>
                    <Button transparent onPress={() => this.changeScreen() }>
                        <Icon type={'MaterialIcons'} name={'chevron-left'} style={{ color: '#fff', fontSize: platform === "ios" ? 22 : 24 }} />
                    </Button>
                </View>
            )
        };
    }

    titleBarRight() {
        return (
            {
                content: (
                    <View style={styles.titleBarContent}>
                        <TouchableOpacity onPress={() => { this.changeToEditScreen() }}>
                            <Text style={{ color: '#fff', paddingLeft: 0, fontSize: 16, textAlign: 'right' }}>
                                Edit
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        );
    }

    getImageCover() {
        return  this.state.company.profile_image ? 
            this.state.company.profile_image 
        : 
            "https://d3bza9ldbeb18h.cloudfront.net/assets/placeholder-company-b9d0a167b1f7460768517d115285de2337c6e2a84f4285617722efa587c693fc.png";
    }


    render() {
        if (this.state.isLoading) {
            return (
                <Container>
                    <Root>
                        <TitleBar left={this.titleBarLeft()} body={this.titleBarbody()}></TitleBar>
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
                        <TitleBar left={this.titleBarLeft()} body={this.titleBarbody()} right={this.titleBarRight()}></TitleBar>
                        <Content padder>
                            <View>
                                <View style={styles.container}>
                                    <Thumbnail
                                        source={{ uri: this.getImageCover() }}
                                        style={ styles.companyLogo }
                                        resizeMode='cover'
                                    />
                                </View>
                            </View>
                            <View style={styles.positionR}>
                                <Item stackedLabel style={styles.formItem} >
                                    <Label style={[styles.formLabel, { fontSize: 12, color: colors.brandBlack, }]}>
                                        Name
                                    </Label>
                                    <Input
                                        style={styles.formInput}
                                        value={this.state.company.name}
                                        disabled
                                    />
                                </Item>
                                <Item stackedLabel style={styles.formItem} >
                                    <Label style={[styles.formLabel, { fontSize: 12, color: colors.brandBlack, }]}>
                                        Website
                                    </Label>
                                    <Input
                                        style={styles.formInput}
                                        value={this.state.company.website ? this.state.company.website  : 'N/A'}
                                        disabled
                                    />
                                </Item>
                                <Item stackedLabel style={styles.formItem} >
                                    <Label style={[styles.formLabel, { fontSize: 12, color: colors.brandBlack, }]}>
                                        Creation Date
                                    </Label>
                                    <Input
                                        style={styles.formInput}
                                        value={moment(this.state.company.created_at).format("MM/DD/YYYY")}
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
    companyLogo: {
        width: 120,
        height: 120
    },    
    titleBarContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.buttonBackground,
        margin: 5
    },
    formItem: {
        marginTop: 10,
    }
});

const mapStateToProps = state => {
    return {
        user: state.session.user,
    };
};

export default connect(mapStateToProps, {})(Company);