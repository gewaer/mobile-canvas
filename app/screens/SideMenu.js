/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
} from 'react-native';

import {
    Container,
    Text,
} from 'native-base';

import { changeActiveScreen } from '../actions/SessionActions';
import { connect } from 'react-redux';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

class SideMenu extends Component {

    changeScreen(activeScreen) {
        console.log("pressing");
        this.props.changeActiveScreen({ activeScreen });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Text style={styles.welcome[{ textAlign: 'center' }]}>
                    Side Menu
                </Text>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        marginVertical: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: "90%"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const mapStateToProps = state => {
    return { 
        company: state.session.company 
    };
};

export default connect(mapStateToProps, {
    changeActiveScreen
})(SideMenu);