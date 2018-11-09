import React from "react";
import PropTypes from "prop-types";
// Styles
import styles from "./styles";

// Native Base Components
import { Header, Left, Body, Right, Title, Text, Button } from "native-base";
import { StatusBar } from "react-native";
// React Native Components
import { View } from "react-native";
// Config Styles - Screens

import { colors } from "../../config/styles";

// Define Component for Header
const TitleBar = props => {
    const { left, body, right } = props;
    return (
        <Header style={styles.bar} noShadow>
            <StatusBar
                backgroundColor={colors.brandGreen}
                barStyle="light-content" 
            />
            <View style={styles.barContent}>
                <Left style={styles.titleBarLeft}>
                    {left.content}
                </Left>
                <Body style={styles.titleBarBody}>
                    {body.content}
                </Body>
                <Right style={styles.titleBarRight}>
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
    right: PropTypes.object
};
// Prop Types content
TitleBar.defaultProps = {
    left: {
        content: (
            <View>
                <Title>
                    <Text style={styles.bodyText}></Text>
                </Title>
            </View>
        )
    },
    body: {
        content: (
            <View>
                <Title>
                    <Text style={styles.bodyText}>Item</Text>
                </Title>
            </View>
        )
    },
    right: {
        content: (
            <View>
                <Title>
                    <Text style={styles.bodyText}></Text>
                </Title>
            </View>
        )
    }
};

export default TitleBar;