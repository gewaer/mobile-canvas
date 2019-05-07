// Importing package modules.
import React, { Component } from "react";
import {
	View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import Stylesheet from "./stylesheet";
import { colors } from "../../config/styles";
import { getPercentage } from '../../lib/helpers';

const deviceWidth = Dimensions.get("window").width;
const itemWidth = getPercentage(deviceWidth, 80);

interface State {
}
interface Props {
  title: string,
  style: object
}

class ExampleRow extends Component<Props, State> {

	static defaultProps = {}

  constructor(props: Props){
    super(props);
    this.state = {}
  }

  componentDidMount(){}

  componentWillUnmount(){}

	render() {
    const {
      title,
      style
    } = this.props;

		return (
      <View style={ style }>
        <Text>I am { title } in a SwipeListView</Text>
      </View>
		);
	}
}

export default ExampleRow;
