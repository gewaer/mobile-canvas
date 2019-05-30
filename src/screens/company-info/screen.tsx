import React, { Component } from "react";
import { View, Platform, TouchableOpacity, BackHandler } from "react-native";
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
import { connect } from "react-redux";
import moment from "moment";
import TitleBar from "../../components/title-bar";
import StyleSheet from "./stylesheet";
const platform = Platform.OS;
import { EDIT_COMPANY } from "..";
import { popTo, push, pop } from "@utils/nav";

class CompanyInfo extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () =>
      popTo(this.props.componentId)
    );
  }

  titleBarBody() {
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
            {this.props.company.name}
          </Text>
        </View>
      )
    };
  }

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

  titleBarRight() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <TouchableOpacity
            onPress={() =>
              push(this.props.componentId, EDIT_COMPANY, {
                company: this.props.company
              })
            }
          >
            <Text
              style={{
                color: "#fff",
                paddingLeft: 0,
                fontSize: 16,
                textAlign: "right"
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      )
    };
  }

  getImageCover() {
    return (
      this.props.company.profile_image ||
      "https://d3bza9ldbeb18h.cloudfront.net/assets/placeholder-company-b9d0a167b1f7460768517d115285de2337c6e2a84f4285617722efa587c693fc.png"
    );
  }

  render() {
    if (!this.props.company) {
      return (
        <Container>
          <TitleBar />
          <Content
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Spinner />
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <Root>
          <TitleBar
            left={this.titleBarLeft()}
            body={this.titleBarBody()}
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
                  value={this.props.company.name || ""}
                  disabled
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
                  value={
                    this.props.company.website
                      ? this.props.company.website
                      : "N/A"
                  }
                  disabled
                />
              </Item>
              <Item stackedLabel style={StyleSheet.formItem}>
                <Label
                  style={[
                    StyleSheet.formLabel,
                    { fontSize: 12, color: colors.brandBlack }
                  ]}
                >
                  Creation Date
                </Label>
                <Input
                  style={StyleSheet.formInput}
                  value={moment(this.props.company.created_at).format(
                    "MM/DD/YYYY"
                  )}
                  disabled
                />
              </Item>
            </View>
          </Content>
        </Root>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.session.user
  };
};

export default connect(
  mapStateToProps,
  null
)(CompanyInfo);
