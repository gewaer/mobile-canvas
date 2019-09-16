import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
import { string } from "prop-types";


interface Props {
  readonly userName: string;
  readonly companyName: string;
  readonly backgroundColor: string;
  readonly textColor: string;
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 0.6,
    borderBottomColor: "#707070",
    paddingBottom: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
    paddingTop: 25
  },
  userIcon: {
    color: "white",
    fontSize: 48,
    marginRight: 12,
    marginBottom: -9
  },
  userDataContainer: {
    marginTop: 10,
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 16
  },
  subTitle: {
    color: "#1F9AA7",
    fontSize: 12,
    fontStyle: "italic"
  },
});

const Header = (props: Props) => {
  return (
    <View style={[styles.itemContainer, { backgroundColor: props.backgroundColor }]}>
      <TouchableOpacity>
        <Icon
          type={"Ionicons"}
          name={"ios-contact"}
          style={styles.userIcon}
        />
      </TouchableOpacity>
      <View style={styles.userDataContainer}>
        <Text style={[styles.title, { color: props.textColor }]}>{props.userName}</Text>
        <Text style={styles.subTitle}>{props.companyName}</Text>
      </View>
    </View>
  );
}

export default Header;
