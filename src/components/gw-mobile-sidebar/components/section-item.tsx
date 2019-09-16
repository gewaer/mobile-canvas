import React from "react";
import { View, StyleSheet, Image, Linking } from "react-native";
import { Body, Text, ListItem} from "native-base";
import { IResource } from "../types";
import { changeTab, forcePush } from "../utils/nav";
import * as screens from "@screens";

interface Props {
  readonly item: IResource;
  readonly sectionItemTextStyle: object;
  readonly onPressAction?: () => void;
  readonly componentId: string;
}

const styles = StyleSheet.create({
  listItemDarkBorder: {
    marginLeft: 0,
    paddingLeft: 16,
    paddingTop: 0,
    paddingBottom: 0,
    height: 40
  },
  itemIconContainer: {
    width: 30,
    alignItems: "center"
  },
  listIcon: {
    width: 18,
    height: 18
  },
  textIcon: {
    color: "white",
    fontSize: 18
  }
});

const firstLetter = (value: string) => {
  return value.charAt(0).toUpperCase();
};

const handlePress = (resource: IResource, componentId: string) => {
  switch (resource.mobile_navigation_type) {
    case "tab":
      changeTab(screens.DASHBOARD, Number(resource.mobile_tab_index));
      break;
    case "screen":
      forcePush(screens.DASHBOARD, componentId);
      break;
    case "link":
      Linking.openURL(resource.mobile_component_type);
      break;
    case "app":
      // code block
      break;
  }
};

const SectionItem = (props: Props) => {
  return (
    <ListItem
      style={styles.listItemDarkBorder}
      onPress={() => handlePress(props.item, props.componentId)}
    >
      <View style={styles.itemIconContainer}>
        {props.item.icon ? (
          <Image source={{ uri: props.item.icon }} style={styles.listIcon} />
        ) : (
          <Text style={styles.textIcon}>{firstLetter(props.item.slug)}</Text>
        )}
      </View>
      <Body>
        <View>
          <Text style={props.sectionItemTextStyle}>{props.item.name}</Text>
        </View>
      </Body>
    </ListItem>
  );
};

export default SectionItem;
