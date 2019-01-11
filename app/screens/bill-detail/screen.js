// Importing package modules.
import React, { Component } from 'react';

import {
    View,
    TouchableOpacity,
    BackHandler
} from "react-native";

import {
    Text,
    Content,
    Container,
    Spinner,
    Icon,
    Root,
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
import { dateFormat } from "../../lib/helpers";
import accounting from 'accounting';

class BillDetail extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isDebt: this.props.params.isDebt,
            bill: this.props.params.bill,
            detailData: [],
            applicationsData: []
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
        this.state.isDebt ? this.createDetailDebtArray() : this.createDetailPayArray();
        this.createApplicationArray();
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
                    <TouchableOpacity
                        transparent
                        onPress={ () => this.popScreen() }
                    >
                        <Icon type={'MaterialIcons'} name={'chevron-left'} style={{ color: 'white', fontSize: 40, marginHorizontal: -10 }} />
                    </TouchableOpacity>
                </View>
            )
        };
    }

    popScreen() {
        this.props.navigator.pop();
    }

    // Defines title bar's body content
    titleBarBody() {
        return {
            content: (
                <View style={[{ width: '105%', alignItems: 'center' }]}>
                    <Text style={[Stylesheet.titleBarContent, { fontSize: 20 }]}>
                        Resumen
                    </Text>
                </View>
            )
        };
    }

    titleSection(title, amount, date) {
        return(
            <View style={ Stylesheet.titleSection }>
                <View style = { Stylesheet.titleLeftContainer }>
                    <Text style={ Stylesheet.title }>{ title }</Text>
                </View>
                <View style = { Stylesheet.titleRightContainer }>
                    <Text style={ Stylesheet.amount }>{ amount }</Text>
                    <Text style={ Stylesheet.date }>{ dateFormat(date) }</Text>
                </View>
            </View>
        )
    }

    dataDetailRow(label, content) {
        return(
            <View style={ Stylesheet.listRowContainer }>
                <Text style={ [Stylesheet.listRowLabel, { flex: 1 }] }>{ label }</Text>
                <Text style={ [Stylesheet.listRowContent, { flex: 3 }] }>{ content }</Text>
            </View>
        )
    }

    dataAppRow(label, label2, content, content2) {
        return(
            <View style={ [Stylesheet.listRowContainer] }>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={ [Stylesheet.listRowLabel] }>{ label } </Text>
                    <Text style={ Stylesheet.listRowContent }>{ content }</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={ Stylesheet.listRowLabel }>{ label2 } </Text>
                    <Text style={ Stylesheet.listRowContent }>{ content2 }</Text>
                </View> 
            </View>
        )
    }

    dataList(type, data, color) {
        if(type == 'Detalle'){
            return(
                data.length ?
                <View style={{ backgroundColor: colors.normalWhite }}>
                    <View style={ [Stylesheet.listTitleContainer, { borderBottomColor: color }] }>
                        <Text style={ [Stylesheet.listTitle, { color }] }>{ type }</Text>
                    </View>
                    <View style={ { paddingHorizontal: 8 } }>
                    { 
                        data.map((row) => {
                            return(this.dataDetailRow(row.label, row.content))
                        })
                    }
                    </View>
                </View> : null
            )
        } else if(type == 'Aplicaciones'){
            return(
                data.length ?
                <View style={{ backgroundColor: colors.normalWhite }}>
                    <View style={ [Stylesheet.listTitleContainer, { borderBottomColor: color }] }>
                        <Text style={ [Stylesheet.listTitle, { color }] }>{ type }</Text>
                    </View>
                    <View style={ { paddingHorizontal: 8 } }>
                    {
                        data.map((row) => {
                            return(this.dataAppRow(row.label, row.label2, row.content, row.content2,))
                        })
                    }
                    </View>
                </View> : null
            )
        }
    }
    
    createDetailDebtArray(){
        this.setState({ isLoading: true })
        let data = [
            {
                label: "Clasificación:",
                content: this.state.bill.clasificacion
            },
            {
                label: "Fondo:",
                content: this.state.bill.fondo
            },
            {
                label: "Descuento:",
                content: this.state.bill.descuento
            },
            {
                label: "Importe:",
                content: this.state.bill.importe
            },
            {
                label: "Fecha:",
                content: dateFormat(this.state.bill.fecha)
            },
            {
                label: "Vencimiento:",
                content: dateFormat(this.state.bill.vencimiento)
            }
        ]
        this.setState({ detailData: data }, () => {
            this.setState({ isLoading: false })
        })
    }

    createDetailPayArray(){
        this.setState({ isLoading: true })
        let data = [
            {
                label: "Referencia:",
                content: this.state.bill.referencia
            },
            {
                label: "Naturaleza:",
                content: this.state.bill.naturaleza
            },
            {
                label: "Cuenta:",
                content: this.state.bill.cuenta
            },
            {
                label: "Comment:",
                content: this.state.bill.comment
            },
        ]
        this.setState({ detailData: data }, () => {
            this.setState({ isLoading: false })
        })
    }

    createApplicationArray(){
        if(this.state.bill.aplicaciones){
            this.setState({ isLoading: true })
            let data = []
            this.state.bill.aplicaciones.map((item) => {
                data.push({
                    label: "Fecha:",
                    content: dateFormat(item.fecha),
                    label2: "Aplicado:",
                    content2: accounting.formatMoney(item.aplicado)
                })
            })
            this.setState({ applicationsData: data }, () => {
                this.setState({ isLoading: false })
            })
        }
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
                                    {
                                        this.titleSection(
                                            this.state.isDebt ? this.state.bill.concepto : this.state.bill.pago,
                                            this.state.isDebt ? this.state.bill.importe : this.state.bill.monto,
                                            this.state.bill.fecha
                                        )
                                    }
                                    <View style={ Stylesheet.titleBottom }></View>
                                    { this.dataList("Detalle", this.state.detailData, "#68B143") }
                                    <View style={ Stylesheet.titleBottom }></View>
                                    { this.dataList("Aplicaciones", this.state.applicationsData, colors.brandRed) }
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
})(BillDetail);