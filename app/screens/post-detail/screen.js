// Importing package modules.
import React, { Component } from 'react';

import {
    View,
    Image,
    Alert,
    TouchableOpacity,
    BackHandler,
    FlatList
} from "react-native";

import {
    Button,
    Text,
    Container,
    Spinner,
    Icon,
    Root
} from "native-base";

import { connect } from 'react-redux';

import cloneDeep  from "lodash/cloneDeep";
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
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import ImagePlaceholder from '../../components/image-placeholder';
import CommentRow from '../../components/comment-row';
const axios = require('../../config/axios')

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
            comment: '',
            isLoadingFooter: false,
            isRefreshing: false,
            totalPages: null,
            commentsLimitReached: false,
            commentsPage: 1
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
        this.getComments(this.state.post.BlogId, this.state.postsPage);
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
            }).then(() => {
                this.setState({ comment: '' });
                this.getComments(this.state.post.BlogId, 1);
            }).catch(() => {
            })
        }
    }

    getComments(blogId, page) {
        if (!this.state.isLoadingFooter && !this.state.isRefreshing) {
            this.setState({ isLoading: true });
        }
        axios.get(`/comments?q=(BlogId:${ blogId })&relationships=user,appOptions&page=${ page }&sort=CmmtCreatedDate|desc&format=true`)
        .then((response) => {
            this.setState({
                comments:  this.state.comments.concat(response.data.data)
            }, () => { this.setState({
                isLoading: false,
                isRefreshing: false,
                isLoadingFooter: false,
                totalPages: response.data.total_pages
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
        this.props.navigator.resetTo({
            screen: 'vv.Home',
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }

    // Defines title bar's body content
    titleBarBody() {
        return {
            content: (
                <View style={[Stylesheet.titleBarContent, { width: '135%', flexDirection: 'row' }]}>
                    { this.state.post.appOptions && this.state.post.appOptions.foto ?
                        <Image
                            source={ { uri: this.state.post.appOptions.foto } }
                            style={ Stylesheet.thumbnail }
                        /> :
                        <Icon type={'Ionicons'} name={'ios-contact'} style={ { color: '#B5B5B5',  fontSize: 48, marginRight: 12, marginTop: -6} } />
                    }
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

    deleteComment(cmmtId){
        Alert.alert(
            "Eliminar",
            "¿Eliminar este comentario?", [{
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed")
                },
                {
                    text: "OK",
                    onPress: () => {
                        this.setState({ isLoading: true });
                        axios.delete(`/comments/${cmmtId}`)
                        .then(() => {
                            this.setState({ comments: [] }, () => {
                                this.getComments(this.state.post.BlogId, this.state.commentsPage)
                            })
                        })
                        .catch((error) => {
                            this.setState({ isLoading: false });
                            console.log(error);
                        })
                    }
                }
            ], {
                cancelable: false
            }
        ) 
    }

    renderComments = () => {
        let comments = cloneDeep(this.state.comments)
        comments.sort((a, b) => a.CmmtCreatedDate < b.CmmtCreatedDate);
        return (
            comments && 
            <FlatList
                onRefresh={() => this.getComments(this.state.post.BlogId, 1)}
                refreshing={this.state.isRefreshing}
                initialNumberToRender={4}
                keyExtractor={item => item.CmmtId}
                data={ comments }
                renderItem={({ item }) => (
                    <CommentRow
                        comment={ item }
                        onDeletePress = { () => { this.deleteComment(item.CmmtId) } }
                        shouldModifyComment = { this.props.isAdmin || item.CmmtCreatedBy == this.props.user.UserId || this.state.post.BlogCreatedBy == this.props.user.UserId }
                    />
                )}
                onEndReached={ () => this.handleLoadMore()}
                onEndReachedThreshold = { 0.5 }
                ListFooterComponent={() => this.renderFooter()}
                getItemLayout={(data, index) => (
                    { length: 82, offset: 82 * index, index }
                )}
            />
        );
    }

    handleLoadMore = () => {
        if (this.state.commentsLimitReached) {
            this.setState({ isLoading: false });
            return;
        } else if (this.state.isLoadingFooter) {
            return;
        } else {
            this.setState({
                commentsPage: this.state.commentsPage + 1,
                isLoadingFooter: true
            }, () => {
                if(this.state.totalPages < this.state.commentsPage){
                    this.setState({ isLoadingFooter: false });
                } else {
                    this.getComments(this.state.post.BlogId, this.state.commentsPage);
                } 
            })
        }
    }

    onRefresh() {
        this.setState({
            commentsPage: 1,
            comments: []
        }, () => {
            this.getPosts(this.state.post.BlogId, this.state.commentsPage);
        });
    }

    render() {
        return (
            <Root>
                <Container style={{ backgroundColor: colors.normalWhite }}>
                    <TitleBar noShadow left={this.titleBarLeft()} body={this.titleBarBody()} bgColor={colors.normalWhite} />
                    <View style={{ backgroundColor: colors.normalWhite, borderTopWidth: 1, borderTopColor: '#241D1E' }}>
                        <View style={ Stylesheet.topContainer }>
                            <View style={ Stylesheet.titleContainer }>
                                <Text style={ Stylesheet.titleText }>{ this.state.post.group.Nombre }</Text>
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
                    </View>
                    { 
                        this.state.isLoading ?
                        <Spinner color={colors.brandLightBlack} /> :
                        this.renderComments()
                    }
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
        posts: state.session.posts,
        isAdmin: state.session.isAdmin
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