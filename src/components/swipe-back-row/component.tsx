// Importing package modules.
import React, { Component } from "react";
import {
	View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import { Button, Icon } from "native-base";
import Stylesheet from "./stylesheet";
import { colors } from "../../config/styles";
import { getPercentage } from '../../lib/helpers';

const deviceWidth = Dimensions.get("window").width;
const itemWidth = getPercentage(deviceWidth, 80);

interface State {
}
interface Props {
  style: object,
  canEdit: boolean,
  buttonWidth: number
}

class SwipeBackRow extends Component<Props, State> {

	static defaultProps = {}

  constructor(props: Props){
    super(props);
    this.state = {}
  }

  componentDidMount(){}

  componentWillUnmount(){}

	render() {
    const {
      style,
      canEdit,
      buttonWidth,
      onDeletePress
    } = this.props;

		return (
      <View style={ style }>
        <TouchableOpacity style={ [{ width: buttonWidth }, Stylesheet.editButton] }>
          <Icon type="MaterialIcons"  name="mode-edit"  color={colors.normalWhite} style={ [Stylesheet.icon, { fontSize: 30 }] }/>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            [{
              width: buttonWidth,
              borderTopRightRadius: style.borderRadius ? style.borderRadius : 0,
              borderBottomRightRadius: style.borderRadius ? style.borderRadius : 0
            },
            Stylesheet.deleteButton]
          }
          onPress={ onDeletePress }
        >
          <Icon type="FontAwesome5"  name="trash"  color={colors.normalWhite} style={ [Stylesheet.icon, { fontSize: 22 }] }/>
        </TouchableOpacity>
      </View>
		);
	}
}

export default SwipeBackRow;
