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
    FlatList
} from "react-native";

import {
    Button,
    Text,
    Icon,
    List,
    ListItem,
    Body,
    Left,
    Right,
    Content,
    Container,
    Spinner
} from 'native-base';

import { colors, paddingHelpers } from "../config/styles";
import { changeActiveScreen, changeActiveFamily, changeActiveCompany } from '../actions/SessionActions';
import { VUE_APP_BASE_API_URL } from '../config/env'
import { connect } from 'react-redux';
import * as axios from 'axios'
const platform = Platform.OS;
import TitleBar from "../components/TitleBar"
import getStore from "../store/getStore"

const store = getStore();

class Family extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            isLoading: true,
            companies: [] 
        };

        this.store = getStore();

        this.store.subscribe(this.onStoreUpdate.bind(this));
    }

    onStoreUpdate() {
        const company = this.store.getState().session.company;
        //debugger;
        if (this.currentCompany != company && company.id) {
            this.currentCompany = company;
            this.getCompanies();
        }
    }

    componentWillMount() {
        this.getCompanies();
    }

    changeScreen(family) {
        this.props.navigator.resetTo({
            screen: 'dac.CompaniesProfile',
            passProps: {
                family: family,
            },
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            }
        })
    }

    changeActiveFamily(family) {
        this.setState({ isLoading: true })
        this.props.changeActiveCompany({ company: family });
        this.props.navigator.switchToTab({ tabIndex: 0 });
    }

    getCompanies = () => {
        this.setState({ isLoading: true })
        
        const data = {
            'Authorization': this.props.token,
        };

        axios.get(`${VUE_APP_BASE_API_URL}/companies`, { headers: data })
        .then((response) => {
            this.setState({ companies: response.data, isLoading: false });
        })
        .catch(function (error) {
            console.log(error.response);
        });
    }

    openAddCompanyModal() {
        this.props.navigator.showLightBox({
            screen: 'dac.AddCompany',
            passProps: {
                companyCreatedAction: this.getCompanies
            },
            style: {
                backgroundBlur: 'none',
                backgroundColor: 'rgba(34, 34, 34, 0.8)',
                width: 320,
                justifyContent: 'center',
                alignItems: 'center',
                tapBackgroundToDismiss: true
            }
        })
    }

    titleBarLeft() {
        return (
            {
                content: (
                    <View style={styles.titleBarContent}>
                        <Button transparent onPress={() => this.props.navigator.toggleDrawer({
                            side: 'left',
                            animated: true,
                            to: 'open'
                        })}>
                            <Icon type={'MaterialIcons'} name={'menu'} style={{ color: '#fff', fontSize: platform === "ios" ? 22 : 24 }} />
                        </Button>
                    </View>
                )
            }
        );
    }

    titleBarRight() {
        return (
            {
                content: (
                    <View style={[styles.titleBarContent]}>
                        <TouchableOpacity onPress={() => this.openAddCompanyModal()}>
                            <Text style={{ color: '#fff', paddingLeft: 0, fontSize: 16 }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        )
    }

    rowContent(company) {
        return (
            <ListItem style={styles.listItem} onPress={() => this.changeScreen(company)} icon>
                <Left style={{ maxWidth: 40 }} onPress={() => { this.changeActiveFamily(company) }}>
                    <TouchableOpacity onPress={() => { this.changeActiveFamily(company) }}>
                        {
                            company && company.id == this.props.company.id ?
                                    <Icon type={'FontAwesome'} name={'check-circle'} style={{ color: colors.brandGreen, fontSize: 22 }} />
                                :
                                    <Icon type={'FontAwesome'} name={'circle-o'} style={{ color: colors.brandGrey, fontSize: 22 }} />
                        }
                    </TouchableOpacity>
                </Left>
                <Body>
                    <View style={styles.textContainer}>
                        <Text style={styles.dataTextTitle}>
                            {company.name}
                        </Text>
                    </View>
                </Body>
            </ListItem>
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Container>
                    <TitleBar left={this.titleBarLeft()} body={titleBarbody}></TitleBar>
                    <Content>
                        <View style={{ margin: 'auto' }}>
                            <Spinner/>
                        </View>
                    </Content>
                </Container >
            );
        } else {
            return (
                <Container>
                    <TitleBar left={this.titleBarLeft()} body={titleBarbody} right={this.titleBarRight()}></TitleBar>
                    <Content>
                        <View style={styles.positionR}>
                            <FlatList
                                bounces={true}
                                data={this.state.companies}
                                renderItem={({ item }) => (
                                    this.rowContent(item)
                                )}
                                initialNumToRender={8}
                                maxToRenderPerBatch={10}
                                updateCellsBatchingPeriod={30}
                                onEndReachedThreshold={0.6}
                                keyExtractor={item => item.id}
                                removeClippedSubviews={false}
                                windowSize={25}
                            />
                            {
                                !this.state.companies.length && 
                                    <View style={{ marginTop: paddingHelpers.N }}>
                                        <Text style={{ marginTop: 10, textAlign: 'center' }}>
                                            This user has not registered companies
                                        </Text>
                                        <View style={styles.btnContainer}>
                                            <Button
                                                block
                                                style={styles.addBtn}
                                                onPress={() => this.openAddCompanyModal()}
                                            >
                                                <Text style={styles.addText}>
                                                    Add Company
                                        </Text>
                                            </Button>
                                        </View>
                                    </View>
                            }
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
    actionBtnContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: paddingHelpers.XL,
        paddingHorizontal: paddingHelpers.S,
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
    addBtn: {
        marginTop: paddingHelpers.S,
        marginBottom: paddingHelpers.XS,
        backgroundColor: colors.brandGreen,
        width: '100%',
        alignItems: 'center'
    },
    btnContainer: {
        marginTop: paddingHelpers.N,
        marginHorizontal: paddingHelpers.S
    }
});

const titleBarbody = {
    content: (
        <View style={styles.titleBarContent}>
            <Text style={{ color: '#fff', paddingLeft: platform === "ios" ? 0 : 10, fontSize: platform === "ios" ? 18 : 19.64 }}>
                Companies
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
    changeActiveScreen, changeActiveFamily, changeActiveCompany
})(Family);