import React, { Component } from "react";
import { View, Platform, TouchableOpacity, FlatList } from "react-native";
import {
  Button,
  Icon,
  ListItem,
  Body,
  Left,
  Content,
  Container,
  Spinner,
  Text
} from "native-base";
import { colors, paddingHelpers } from "../../config/styles";
import {
  changeActiveScreen,
  changeActiveFamily,
  changeActiveCompany
} from "../../modules/Session";
import { connect } from "react-redux";
const axios = require("../../../src/config/axios");
const platform = Platform.OS;
import TitleBar from "../../components/title-bar";
import getStore from "../../modules/store";
import StyleSheet from "./stylesheet";
import { Navigation } from "react-native-navigation";
import { ADD_COMPANY, SIDEMENU, COMPANY_INFO } from "..";
import { pushScreen, showModal } from "@utils/nav";

class Company extends Component {
  state = {
    isLoading: true,
    companies: []
  };

  componentDidMount() {
    this.getCompanies();
  }

  changeScreen(company) {
    pushScreen(this.props.componentId, COMPANY_INFO, { company });
  }

  changeActiveFamily(company) {
    this.props.changeActiveCompany({ company });
    this.setState({ isLoading: true }, () => this.getCompanies());
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabIndex: 0,
        animate: true
      }
    });
  }

  getCompanies = () => {
    axios
      .get(`/companies`)
      .then(response => {
        this.setState({ companies: response.data, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  openAddCompanyModal() {
    showModal(this.props.componentId, ADD_COMPANY, {
      companyCreatedAction: this.getCompanies
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

  titleBarLeft() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <Button transparent onPress={() => this.showDrawer()}>
            <Icon
              type={"MaterialIcons"}
              name={"menu"}
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
        <View style={[StyleSheet.titleBarContent]}>
          <TouchableOpacity onPress={() => this.openAddCompanyModal()}>
            <Text style={{ color: "#fff", paddingLeft: 0, fontSize: 16 }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      )
    };
  }

  rowContent(company) {
    return (
      <ListItem
        style={StyleSheet.listItem}
        onPress={() => this.changeScreen(company)}
        icon
      >
        <Left
          style={{ maxWidth: 40 }}
          onPress={() => {
            this.changeActiveFamily(company);
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.changeActiveFamily(company);
            }}
          >
            {company && company.id == this.props.company.id ? (
              <Icon
                type={"FontAwesome"}
                name={"check-circle"}
                style={{ color: colors.brandGreen, fontSize: 22 }}
              />
            ) : (
              <Icon
                type={"FontAwesome"}
                name={"circle-o"}
                style={{ color: colors.brandGrey, fontSize: 22 }}
              />
            )}
          </TouchableOpacity>
        </Left>
        <Body>
          <View style={StyleSheet.textContainer}>
            <Text style={StyleSheet.dataTextTitle}>{company.name}</Text>
          </View>
        </Body>
      </ListItem>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <TitleBar left={this.titleBarLeft()} body={titleBarbody} />
          <Content>
            <View style={{ margin: "auto" }}>
              <Spinner />
            </View>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <TitleBar
            left={this.titleBarLeft()}
            body={titleBarbody}
            right={this.titleBarRight()}
          />
          <Content>
            <View style={StyleSheet.positionR}>
              <FlatList
                bounces
                data={this.state.companies}
                renderItem={({ item }) => this.rowContent(item)}
                initialNumToRender={8}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={30}
                onEndReachedThreshold={0.6}
                keyExtractor={item => item.id}
                removeClippedSubviews={false}
                windowSize={25}
              />
              {!this.state.companies.length && (
                <View style={{ marginTop: paddingHelpers.N }}>
                  <Text style={{ marginTop: 10, textAlign: "center" }}>
                    This user has not registered companies
                  </Text>
                  <View style={StyleSheet.btnContainer}>
                    <Button
                      block
                      style={StyleSheet.addBtn}
                      onPress={() => this.openAddCompanyModal()}
                    >
                      <Text style={StyleSheet.addText}>Add Company</Text>
                    </Button>
                  </View>
                </View>
              )}
            </View>
          </Content>
        </Container>
      );
    }
  }
}

const titleBarbody = {
  content: (
    <View style={StyleSheet.titleBarContent}>
      <Text
        style={{
          color: "#fff",
          paddingLeft: platform === "ios" ? 0 : 10,
          fontSize: platform === "ios" ? 18 : 19.64
        }}
      >
        Companies
      </Text>
    </View>
  )
};

const mapStateToProps = state => {
  return {
    token: state.session.token,
    user: state.session.user,
    selectedCompanyId: state.session.selectedCompanyId,
    company: state.session.company
  };
};

const mapDispatchToProps = {
  changeActiveScreen,
  changeActiveFamily,
  changeActiveCompany
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);
