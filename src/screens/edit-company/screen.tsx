// Importing package modules.
import React, { Component } from "react";
import { connect } from "react-redux";
const axios = require("../../../src/config/axios");
import {
  View,
  Platform,
  TouchableOpacity,
  BackHandler,
  Keyboard
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
} from "native-base";
import { colors } from "../../config/styles";
import TitleBar from "../../components/title-bar";
import { changeActiveCompany } from "../../modules/Session";
const platform = Platform.OS;
import StyleSheet from "./stylesheet";
import { pop, popToRoot } from "@utils/nav";

/*
	Screen Name: Edit Company.
	Description: This screen is used to edit a company's information.
*/
class EditCompany extends Component {
  state = {
    companyName: "",
    companyWebsite: "",
    isLoading: true,
    company: {}
  };

  componentDidMount() {
    this.setState({
      companyName: this.props.company.name,
      companyWebsite: this.props.company.website || "",
      company: this.props.company,
      isLoading: false
    });
    // Creates an event listener for Android's back button.
    BackHandler.addEventListener("hardwareBackPress", () =>
      pop(this.props.componentId)
    );
  }

  // Verifies if all required fields are filled.
  canEdit() {
    return this.state.companyName.length && this.state.companyWebsite.length;
  }

  // Prepares data to be sent to the API.
  // <params> data: Data to be formatted.
  formatFormData(data) {
    let formData = [];
    for (let property in data) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(data[property]);
      formData.push(encodedKey + "=" + encodedValue);
    }
    formData = formData.join("&");
    return formData;
  }

  // Handles company info update process.
  updateCompanyInfo() {
    Keyboard.dismiss();
    if (!this.canEdit()) {
      Toast.show({
        text: "Please fill the empty fields!",
        buttonText: "Ok",
        duration: 3000,
        type: "danger"
      });
      return;
    }

    this.setState({ isLoading: true });

    let data = {
      name: this.state.companyName,
      website: this.state.companyWebsite
    };

    axios
      .put(`/companies/${this.state.company.id}`, this.formatFormData(data))
      .then(response => {
        if (this.props.selectedCompany.id == response.data.id) {
          this.props.changeActiveCompany({ company: response.data });
        }
        popToRoot(this.props.componentId);
      })
      .catch(error => {
        this.setState({ isLoading: false });
        Toast.show({
          text: error.response.data.errors.message
            ? error.response.data.errors.message
            : "Error",
          buttonText: "Ok",
          duration: 3000,
          type: "danger"
        });
      });
  }

  // Defines title bar's body content.
  titleBarbody() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <Text
            style={{
              color: "#fff",
              paddingLeft: platform === "ios" ? 0 : 10,
              fontSize: platform === "ios" ? 18 : 19.64
            }}
          >
            {this.state.company.name}
          </Text>
        </View>
      )
    };
  }

  // Defines title bar's left content.
  titleBarLeft() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <Button transparent onPress={() => pop(this.props.componentId)}>
            <Icon
              type={"MaterialIcons"}
              name={"chevron-left"}
              style={{ color: "#fff", fontSize: platform === "ios" ? 22 : 24 }}
            />
          </Button>
        </View>
      )
    };
  }

  // Defines title bar's right content.
  titleBarRight() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <TouchableOpacity
            onPress={() => {
              this.updateCompanyInfo();
            }}
          >
            <Text
              style={{
                color: "#fff",
                paddingLeft: 0,
                fontSize: 16,
                textAlign: "right"
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      )
    };
  }

  // Gets the company's image cover.
  getImageCover() {
    return (
      this.state.company.profile_image ||
      "https://d3bza9ldbeb18h.cloudfront.net/assets/placeholder-company-b9d0a167b1f7460768517d115285de2337c6e2a84f4285617722efa587c693fc.png"
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Root>
            <TitleBar left={this.titleBarLeft()} body={this.titleBarbody()} />
            <Content>
              <View style={{ margin: "auto" }}>
                <Spinner />
              </View>
            </Content>
          </Root>
        </Container>
      );
    } else {
      return (
        <Container>
          <Root>
            <TitleBar
              left={this.titleBarLeft()}
              body={this.titleBarbody()}
              right={this.titleBarRight()}
            />
            <Content padder>
              <View>
                <View style={StyleSheet.container}>
                  <Thumbnail
                    source={{ uri: this.getImageCover() }}
                    style={StyleSheet.companyLogo}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View style={StyleSheet.positionR}>
                <Item stackedLabel style={StyleSheet.formItem}>
                  <Label
                    style={[
                      StyleSheet.formLabel,
                      { fontSize: 12, color: colors.brandBlack }
                    ]}
                  >
                    Name
                  </Label>
                  <Input
                    style={StyleSheet.formInput}
                    value={this.state.companyName}
                    autoCapitalize
                    onChangeText={name => this.setState({ companyName: name })}
                    onSubmitEditing={() => {
                      this.website._root.focus();
                    }}
                  />
                </Item>
                <Item stackedLabel style={StyleSheet.formItem}>
                  <Label
                    style={[
                      StyleSheet.formLabel,
                      { fontSize: 12, color: colors.brandBlack }
                    ]}
                  >
                    Website
                  </Label>
                  <Input
                    style={StyleSheet.formInput}
                    autoCapitalize={false}
                    value={this.state.companyWebsite}
                    onChangeText={website =>
                      this.setState({ companyWebsite: website })
                    }
                    ref={input => {
                      this.website = input;
                    }}
                  />
                </Item>
              </View>
            </Content>
          </Root>
        </Container>
      );
    }
  }
}

// Maps redux's state variables to this class' props.
const mapStateToProps = state => {
  return {
    token: state.session.token,
    user: state.session.user,
    selectedCompany: state.session.company
  };
};

const mapDispatchToProps = {
  changeActiveCompany
};

// Connects redux actions to this class' props.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCompany);
