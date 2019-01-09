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

class BillDetail extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isDebt: this.props.params.isDebt,
            bill: this.props.params.bill,
            detailData: []
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
        this.createDetailArray();
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
        this.props.navigator.resetTo({
            screen: 'vv.Bills',
            navigatorStyle: {
                navBarHidden: true
            }
        });
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

    dataListRow(label, content) {
        return(
            <View style={ Stylesheet.listRowContainer }>
                <Text style={ Stylesheet.listRowLabel }>{ label }</Text>
                <Text style={ Stylesheet.listRowContent }>{ content }</Text>
            </View>
        )
    }

    dataList(type, data, color) {
        return(
            <View>
                <View style={ [Stylesheet.listTitleContainer, { borderBottomColor: color }] }>
                    <Text style={ [Stylesheet.listTitle, { color }] }>{ type }</Text>
                </View>
                <View style={ { paddingHorizontal: 8 } }>
                {
                    data.map((row) => {
                        return(this.dataListRow(row.label, row.content))
                    })
                }
                </View>
            </View>
        )
    }
    
    createDetailArray(){
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
            },
            // {
            //     label: "Recargo:",
            //     content: this.state.bill.importe
            // } recargo ??????
        ]
        this.setState({ detailData: data }, () => {
            this.setState({ isLoading: false })
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
                                    { this.titleSection(this.state.bill.concepto, this.state.bill.importe, this.state.bill.fecha) }
                                    <View style={ Stylesheet.titleBottom }></View>
                                    { this.dataList("Detalle", this.state.detailData, "#68B143") }
                                    <View style={ Stylesheet.titleBottom }></View>
                                    { this.dataList("Aplicaciones", [{label: "clasificacion", content: "administracion"}, {label: "clasificacion2", content: "administracion2"}], colors.brandRed) }
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