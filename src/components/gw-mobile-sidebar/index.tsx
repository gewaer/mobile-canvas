import React, { Component } from 'react';
import { View, FlatList } from "react-native";
import StyleSheet from './stylesheet';
import { IProps, IResource } from "./types";
import * as screens from "@screens";
import { changeTab } from "@utils/nav";

import Header from "./components/header"
import SectionItem from "./components/section-item";

export default class GwMobileSidebar extends Component<IProps> {
  static defaultProps = {
    resources: [
      {
        id: "0",
        name: "Dashboard",
        slug: "dashboard",
        mobile_component_type: "browse",
        mobile_navigation_type: "tab",
        mobile_tab_index: "0"
      },
      {
        id: "1",
        name: "Companies",
        slug: "companies",
        mobile_component_type: "https://ginnyapp.com/terms",
        mobile_navigation_type: "screen"
      },
      {
        id: "2",
        name: "Users",
        slug: "users",
        mobile_component_type: "browse",
        mobile_navigation_type: "tab",
        mobile_tab_index: "1"
      }
    ],
    headerUserName: "Joanne Doe",
    headerCompanyName: "mctekk",
    sectionItemTextStyle: StyleSheet.navItemStyle,
    customHeader: null,
    customSectionItem: null,
    sidebarBackgroundColor: "#51007a",
    sectionItemTextColor: "white",
    headerBackgroundColor: "#51007a",
    headerTextColor: "white",
    activeComponentId: screens.SIDEMENU
  }

  renderHeader() {
    if (this.props.customHeader) {
      return this.props.customHeader;
    }
    return (
      <Header
        userName={this.props.headerUserName}
        companyName={this.props.headerCompanyName}
        backgroundColor={this.props.headerBackgroundColor}
        textColor={this.props.headerTextColor}
      />
    );
  }

  renderItem = ({ item } : IResource) => {
    if (this.props.customSectionItem) {
      return this.props.customSectionItem(item);
    }
    return (
      <SectionItem
        item={item}
        componentId={this.props.activeComponentId}
        sectionItemTextStyle={[this.props.sectionItemTextStyle, { color: this.props.sectionItemTextColor }]}
      />
    );
  }

  keyExtractor = (item: IResource) => item.id;

  render() {
    return (
      <View
        style={[
          StyleSheet.container,
          { backgroundColor: this.props.sidebarBackgroundColor }
        ]}
      >
        {this.renderHeader()}
        <View style={StyleSheet.listContainer}>
          <FlatList
            data={this.props.resources}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}
