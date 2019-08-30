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
        slug: "dashboard"
      },
      {
        id: "1",
        name: "Companies",
        slug: "companies"
      },
      {
        id: "2",
        name: "Users",
        slug: "users"
      }
    ],
    headerUserName: "Joanne Doe",
    headerCompanyName: "mctekk",
    sectionItemTextStyle: StyleSheet.navItemStyle,
    customHeader: null,
    customSectionItem: null,
    sidebarBackgroundColor: "#51007a",
    sectionItemTextColor: "white"
  }

  renderItem = ({ item } : IResource) => {
    return (
      <SectionItem
        item={item}
        onPressAction={() => changeTab(screens.DASHBOARD, Number(item.id))}
        sectionItemTextStyle={[this.props.sectionItemTextStyle, { color: this.props.sectionItemTextColor }]}
        customSectionItem={this.props.customSectionItem}
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
        <Header
          userName={this.props.headerUserName}
          companyName={this.props.headerCompanyName}
          customHeader={this.props.customHeader}
        />
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
