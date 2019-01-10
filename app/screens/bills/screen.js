// Importing package modules.
import React, { Component } from 'react';

import {
    View,
    Platform,
    TouchableOpacity,
    BackHandler
} from "react-native";

import {
    Text,
    Content,
    Container,
    Form,
    Item,
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
    changeCurrentCondo,
    changeCondos
} from '../../actions/SessionActions';
import Stylesheet from './stylesheet';
import MulticolorBar from '../../components/multicolor-bar/';
import ExpandButton from '../../components/expand-button';
import BillRow from '../../components/bill-row';
import { amountFormat, dateFormat } from "../../lib/helpers";
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
            isPaySummExpanded: false,
            apartments: [],
            currentApartment: {},
            accountStatus: {}
        };
    }

    onValueChange(value) {
        this.setState({
            pickerSelection: value
        }, () => {
            this.setState({ currentApartment: this.state.apartments[this.state.pickerSelection] }, () => {
                this.getAccountStatus(this.props.currentCondo.CondoId, this.state.currentApartment.ApmtId)
            })
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
        this.getApartments(this.props.currentCondo.CondoId);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    // Changes the active screen using redux.
    changeScreen(activeScreen) {
        this.props.changeActiveScreen({ activeScreen });
    }

    // Pushes to another screen in the navigator stack.
    pushScreen({activeScreen, bill, isDebt}) {
        let params = {
            bill,
            isDebt
        };
        this.props.navigator.push({
            screen: activeScreen,
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            },
            passProps: {
                params
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
    
    apartmentItems() {
        return this.state.apartments.map((apartment, index) => {
            return(
                <Picker.Item
                    key={ index }
                    value={ index }
                    label={ apartment.AptName }
                />
            );
        }) 
    }

    debtsSection(color, isExpanded) {
        return(
            isExpanded && this.state.accountStatus.data.adeudos &&
            <View style={ [Stylesheet.expandedSection, { borderColor: color }] }>
                {this.state.accountStatus.data.adeudos.map((debt, index) => {
                    return(
                        <BillRow
                            key={ index }
                            title={ debt.concepto }
                            subTitle={ dateFormat(debt.fecha) }
                            amount={ debt.importe }
                            onPress={ () => { this.pushScreen({ activeScreen: 'vv.BillDetail', bill: debt, isDebt: true}) } }
                        />
                    )
                })}
            </View>
        )
    }

    paymentsSection(color, isExpanded) {
        return(
            isExpanded && this.state.accountStatus.data.abonos &&
            <View style={ [Stylesheet.expandedSection, { borderColor: color }] }>
                {this.state.accountStatus.data.abonos.map((payment, index) => {
                    return(
                        <BillRow
                            key={ index }
                            title={ payment.pago }
                            subTitle={ dateFormat(payment.fecha) }
                            amount={ payment.monto }
                        />
                    )
                })}
            </View>
        )
    }

    currentBalanceDisplay(title, balance, shouldDisplay) { 
        let color = '';
        let label ='';
        let intBalance = balance ? amountFormat(balance) : 0;
        if(intBalance > 0){
            label = 'Saldo a favor'
            color = '#68B143'
        } else if (intBalance < 0){
            label = 'Saldo pendiente'
            color = '#241D1E'
        } else {
            label = 'Saldo final'
            color = '#004CB4'
        }

        return(
            shouldDisplay &&
            <View>
                <View style={ Stylesheet.balanceRow }>
                    <Text style={ Stylesheet.balanceTitle }>{ title }</Text>
                    <Text style={ [Stylesheet.balanceSubTitle, { color }] }>{ label }: { balance }</Text>
                </View>
                <View style={ Stylesheet.divisionLine }/>
            </View>
        )
    }

    getApartments(condoId) {
        this.setState({ isLoading: true });
        axios.get(`/apartments?q=(condoid:${condoId})&limit=200&sort=AptName`)
        .then((response) => {
            this.setState({ apartments: response.data }, () => { this.setState({ isLoading: false }); });
        })
        .catch((error) => {
            console.log(error);
            this.setState({ isLoading: false });
        })
    }

    getAccountStatus(condoId, aptId){
        this.setState({ isLoading: true });
        axios.get(`/bank-statement?condo=19236&apt=403625&year=2018`)
        .then((response) => {
            this.setState({ accountStatus: response.data }, () => { this.setState({ isLoading: false }); });
        })
        .catch((error) => {
            console.log(error);
            this.setState({ isLoading: false });
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
                                                        this.apartmentItems()
                                                    }
                                                </Picker>
                                            </Item>                             
                                        </Form>
                                    </View>
                                    <View style={ Stylesheet.divisionLine }></View>
                                    { 
                                        this.currentBalanceDisplay(
                                            this.state.currentApartment.AptName,
                                            this.state.accountStatus.saldofinal,
                                            this.state.pickerSelection != null
                                        )
                                    }
                                    <ExpandButton
                                        isExpanded={ this.state.pickerSelection != null ? this.state.isDebtsExpanded : false }
                                        text={ 'Adeudos Pendientes' }
                                        color={ colors.brandRed }
                                        onPress={ () => {this.setState({ isDebtsExpanded: !this.state.isDebtsExpanded })} }
                                        style={{ marginTop: 16 }}
                                        isDisabled= { this.state.pickerSelection == null ? true : false }
                                    />
                                    { this.debtsSection(colors.brandRed, this.state.pickerSelection != null ? this.state.isDebtsExpanded : false) }
                                    <ExpandButton
                                        isExpanded={ this.state.pickerSelection != null ? this.state.isPaySummExpanded : false }
                                        text={ 'Resumen de Pagos' }
                                        color={ '#68B143' }
                                        onPress={ () => {this.setState({ isPaySummExpanded: !this.state.isPaySummExpanded })} }
                                        style={{ marginTop: 16 }}
                                        isDisabled= { this.state.pickerSelection == null ? true : false }
                                    />
                                    { this.paymentsSection('#68B143', this.state.pickerSelection != null ? this.state.isPaySummExpanded : false) }
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