import React from 'react';
import PropTypes from 'prop-types';
// Styles
import StyleSheet from './stylesheet';

// Native Base Components
import { Header, Left, Body, Right, Title, Text } from 'native-base';
import { StatusBar } from 'react-native';
// React Native Components
import { View } from 'react-native';
// Config Styles - Screens

import { colors } from '../../config/styles';

// Define Component for Header
const TitleBar = props => {
  const { left, body, right, backgroundColor } = props;
  return (
    <Header style={[StyleSheet.bar, { backgroundColor } ]} noShadow>
      <StatusBar
        backgroundColor={colors.brandGreen}
        barStyle="light-content"
      />
      <View style={StyleSheet.barContent}>
        <Left style={StyleSheet.titleBarLeft}>
          {left.content}
        </Left>
        <Body style={StyleSheet.titleBarBody}>
          {body.content}
        </Body>
        <Right style={StyleSheet.titleBarRight}>
          {right.content}
        </Right>
      </View>

    </Header>
  );
};
// Define Prop Types
TitleBar.propTypes = {
  left: PropTypes.object,
  body: PropTypes.object,
  right: PropTypes.object,
  backgroundColor: PropTypes.string
};
// Prop Types content
TitleBar.defaultProps = {
  left: {
    content: (
      <View>
        <Title>
          <Text style={StyleSheet.bodyText} />
        </Title>
      </View>
    )
  },
  body: {
    content: (
      <View>
        <Title>
          <Text style={StyleSheet.bodyText}>Item</Text>
        </Title>
      </View>
    )
  },
  right: {
    content: (
      <View>
        <Title>
          <Text style={StyleSheet.bodyText} />
        </Title>
      </View>
    )
  },
  backgroundColor: colors.brandSecondary
};

export default TitleBar;
