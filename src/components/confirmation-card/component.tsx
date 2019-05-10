// Importing package modules.
import React, { Component } from "react";
import { View, Image, Dimensions, Text, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import Stylesheet from "./stylesheet";
import { colors } from "../../config/styles";
import { getPercentage } from "../../utils/helpers";

const deviceWidth = Dimensions.get("window").width;
const itemWidth = getPercentage(deviceWidth, 80);

interface State {}
interface Props {
  title: string;
  subTitle: string;
  onCancelPress: () => void;
}

class ConfirmationCard extends Component<Props, State> {
  static defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { title, subTitle, onCancelPress, onConfirmPress } = this.props;

    return (
      <View style={Stylesheet.container}>
        <View>
          <Text style={Stylesheet.title}>{title}</Text>
        </View>
        <View style={Stylesheet.bottomContainer}>
          <Text style={Stylesheet.subTitle}>{subTitle}</Text>
          <View style={Stylesheet.btnContainer}>
            <Button
              block
              style={[Stylesheet.submitBtnInv, { width: 120 }]}
              onPress={onCancelPress}
            >
              <Text style={Stylesheet.buttonTextDelete}>CANCEL</Text>
            </Button>
            <Button
              block
              style={[Stylesheet.submitBtn, { width: 120 }]}
              onPress={() => onConfirmPress}
            >
              <Text style={Stylesheet.buttonTextAccept}>YES</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default ConfirmationCard;
