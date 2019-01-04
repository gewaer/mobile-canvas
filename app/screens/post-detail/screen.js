// Importing package modules.
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Linking,
    Image,
    AsyncStorage,
    Platform,
    TouchableOpacity,
    BackHandler,
    FlatList,
    List
} from "react-native";

import {
    Button,
    Title,
    Text,
    Content,
    Container,
    Form,
    Item,
    Input,
    Label,
    Spinner,
    Icon,
    Root,
    Toast,
    ListItem,
    Body,
    Left,
    Right,
    Picker
} from "native-base";

import { connect } from 'react-redux';

import cloneDeep  from "lodash/cloneDeep";
// Importing local assets and components.
import { appImages } from "../../config/imagesRoutes";
import TitleBar from '../../components/TitleBar';
import { VUE_APP_BASE_API_URL, FORGOT_PASSWORD_URL } from '../../config/env'

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
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import ImagePlaceholder from '../../components/image-placeholder';
import CommentRow from '../../components/comment-row';

const axios = require('../../config/axios')

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

/*
	Screen Name: Login. 
	Description: This screen is used to let the user log in with his/her email or with social options.
*/
class PostDetail extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            comments: [],
            post: this.props.params.post,
            date: this.props.params.date,
            comment: ''
        };
    }

    onValueChange(value) {
        this.setState({
            pickerSelection1: value
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
        this.getComments();
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

    createComment = () => {
        let comment = this.state.comment.trim();
        if (comment) {
            const data = new FormData();
            data.append('CondoId', this.props.currentCondo.CondoId);
            data.append('CmmtText', comment);

            axios({
                url: `/blogs/${this.state.post.BlogId}/comments`,
                method: "POST",
                data
            }).then((response) => {
                this.setState({ comment: '' }),
                this.setState({ comments: this.state.comments.concat(response.data) })
            }).catch(() => {
            })
        }
    }

    getComments() {
        if (!this.state.isLoadingFooter && !this.state.isRefreshing) {
            this.setState({ isLoading: true });
        }
        axios.get(`/blogs/${this.state.post.BlogId}/comments?relationships=user`)
        .then((response) => {
            this.setState({
                comments:  response.data
            }, () => { this.setState({
                isLoading: false,
                isRefreshing: false
            }) });
        })
        .catch((error) => {
            this.setState({ isLoading: false, isRefreshing: false });
            console.log(error);
        })
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
                        <Icon type={'MaterialIcons'} name={'chevron-left'} style={{ color: 'black', fontSize: 40, marginHorizontal: -10 }} />
                    </TouchableOpacity>
                </View>
            )
        };
    }

    popScreen() {
        this.props.navigator.pop();
        this.props.params.refresh();
    }

    // Defines title bar's body content
    titleBarBody() {
        return {
            content: (
                <View style={[Stylesheet.titleBarContent, { width: '135%', flexDirection: 'row' }]}>
                    <Icon type={'Ionicons'} name={'ios-contact'} style={ { color: '#B5B5B5',  fontSize: 48, marginRight: 12, marginTop: -5} } /> 
                    <View style = { { justifyContent: 'center' } }>
                        <Text style={[Stylesheet.titleBarContent, { fontSize: 15 }]}>
                            { this.state.post.BlogTitle }
                        </Text>
                        <Text style={[Stylesheet.titleBarContent, { fontSize: 10, color: colors.brandLightGray }]}>
                            { this.state.date }
                        </Text>
                    </View>
                </View>
            )
        };
    }

    renderFooter = () => {
        if (!this.state.isLoadingFooter) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <Spinner color={colors.brandLightBlack} />
            </View>
        );
    };

    renderComments = () => {
        let comments = cloneDeep(this.state.comments)
        comments.sort((a, b) => a.CmmtCreatedDate < b.CmmtCreatedDate);
        return (
            comments && comments.map((comment, index) => {
                return(
                    <CommentRow
                        key={ index }
                        comment={ comment }
                    />
                );
            })
        );
    }

    render() {
        return (
            <Root>
                <Container style={{ backgroundColor: colors.normalWhite }}>
                    <TitleBar noShadow left={this.titleBarLeft()} body={this.titleBarBody()} bgColor={colors.normalWhite} />
                    <Content style={{ backgroundColor: colors.normalWhite, borderTopWidth: 1, borderTopColor: '#241D1E' }}>
                        <View>
                            <View style={ Stylesheet.topContainer }>
                                <View style={ Stylesheet.titleContainer }>
                                    <Text style={ Stylesheet.titleText }>ITERA - MEXICO, RECURSOS HUMANOS</Text>
                                    <Text style={ { fontSize: 14, color: colors.brandLightGray } }>{ this.state.post.user.UserName }</Text>
                                </View>
                                <ImagePlaceholder/>
                                <View style={ Stylesheet.descriptionContainer }>
                                    <Text style={ { fontSize: 12 } }>{ this.state.post.BlogText }</Text>
                                </View>
                            </View>
                            <View style={ Stylesheet.divisionLine }></View>
                            <View style={ Stylesheet.commentRow }>
                                <View style={ Stylesheet.commentRowTop }>
                                    <Icon type={'Ionicons'} name={'ios-chatboxes'} style={ { color: 'black',  fontSize: 20, marginRight: 12, marginBottom: -12} } />
                                    <Text style={ { fontWeight: 'bold',  fontSize: 14 } }>Comentarios:</Text>
                                </View>
                                <View style={ Stylesheet.commentRowBotom }>
                                    <Icon type={'Ionicons'} name={'ios-contact'} style={ { color: '#B5B5B5',  fontSize: 32, marginRight: 12, marginTop: -5, marginBottom: -10} } /> 
                                    <AutoGrowingTextInput
                                        placeholderTextColor={ colors.brandLightGray }
                                        style={ [Stylesheet.formInput, { fontSize: 12, paddingLeft: 16, paddingRight: 16, paddingBottom: 5, width: 266 }] }
                                        placeholder="Escribe un comentario..."
                                        multiline={ true }
                                        onChangeText={(comment) => this.setState({ comment: comment })}
                                        value={ this.state.comment }
                                    />
                                    <Button
                                    rounded
                                    primary
                                    onPress={() => { this.createComment() }}
                                    style={ Stylesheet.submitBtn }>
                                        <Icon type="Ionicons"  name="ios-send"  color={colors.normalWhite} style={ { fontSize: 15, marginLeft: 0, marginRight: 0 } }/>
                                    </Button>
                                </View>
                            </View>
                            <View style={ Stylesheet.divisionLine }></View>
                            { 
                                this.state.isLoading ?
                                <Spinner color={colors.brandLightBlack} /> :
                                this.renderComments()
                            }
                        </View>
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
        posts: state.session.posts
    };
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
    changeActiveScreen, 
    changeSessionToken, 
    changeUser, 
    changeCurrentCondo,
    changeCondos
})(PostDetail);