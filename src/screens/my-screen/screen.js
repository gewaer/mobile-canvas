// Importing package modules.
import React, { Component } from 'react';

import {
	View,
	Platform,
	TouchableOpacity,
	Alert,
  ScrollView,
  Image
} from "react-native";

import {
	Button,
	Text,
	Content,
	Container,
	Form,
	Input,
	Spinner,
	Icon,
	Root,
	Picker,
	ActionSheet
} from "native-base";

import { connect } from 'react-redux';
import TitleBar from '../../components/title-bar';
import cloneDeep from "lodash/cloneDeep";
import _ from 'lodash';
import {
	globalStyle,
	colors
} from "../../../src/config/styles";

// Importing Redux's actions
import {
	changeActiveScreen
} from '../../actions/SessionActions';
import Stylesheet from './stylesheet';
import FilePlaceholder from '../../components/file-placeholder';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
//import ImagePicker from 'react-native-image-crop-picker';
import * as mime from 'react-native-mime-types';
import { normalizeFile } from '../../../src/lib/helpers';
import { Navigation } from 'react-native-navigation';
const RNFS = require('react-native-fs');
const axios = require('../../../src/config/axios');
const Sound = require('react-native-sound');

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

class MyScreen extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			pickerSelection: '',
			title: '',
      content: '',
      imageUrl: 'https://pay.google.com/about/static/images/social/knowledge_graph_logo.png',
      //imageUrl: 'https://img.depor.com/files/ec_article_multimedia_gallery/uploads/2018/05/11/5af5fb33ad2dc.jpeg',
      imageLocalRoute: ''
		};
  }

	onValueChange(value) {
		this.setState({
			pickerSelection: value
		});
	}

	// Changes the active screen using redux.
	changeScreen(activeScreen) {
		this.props.changeActiveScreen({ activeScreen });
	}

	// Pushes to another screen in the navigator stack.
	pushScreen({ activeScreen, post, originScreen }) {
		let params = {
			post,
			originScreen
		};
		this.props.navigator.push({
			screen: activeScreen,
			navigatorStyle: {
				navBarHidden: true,
				tabBarHidden: true,
			},
			passProps: {
				params
			}
		});
	}

	showDrawer = () => {
		Navigation.mergeOptions('navigation.drawer.left', {
		  sideMenu: {
			left: {
			  visible: true
			}
		  }
		});
	};

	// Defines title bar's left content
	titleBarLeft() {
		return {
			content: (
				<View>
					<TouchableOpacity transparent onPress={() => this.showDrawer()}>
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
					<Text style={[Stylesheet.titleBarContent, { fontSize: 20 }]} numberOfLines={1}>
						{(this.props.currentCondo && this.props.currentCondo.userCondo) ? this.props.currentCondo.userCondo[0].UserName : ''}
					</Text>
					<Text style={[Stylesheet.titleBarContent, { fontSize: 14 }]}>
						{this.props.currentCondo && this.props.currentCondo.CondoName}
					</Text>
				</View>
			)
		};
  }

  playSong() {
    let song = new Sound(RNFS.DocumentDirectoryPath + "/piano.mp3", '', (error) =>  {
      song.play();
    });
  }

  downloadImage(fromUrl) {
    let imageName = fromUrl.split('/').pop();
    let toFile = RNFS.DocumentDirectoryPath + '/' + imageName;

    RNFS.downloadFile({ fromUrl, toFile }).promise.then((result) => {
      this.setState({ imageLocalRoute: toFile }, () => {
        console.log(this.state.imageName);
      });
      console.log(result);
    })
  }

	render() {
		return (
			<Root>
				<Container style={{ backgroundColor: colors.normalWhite }}>
					<TitleBar noShadow left={this.titleBarLeft()} body={this.titleBarBody()} bgColor={colors.brandLightBlack} />
					<Content style={{ backgroundColor: colors.normalWhite }}>
						{
							this.state.isLoading ?
								<Spinner color={colors.brandLightBlack} /> :
								<View>
									<Text style={Stylesheet.titleText}>My Screen</Text>
									<View style={Stylesheet.divisionLine}></View>

									<Button
										block
										primary
										onPress={() => {
										RNFS.downloadFile({fromUrl:'https://ccrma.stanford.edu/~jos/mp3/pno-cs.mp3', toFile: RNFS.DocumentDirectoryPath + "/piano.mp3"}).promise.then((result) => {
                        console.log(result);
											})
										}}
										style={[Stylesheet.submitBtn, { marginTop: 20, backgroundColor: colors.brandPrimary }]}>
										<Text style={{ color: colors.normalWhite, fontSize: 12, paddingRight: 10 }}>
											RNFS MP3
									  </Text>
										<Icon type="Ionicons" name="ios-add" color={colors.normalWhite} style={Stylesheet.buttonIcon} />
									</Button>

                  <Button
										block
										primary
										onPress={() => {
                      this.downloadImage(this.state.imageUrl);
										}}
										style={[Stylesheet.submitBtn, { marginTop: 20, backgroundColor: colors.brandPrimary }]}>
										<Text style={{ color: colors.normalWhite, fontSize: 12, paddingRight: 10 }}>
											RNFS IMAGE
									  </Text>
										<Icon type="Ionicons" name="ios-add" color={colors.normalWhite} style={Stylesheet.buttonIcon} />
									</Button>

                  <Button
										block
										primary
										onPress={() => {
                      this.playSong();
										}}
										style={[Stylesheet.submitBtn, { marginTop: 20, backgroundColor: colors.brandPrimary }]}>
										<Text style={{ color: colors.normalWhite, fontSize: 12, paddingRight: 10 }}>
											PLAY
									  </Text>
										<Icon type="Ionicons" name="ios-add" color={colors.normalWhite} style={Stylesheet.buttonIcon} />
									</Button>

                  <Image
                    source={ { uri: this.state.imageLocalRoute } }
                    style={ {height: 100, width: 100, borderWidth: 1, alignSelf: 'center', marginTop: 10} }
                  />
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
	changeActiveScreen
})(MyScreen);
