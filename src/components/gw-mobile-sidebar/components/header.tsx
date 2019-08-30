import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";


interface Props {
  readonly userName?: string;
  readonly companyName?: string;
  readonly customHeader?: any;
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
    fontSize: 16,
    color: "white"
  },
  subTitle: {
    color: "#1F9AA7",
    fontSize: 12,
    fontStyle: "italic"
  },
});

const Header = (props: Props) => {
  if (props.customHeader) {
    return props.customHeader;
  }
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <Icon
          type={"Ionicons"}
          name={"ios-contact"}
          style={styles.userIcon}
        />
      </TouchableOpacity>
      <View style={styles.userDataContainer}>
        <Text style={styles.title}>{props.userName}</Text>
        <Text style={styles.subTitle}>{props.companyName}</Text>
      </View>
    </View>
  );
}

export default Header;
