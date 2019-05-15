// Importing package modules.
import React, { Component } from "react";

import {
  View,
  Platform,
  TouchableOpacity,
  Alert,
  ScrollView,
  ListView,
  Image,
  Modal
} from "react-native";

import {
  Button,
  Text,
  Content,
  Container,
  Spinner,
  Icon,
  Root,
  List,
  ListItem,
  SwipeRow
} from "native-base";

import { connect } from "react-redux";
import TitleBar from "../../components/title-bar";
import cloneDeep from "lodash/cloneDeep";
import _ from "lodash";
import { globalStyle, colors } from "../../../src/config/styles";

// Importing Redux's actions
import { changeActiveScreen } from "../../modules/Session";
import Stylesheet from "./stylesheet";
import { Navigation } from "react-native-navigation";
import { SwipeListView } from "react-native-swipe-list-view";
import MyCarousel from "../../components/carousel";
import AudioPlayer from "../../components/audio-player";
import ExampleRow from "../../components/example-swipe-row";
import BackRow from "../../components/swipe-back-row";
import ConfirmationCard from "../../components/confirmation-card";
const RNFS = require("react-native-fs");
const axios = require("../../../src/config/axios");
const Sound = require("react-native-sound");

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;
const datas = ["Simon Mignolet", "Nathaniel Clyne", "Dejan Lovren"];
interface State {
  isLoading: String;
}
interface Props {}
class MyScreen extends Component<State, Props> {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      pickerSelection: "",
      title: "",
      content: "",
      imageUrl:
        "https://pay.google.com/about/static/images/social/knowledge_graph_logo.png",
      //imageUrl: 'https://img.depor.com/files/ec_article_multimedia_gallery/uploads/2018/05/11/5af5fb33ad2dc.jpeg',
      imageLocalRoute: "",
      basic: true,
      listViewData: datas,
      sliderActiveSlide: 0,
      entries: [
        {
          uri:
            "https://media.idownloadblog.com/wp-content/uploads/2017/11/iOS-stock-21-for-iPhone-X.jpeg"
        },
        {
          uri:
            "https://i.pinimg.com/originals/9d/16/60/9d1660c1d5e9610c60cbdb99080b420a.jpg"
        },
        {
          uri:
            "https://i.pinimg.com/originals/9d/16/60/9d1660c1d5e9610c60cbdb99080b420a.jpg"
        },
        {
          uri:
            "https://i.pinimg.com/originals/9d/16/60/9d1660c1d5e9610c60cbdb99080b420a.jpg"
        }
      ],
      isModalVisible: false
    };
  }

  componentDidMount() {
    Sound.setCategory("Playback");
  }

  onValueChange(value) {
    this.setState({
      pickerSelection: value
    });
  }

  // Changes the active screen using redux.
  changeScreen(screen) {
    // add Push to parames
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
        tabBarHidden: true
      },
      passProps: {
        params
      }
    });
  }

  showDrawer = () => {
    Navigation.mergeOptions("navigation.drawer.left.tab", {
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
            <Icon
              type={"Ionicons"}
              name={"ios-menu"}
              style={{ color: "white", width: 22 }}
            />
          </TouchableOpacity>
        </View>
      )
    };
  }

  // Defines title bar's body content
  titleBarBody() {
    return {
      content: (
        <View style={Stylesheet.titleBarContent}>
          <Text
            style={{
              color: "#fff",
              paddingLeft: platform === "ios" ? 0 : 10,
              fontSize: platform === "ios" ? 18 : 19.64
            }}
          >
            My Screen
          </Text>
        </View>
      )
    };
  }

  playSong() {
    let song = new Sound(
      RNFS.DocumentDirectoryPath + "/piano.mp3",
      "",
      error => {
        song.play();
      }
    );
  }

  downloadImage(fromUrl) {
    let imageName = fromUrl.split("/").pop();
    let toFile = RNFS.DocumentDirectoryPath + "/" + imageName;

    RNFS.downloadFile({ fromUrl, toFile }).promise.then(result => {
      this.setState({ imageLocalRoute: toFile }, () => {
        console.log(this.state.imageName);
      });
      console.log(result);
    });
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  displaySwipeList() {
    return (
      <SwipeListView
        useFlatList
        data={this.state.listViewData}
        renderItem={(data, rowMap) => (
          <ExampleRow title={data.item} style={Stylesheet.rowFront} />
        )}
        renderHiddenItem={(data, rowMap) => (
          <BackRow
            style={Stylesheet.rowBack}
            canEdit={true}
            buttonWidth={60}
            onDeletePress={() => {
              this.setState({ isModalVisible: true });
            }}
          />
        )}
        leftOpenValue={0}
        rightOpenValue={-120}
      />
    );
  }

  modalView() {
    return (
      <Modal
        transparent={true}
        visible={this.state.isModalVisible}
        animationType="slide"
      >
        <View style={Stylesheet.modalContainer}>
          <ConfirmationCard
            title="Delete Card"
            subTitle="Are you sure you want to erase this Card?"
            onCancelPress={() => {
              this.setState({ isModalVisible: false });
            }}
          />
        </View>
      </Modal>
    );
  }

  _renderItem({ item, index }) {
    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  }

  render() {
    return (
      <Root>
        <Container style={{ backgroundColor: colors.brandPrimaryAlter }}>
          <TitleBar
            noShadow
            left={this.titleBarLeft()}
            body={this.titleBarBody()}
            bgColor={colors.brandLightBlack}
          />
          <ScrollView style={{ backgroundColor: colors.brandSecondary }}>
            {this.state.isLoading ? (
              <Spinner color={colors.brandLightBlack} />
            ) : (
              <View>
                <MyCarousel
                  entries={this.state.entries}
                  activeSlide={this.state.sliderActiveSlide}
                  onSnapToItem={index =>
                    this.setState({ sliderActiveSlide: index })
                  }
                />
                <View style={{ marginHorizontal: 12 }}>
                  {this.displaySwipeList()}
                  {this.modalView()}
                </View>
                <Button
                  block
                  primary
                  onPress={() => {
                    RNFS.downloadFile({
                      fromUrl: "https://ccrma.stanford.edu/~jos/mp3/pno-cs.mp3",
                      toFile: RNFS.DocumentDirectoryPath + "/piano.mp3"
                    }).promise.then(result => {
                      console.log(result);
                    });
                  }}
                  style={[
                    Stylesheet.submitBtn,
                    { marginTop: 20, backgroundColor: colors.brandPrimary }
                  ]}
                >
                  <Text
                    style={{
                      color: colors.normalWhite,
                      fontSize: 12,
                      paddingRight: 10
                    }}
                  >
                    RNFS MP3
                  </Text>
                  <Icon
                    type="Ionicons"
                    name="ios-add"
                    color={colors.normalWhite}
                    style={Stylesheet.buttonIcon}
                  />
                </Button>

                <Button
                  block
                  primary
                  onPress={() => {
                    this.downloadImage(this.state.imageUrl);
                  }}
                  style={[
                    Stylesheet.submitBtn,
                    { marginTop: 20, backgroundColor: colors.brandPrimary }
                  ]}
                >
                  <Text
                    style={{
                      color: colors.normalWhite,
                      fontSize: 12,
                      paddingRight: 10
                    }}
                  >
                    RNFS IMAGE
                  </Text>
                  <Icon
                    type="Ionicons"
                    name="ios-add"
                    color={colors.normalWhite}
                    style={Stylesheet.buttonIcon}
                  />
                </Button>

                <Button
                  block
                  primary
                  onPress={() => {
                    this.playSong();
                  }}
                  style={[
                    Stylesheet.submitBtn,
                    { marginTop: 20, backgroundColor: colors.brandPrimary }
                  ]}
                >
                  <Text
                    style={{
                      color: colors.normalWhite,
                      fontSize: 12,
                      paddingRight: 10
                    }}
                  >
                    PLAY
                  </Text>
                  <Icon
                    type="Ionicons"
                    name="ios-add"
                    color={colors.normalWhite}
                    style={Stylesheet.buttonIcon}
                  />
                </Button>
                <Image
                  source={{ uri: this.state.imageLocalRoute }}
                  style={{
                    height: 100,
                    width: 100,
                    borderWidth: 1,
                    alignSelf: "center",
                    marginTop: 10
                  }}
                />
                <AudioPlayer
                  title="Pianito"
                  filepath="https://ccrma.stanford.edu/~jos/mp3/tenor-sax.mp3"
                />
              </View>
            )}
          </ScrollView>
        </Container>
      </Root>
    );
  }
}

// Maps redux's state variables to this class' props
const mapStateToProps = state => {
  return {
    state: state
  };
};

// Connects redux actions to this class' props
export default connect(
  mapStateToProps,
  {
    changeActiveScreen
  }
)(MyScreen);
