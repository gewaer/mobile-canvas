import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Body, Text, ListItem} from "native-base";
import { IResource } from "../types";

interface Props {
  readonly item: IResource;
  readonly customSectionItem: any;
  readonly sectionItemTextStyle: object;
  readonly onPressAction: () => void;
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

const SectionItem = (props: Props) => {
  if (props.customSectionItem) {
    return props.customSectionItem;
  }
  return (
    <ListItem
      style={styles.listItemDarkBorder}
      onPress={props.onPressAction}
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
