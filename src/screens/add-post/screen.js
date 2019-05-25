// Importing package modules.
import React, { Component } from 'react';

import {
	View,
	Platform,
	TouchableOpacity,
	Alert,
	ScrollView
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
} from '../../modules/Session';
import Stylesheet from './stylesheet';
//import AddFileButton from '../../components/add-file-button';
import FilePlaceholder from '../../components/file-placeholder';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import * as mime from 'react-native-mime-types';
import { normalizeFile } from '../../utils/helpers';
import { Navigation } from 'react-native-navigation';
import { SIDEMENU } from '..';

const axios = require('../../../src/config/axios');

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

class AddPost extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			pickerSelection: '',
			title: '',
			content: '',
			files: [],
			isCreatingPost: false,
			iconsByMime: [
				{
					mime: 'application/pdf',
					icon: 'file-pdf',
					iconType: 'MaterialCommunityIcons'
				},
				{
					mime: 'application/msword',
					icon: 'file-document',
					iconType: 'MaterialCommunityIcons'
				},
				{
					mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					icon: 'file-document',
					iconType: 'MaterialCommunityIcons'
				},
				{
					mime: 'application/vnd.ms-excel',
					icon: 'file-excel-o',
					iconType: 'FontAwesome'
				},
				{
					mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					icon: 'file-excel-o',
					iconType: 'FontAwesome'
				}
			]
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
		Navigation.mergeOptions(SIDEMENU, {
		  sideMenu: {
			left: {
			  visible: true
			}
		  }
		});
	  };

	getPost(postId) {
		axios.get(`/myUrl/${postId}`)
			.then((response) => {
				this.pushScreen({ activeScreen: 'vv.PostDetail', post: response.data, originScreen: 'vv.AddPost' });
				this.setState({ isCreatingPost: false });
			})
			.catch((error) => {
				console.log(error);
				this.setState({ isCreatingPost: false });
			})
	}

	createPost = () => {
		if (!this.state.isCreatingPost) {
			const content = this.state.content.trim();
			const title = this.state.title.trim();
			const data = new FormData();
			// data.append('CondoId', this.props.currentCondo.CondoId);
			// data.append('SectId', this.props.sections[this.state.pickerSelection + 1].SectId);
			data.append('BlogTitle', title);
			data.append('BlogText', content);
			if (this.state.files.length) {
				const files = this.state.files;
				files.map((file) => {
					data.append(file.name, file)
				})
			}

			axios({
				url: `/myUrl`,
				method: "POST",
				data,
				headers: {
					'headerKey': 'headerContent'
				}
			}).then((response) => {
				this.setState({ title: '', content: '', pickerSelection: '' }, () => {
					this.getPost(response.data.BlogId)
				})
			}).catch((error) => {
				Alert.alert(
					"Error",
					"No se ha podido crear el post.", [
						{
							text: "OK",
							onPress: () => {
								this.setState({ isCreatingPost: false })
							}
						}
					], {
						cancelable: false
					}
				);
			})
		}
	}

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

	sectionItems() {
		return this.props.sections.filter(section => section.SectCode).map((section, index) => {
			return (
				<Picker.Item
					key={index}
					value={index}
					label={section.SectName}
				/>
			);
		})
	}

	showFilePicker() {
		DocumentPicker.show({
			filetype: [DocumentPickerUtil.allFiles()],
		},
			(error, file) => {
				if (file) {
					const normalizedFile = normalizeFile(file.uri, Platform.OS == 'ios' ? mime.lookup(file.uri) : file.type, file.fileName);
					this.setState({ files: this.state.files.concat(normalizedFile) });
				}
			})
	}

	showImagePicker() {
		ImagePicker.openPicker({
			multiple: false,
		}).then(image => {
			const normalizedFile = normalizeFile(
				Platform.OS == 'ios' ? image.sourceURL : image.path,
				image.mime,
				Platform.OS == 'ios' ? image.filename : image.path.split('/').pop()
			);
			this.setState({ files: this.state.files.concat(normalizedFile) });
		});
	}

	showCamera() {
		ImagePicker.openCamera({
			cropping: true
		}).then(image => {
			const normalizedFile = normalizeFile(image.path, image.mime, image.path.split('/').pop());
			this.setState({ files: this.state.files.concat(normalizedFile) });
		});
	}

	removeFile(index) {
		let files = cloneDeep(this.state.files);
		files.splice(index, 1);
		this.setState({ files });
	}

	handleIosAttachment = (index) => {
		if (index == 0) {
			this.showCamera()
		} else if (index == 1) {
			this.showImagePicker()
		} else if (index == 2) {
			this.showFilePicker()
		}
	}

	handleAndroidAttachment = (index) => {
		if (index == 0) {
			this.showCamera()
		} else if (index == 1) {
			this.showFilePicker()
		}
	}

	displayButton() {
		const isDisabled = !(this.state.title.trim() && this.state.content.trim() && this.state.pickerSelection !== '');

		return (
			this.state.isCreatingPost ?
				<Spinner color={colors.brandLightBlack} /> :
				<Button
					disabled={isDisabled}
					block
					primary
					onPress={() => { this.setState({ isCreatingPost: true }, this.createPost()) }}
					style={[Stylesheet.submitBtn, { marginTop: 20, backgroundColor: isDisabled ? '#B5B5B5' : colors.brandPrimary }]}>
					<Text style={{ color: colors.normalWhite, fontSize: 12, paddingRight: 10 }}>
						Create
				</Text>
					<Icon type="Ionicons" name="ios-add" color={colors.normalWhite} style={Stylesheet.buttonIcon} />
				</Button>
		)
	}

	displayAddFile() {
		return (
			<Button
				style={[Stylesheet.addFileButton]}
				onPress={() => {
					Platform.OS == 'ios' ?
						ActionSheet.show(
							{
								title: '¿Imagen o Archivo?',
								options: ['Cámara', 'Imagen', 'Archivo', 'Cancelar'],
								cancelButtonIndex: 3
							},
							buttonIndex => {
								this.handleIosAttachment(buttonIndex);
							}
						) :
						ActionSheet.show(
							{
								title: 'Adjuntar',
								options: ['Cámara', 'Teléfono', 'Cancelar'],
								cancelButtonIndex: 2
							},
							buttonIndex => {
								this.handleAndroidAttachment(buttonIndex);
							}
						)

				}}
			>
				<Icon type="Ionicons" name="ios-add" color={colors.normalWhite} style={Stylesheet.buttonIcon} />
			</Button>
		)
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
									<Text style={Stylesheet.titleText}>Add Post</Text>
									<View style={Stylesheet.divisionLine}></View>
									<View style={Stylesheet.containerView}>
										<Form>
											<Text style={Stylesheet.labelText}>Picker:</Text>
											<View style={[{ width: "100%", borderColor: colors.brandSecondary, borderRadius: 0 }, Stylesheet.formItem]}>
												<Picker
													textStyle={{ fontSize: 12, color: this.state.pickerSelection !== '' ? 'black' : colors.brandLightGray }} //IOS
													mode="dropdown"
													iosIcon={<Icon type="Ionicons" name="ios-arrow-down" style={globalStyle.pickerIcon} />}
													style={[{ width: "100%", height: 27.5 }]}
													placeholder="Select..."
													placeholderStyle={{ color: colors.brandLightGray, fontSize: 12 }}
													placeholderIconColor="#007aff"
													selectedValue={this.state.pickerSelection}
													onValueChange={(itemValue) => this.onValueChange(itemValue)}
												>
													<Picker.Item value='' label='Select...' color={colors.brandLightGray} />
													{
														//this.sectionItems()
													}
													<Picker.Item label="Wallet" value="key0" />
													<Picker.Item label="ATM Card" value="key1" />
													<Picker.Item label="Debit Card" value="key2" />
													<Picker.Item label="Credit Card" value="key3" />
													<Picker.Item label="Net Banking" value="key4" />
												</Picker>
											</View>
											<Text style={Stylesheet.labelText}>Title:</Text>
											<Input
												value={this.state.title}
												placeholderTextColor={colors.brandLightGray}
												style={[Stylesheet.formInput, { height: Platform.OS == 'ios' ? 29.5 : 35 }]}
												placeholder="Add title..."
												onChangeText={(title) => this.setState({ title: title })}
											/>
											<Text style={Stylesheet.labelText}>Content:</Text>
											<Input
												value={this.state.content}
												placeholderTextColor={colors.brandLightGray}
												style={[Stylesheet.formInput, { height: Platform.OS == 'ios' ? 142.5 : 120 }]}
												multiline={true} placeholder="Add description..."
												onChangeText={(content) => this.setState({ content: content })}
											/>
										</Form>
										<Text style={[Stylesheet.labelText, { marginBottom: 8 }]}>Attach image or file:</Text>
										<ScrollView horizontal={true} style={ { flexDirection: 'row', height: 65 } }>
											{ this.displayAddFile() }
											{ this.state.files.map((file, index) => {
													const iconJson = this.state.iconsByMime.find(iconJson => iconJson.mime == Platform.OS == 'ios' ? mime.lookup(file.uri) : file.type);
													return(
														<FilePlaceholder
															key = { index }
															isImage = { file.type.includes('image') }
															source = { file.uri }
															onRemovePress = { () => { this.removeFile(index) } }
															displayRemove = { true }
															icon = { iconJson }
															fileName = { file.name }
														/>
													);
												})
											}
										</ScrollView>
									</View>
									<View style={Stylesheet.divisionLine}></View>
									{this.displayButton()}
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
})(AddPost);
