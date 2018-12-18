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
import * as axios from 'axios'

import TitleBar from "../components/TitleBar"
var _ = require('lodash');

const platform = Platform.OS;
import { VUE_APP_BASE_API_URL } from '../config/env'

class EditInfo extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            item: {},
            itemSettings: {
                fields: [
                    {
                        name: 'firstname',
                        key: 'firstname',
                        type: 'text',
                        capitalize: true
                    },
                    {
                        name: 'lastname',
                        key: 'lastname',
                        type: 'text',
                        capitalize: true
                    },
                    {
                        name: 'email',
                        key: 'email',
                        type: 'text',
                        capitalize: false
                    },
                    {
                        name: 'phone',
                        key: 'phone',
                        type: 'phone',
                        capitalize: false
                    }
                ]
            }
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

    changeScreen(itemUpdated, updatedData) {
        this.props.navigator.push({
            screen: 'dac.ItemInfo',
            passProps: {
                item: updatedData ? updatedData : this.state.item,
                itemUpdated: itemUpdated,
            },
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            }
        })
    }

    componentWillMount() {
        this.setState({ item: this.props.item }, () => {
            this.createFieldStates()
        });
    }

    createFieldStates() {
        this.state.itemSettings.fields.forEach((item) => {
            this.setState({ [item.key] : this.state.item[item.key] })
        });
    }

    formatPhoneNumber(phoneNumberString) {
		var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
		var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
		if (match) {
			return '(' + match[1] + ') ' + match[2] + '-' + match[3]
		}
		return null
	}

	capitalizeFirstLetter(str) {
		var pieces = str.split(" ");
		for (var i = 0; i < pieces.length; i++) {
			var j = pieces[i].charAt(0).toUpperCase();
			pieces[i] = j + pieces[i].substr(1);
		}
		return pieces.join(" ");
	}

	titleBarbody() {
		return {
			content: (
				<View style={styles.titleBarContent}>
					<Text style={{ color: '#fff', paddingLeft: platform === "ios" ? 0 : 10, fontSize: platform === "ios" ? 18 : 19.64 }}>
						{this.props.item.firstname && this.props.item.firstname} {this.props.item.lastname && this.props.item.lastname}
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
                        <TouchableOpacity onPress={() => { this.updateItem() }}>
                            <Text style={{ color: '#fff', paddingLeft: 0, fontSize: 16, textAlign: 'right' }}>
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        );
    }

    getImageCover() {
        return 'https://banner2.kisspng.com/20180406/sve/kisspng-computer-icons-user-material-design-business-login-dizzy-5ac7f1c61041c2.5160856515230529980666.jpg'; 
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
    
    updateItem() {
        // if (!this.canEdit()) {
        //     Toast.show({
        //         text: '¡Por favor, llene los campos vacíos!',
        //         buttonText: 'Ok',
        //         duration: 3000,
        //         type: 'danger'
        //     });
        //     return;
        // }

        this.setState({ isLoading: true })

        const headersData = {
            headers: { 'Authorization': this.props.token }
        };

        let data = {};

        this.state.itemSettings.fields.forEach((item) => {
            data[item.key] =  this.state[item.key];
        });

        axios.put(`https://apidev.gewaer.io/v1/leads/${this.state.item.id}`, this.formatFormData(data), headersData)
        .then((response) => {
            this.changeScreen(true, response.data);
        })
        .catch((error) => {
            Toast.show({
                text: error.response.data.status.message ? error.response.data.status.message  : 'Error',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger'
            });
        });
    }

    render() {
        return (
            <Container>
                <Root>
                    <TitleBar left={this.titleBarLeft()} body={this.titleBarbody()} right={this.titleBarRight()}></TitleBar>
                    <Content padder>
                        <View style={styles.positionR}>
                            {
                                this.state.itemSettings.fields.map((item, index) => {
                                    return(
                                        <Item stackedLabel style={styles.formItem} key={index}>
                                            <Label style={[styles.formLabel, { fontSize: 12, color: colors.brandBlack, }]}>
                                                {this.capitalizeFirstLetter(item.name)}
                                            </Label>
                                            <Input
                                                style={styles.formInput}
                                                value={this.state[item.key]}
                                                autoCapitalize={item.capitalize ? 'sentences' : 'none'}
                                                onChangeText={(value) => this.setState({ [item.key]: value })}
                                            />
                                        </Item>
                                    );
                                })
                            }
                        </View>
                    </Content>
                </Root>
            </Container>
        );
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
        token: state.session.token
    };
};

export default connect(mapStateToProps, {})(EditInfo);