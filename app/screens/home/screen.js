// Importing package modules.
import React, { Component } from 'react';

import {
    View,
    Platform,
    TouchableOpacity,
    BackHandler,
    FlatList
} from "react-native";

import {
    Button,
    Text,
    Container,
    Item,
    Spinner,
    Icon,
    Root,
    Picker
} from "native-base";

import { connect } from 'react-redux';

// Importing local assets and components.
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
    changeCondos,
    changeSections
} from '../../actions/SessionActions';
import Stylesheet from './stylesheet';
import MulticolorBar from '../../components/multicolor-bar/';
import PostRow from '../../components/post-row';
import { dateFormat } from '../../lib/helpers';

const axios = require('../../config/axios')

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

/*
	Screen Name: Login. 
	Description: This screen is used to let the user log in with his/her email or with social options.
*/
class Home extends Component {
    
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
            emailError: '',
            passwordError: '',
            isLoading: false,
            pickerSelection: 0,
            shouldShowPostBtn: false,
            postsPage: 1,
            isLoadingFooter: false,
            postsLimitReached: false,
            totalPages: null,
            posts: [],
            isRefreshing: false
        };
    }

    onNavigatorEvent(event) {
        switch(event.id) {
          case 'willAppear':
            this.onRefresh()
            break;
        }
      }

    onValueChange(value) {
        this.setState({
            pickerSelection: value,
            postsPage: 1,
            posts: []
        }, () => {
            const sectId = this.props.sections[value] ? this.props.sections[value].SectId : '';
            this.getPosts(this.props.currentCondo.CondoId, this.state.postsPage, sectId);
        });
    }

    // Handles Android's back button's action
    backAndroid() {
        this.pushScreen({screen: 'vv.Login'});
        return true
    }

    componentDidMount() {
        // Creates an event listener for Android's back button
        BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
        this.getSections(this.props.currentCondo.CondoId);
    }

    // Changes the active screen using redux.
    changeScreen(activeScreen) {
        this.props.changeActiveScreen({ activeScreen });
    }

    // Pushes to another screen in the navigator stack.
    pushScreen({activeScreen, post, date}) {
        let params = {
            post,
            date,
            refresh: this.onRefresh.bind(this)
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

    getPosts(condoId, page, sectId) {
        if (!this.state.isLoadingFooter && !this.state.isRefreshing) {
            this.setState({ isLoading: true });
        }
        axios.get(`/blogs/?q=(condoid:${condoId},sectid:${sectId})&relationships=comments,user,group,files,images,appOptions&page=${page}&sort=BlogCreatedDate|desc&format=true`)
        .then((response) => {
            this.setState({ posts:  this.state.posts.concat( response.data.data ) }, () => { this.setState({ isLoading: false, isLoadingFooter: false, isRefreshing: false, totalPages: response.data.total_pages }) });
        })
        .catch((error) => {
            console.log(error);
        }).then(() => {
            this.setState({ isLoading: false, isRefreshing: false });
        })
    }

    getSections(condoId) {
        if (!this.state.isLoadingFooter) {
            this.setState({ isLoading: true });
        }
        axios.get(`/sections?q=(CondoId:${condoId})&limit=200&sort=SectName`)
        .then((response) => {
            response.data.unshift({
                SectName: 'Todas',
                SectCode: '',
                SectId: ''
            })
            this.props.changeSections({ sections: response.data });
        })
        .catch((error) => {
            console.log(error);
            this.setState({ isLoading: false });
        })
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

    handleLoadMore = () => {
        if (this.state.postsLimitReached) {
            this.setState({ isLoading: false });
            return;
        } else if (this.state.isLoadingFooter) {
            return;
        } else {
            this.setState({
                postsPage: this.state.postsPage + 1,
                isLoadingFooter: true
            }, () => {
                if(this.state.totalPages < this.state.postsPage){
                    this.setState({ isLoadingFooter: false });
                } else {
                    this.getPosts(this.props.currentCondo.CondoId, this.state.postsPage, this.props.sections[this.state.pickerSelection].SectId);
                }
            })
        }
    }

    onRefresh = () => {
        this.setState({ isRefreshing: true }, () => {
            this.onValueChange(this.state.pickerSelection)
        });
    }

    render() {
        return (
            <Root>
                <Container style={{ backgroundColor: colors.normalWhite, flex: 1 }}>
                    <TitleBar noShadow left={this.titleBarLeft()} body={this.titleBarBody()} bgColor={colors.brandLightBlack} />
                    <MulticolorBar/>
                    <View style={{ backgroundColor: colors.normalWhite }}>
                        {
                            this.state.isLoading ?
                                <Spinner color={colors.brandLightBlack} /> :
                                <View>
                                    <View style={ Stylesheet.topContainer }>
                                        <Item picker style={ [Stylesheet.formItem, { flex: 1 }] }>
                                            <Picker
                                                textStyle={{ fontSize: 12 }}
                                                mode="dropdown"
                                                style={{ width: this.state.shouldShowPostBtn ? 250 : 350 }}
                                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                placeholder="Todas"
                                                placeholderStyle={{ color: 'black', fontSize: 12 }}
                                                placeholderIconColor="#007aff"
                                                selectedValue={this.state.pickerSelection}
                                                onValueChange={(itemValue) => this.onValueChange(itemValue)}
                                            >
                                                {
                                                    this.props.sections && this.props.sections.map((section, index) => {
                                                        return(
                                                            <Picker.Item
                                                                key={ index }
                                                                value={ index }
                                                                label={ section.SectName }
                                                            />
                                                        );
                                                    })
                                                }
                                            </Picker>
                                            {/* <Icon style={ {alignSelf: 'flex-end'} } name="ios-arrow-down-outline" /> */}
                                        </Item>
                                        { this.state.shouldShowPostBtn ?
                                            <Button
                                                block
                                                primary
                                                onPress={() => { console.log('button pressed') }}
                                                style={[Stylesheet.submitBtn]}>
                                                <Icon type="Ionicons"  name="ios-add"  color={colors.normalWhite} style={ Stylesheet.buttonIcon }/>
                                                <Text style={{ color: colors.normalWhite, fontSize: 12, paddingRight: 10 }}>
                                                    Post
                                                </Text>
                                            </Button>
                                        : null }
                                    </View>
                                    <View style={ Stylesheet.divisionLine }></View>
                                </View>
                        }
                    </View>
                    <FlatList
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isRefreshing}
                        initialNumberToRender={4}
                        keyExtractor={item => item.BlogId}
                        data={ this.state.posts }
                        renderItem={({ item }) => (
                            <PostRow
                                source={ item.appOptions ? item.appOptions.foto : "" }
                                title={ item.BlogTitle }
                                content={ item.BlogText }
                                imagesCount={ item.images.length }
                                commentsCount={ item.comments.length }
                                atchCount={ item.files.length }
                                subTitle={ dateFormat(item.BlogCreatedDate ) }
                                onPress={ () => { this.pushScreen({ activeScreen: 'vv.PostDetail', post: item, date: dateFormat(item.BlogCreatedDate ) }) } }
                            />
                        )}
                        onEndReached={ () => this.handleLoadMore()}
                        onEndReachedThreshold = { 0.5 }
                        ListFooterComponent={() => this.renderFooter()}
                        getItemLayout={(data, index) => (
                            { length: 135.5, offset: 135.5 * index, index }
                        )}
                    />
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
    changeCondos,
    changeSections
})(Home);