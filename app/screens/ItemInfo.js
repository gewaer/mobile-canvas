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

class ItemInfo extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            item: {},
            itemSettings: {
                fields: [
                    {
                        name: 'firstname',
                        key: 'firstname',
                        type: 'text'
                    },
                    {
                        name: 'lastname',
                        key: 'lastname',
                        type: 'text'
                    },
                    {
                        name: 'email',
                        key: 'email',
                        type: 'text'
                    },
                    {
                        name: 'phone',
                        key: 'phone',
                        type: 'phone'
                    },
                    {
                        name: 'creation date',
                        key: 'created_at',
                        type: 'date'
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

		if (this.props.itemUpdated) {
            Toast.show({
                text: 'Item successfully updated!',
                buttonText: 'Ok',
                duration: 3000,
                type: 'success'
            });
        }
    }

    changeScreen() {
        this.props.navigator.push({
            screen: 'dac.Dashboard',
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: false,
            }
        })
    }

    componentWillMount() {
        this.setState({ item: this.props.item });
    }

    changeToEditScreen() {
        this.props.navigator.push({
            screen: 'dac.EditItem',
            passProps: {
                item: this.state.item,
            },
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            }
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
        return 'https://banner2.kisspng.com/20180406/sve/kisspng-computer-icons-user-material-design-business-login-dizzy-5ac7f1c61041c2.5160856515230529980666.jpg'; 
	}
	
	getField(type, value) {

		if (!value) {
			return (
				<Input
					style={styles.formInput}
					value={'N/A'}
					disabled
				/>
			);
		}

		switch(type) {
			case 'text':
				return (
					<Input
						style={styles.formInput}
						value={value}
						disabled
					/>
				);
			case 'date':
				return (
					<Input
						style={styles.formInput}
						value={moment(value).format("MM/DD/YYYY")}
						disabled
					/>
				);
			case 'phone':
				return (
					<Input
						style={styles.formInput}
						value={this.formatPhoneNumber(value)}
						disabled
					/>
				);
		}
	}

    render() {
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
                            {
                                this.state.itemSettings.fields.map((item, index) => {
                                    return(
                                        <Item stackedLabel style={styles.formItem} key={index}>
                                            <Label style={[styles.formLabel, { fontSize: 12, color: colors.brandBlack, }]}>
                                                {this.capitalizeFirstLetter(item.name)}
                                            </Label>
                                            {
												this.getField(item.type, this.state.item[item.key])
											}
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
    };
};

export default connect(mapStateToProps, {})(ItemInfo);