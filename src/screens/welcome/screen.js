// Importing package modules.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { Navigation } from 'react-native-navigation';

import { pushDashboard } from '../../navigation/flows'

import {
  View,
  StatusBar,
  ImageBackground,
  AsyncStorage,
  Alert,
} from 'react-native';

import {
  Text,
  Button,
  Container,
  Spinner
} from 'native-base';

// Importing local assets.
import {
  globalStyle,
  colors,
  paddingHelpers
} from '../../config/styles';
import { appImages } from '../../config/imagesRoutes';
import { API_KEY } from 'react-native-dotenv';

// Importing Redux's actions
import {
  changeActiveScreen,
  changeSessionToken,
  changeUser,
  changeActiveCompany
} from '../../actions/SessionActions';

import StyleSheet from './stylesheet'

/*
	Screen Name: Welcome.
	Description: This is the first screen that the user will see if there's not session data in the storage.
	It usually contains the company logo and navigation buttons to the Register or Log In screen.
*/
class Welcome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    // Deactivates yellow warning box.
    console.disableYellowBox = true;
  }

  componentWillMount() {
    this.handleSessionData();
  }

  // Verifies if there's any session data on the local storage.
  // This is used to auto-login the user if the token is not expired.
  async handleSessionData() {
    let data = JSON.parse(await AsyncStorage.getItem('sessionData'));
    if (data && data.token && data.id) {
      // Sets session's token in redux state.
      this.props.changeSessionToken({ token: data.token });
      this.getUserInfo(data.id, data.token);
    } else {
      this.setState({ isLoading: false })
    }
  }

  // Removes any session data in the local storage.
  async removeSessionData() {
    try {
      await AsyncStorage.removeItem('sessionData');
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  // Tries to get the user's information using the stored token.
  // If the response is an error then the token is expired and removes the session data.
  getUserInfo(userId, token) {
    const data = {
      'Authorization': token,
    };
    axios.get(`${API_KEY}/users/${userId}`, { headers: data })
      .then((response) => {
        // Sets user's data in redux state.
        this.props.changeUser({ user: response.data });
        this.getUserDefaultCompany(response.data.default_company, token);
      })
      .catch((error) => {
        console.log(error.response);
        debugger;
        Alert.alert('Sesión expirada');
        this.removeSessionData();
        this.setState({ isLoading: false })
      });
  }

  // Get the user's default company.
  getUserDefaultCompany(companyId, token) {
    const data = {
      'Authorization': token,
    };
    axios.get(`${API_KEY}/companies?q=(id:${companyId})`, { headers: data })
      .then((response) => {
        // Sets user's active company in redux state.
        this.props.changeActiveCompany({ company: response.data[0] });
        // Since all user and session data are in the redux's state, change to Dashboard screen.
        this.changeScreen('canvas.Dashboard');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Changes the active screen using redux.
  changeScreen(activeScreen) {
    this.props.changeActiveScreen({ activeScreen });
    pushDashboard({ activeScreen: 'canvas.Dashboard' });
  }

  // Pushes to another screen in the navigator stack.
  pushScreen(activeScreen) {
    Navigation.push(this.props.componentId, {
      component: {
        name: activeScreen,
        options: {
          topBar: {
            visible: false
          }
        }
      }
    });
  }

  render() {
    // Displays a loading spinner if the app is loading.
    if (this.state.isLoading) {
      return (
        <Container style={[StyleSheet.wrapper, { justifyContent: 'center', alignItems: 'center' }]}>
          <StatusBar backgroundColor={colors.brandGreen} barStyle="light-content" />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Spinner color={colors.brandPrimary} />
          </View>
        </Container>
      );
    } else {
      return (
        <Container style={StyleSheet.wrapper}>
          <StatusBar backgroundColor={colors.brandGreen} barStyle="light-content" />
          <View>
            <View style={StyleSheet.container}>
              <View>
                <ImageBackground
                  source={appImages.LogoBig.uri}
                  style={globalStyle.logoBig}
                  resizeMode='contain'
                />
              </View>
            </View>
            <View style={StyleSheet.footerButtomsContainer}>
              <Text style={{ marginBottom: paddingHelpers.S, fontWeight: '200' }}>
                                Inicia Sesión con tus Cuentas de Social Media
              </Text>
              <Button
                block
                style={{ marginVertical: paddingHelpers.S, backgroundColor: colors.bradSecondaryAlter }}
                onPress={() => this.pushScreen('canvas.Login')}
              >
                <Text style={StyleSheet.btnTextStyle}>
                                    Ingresar
                </Text>
              </Button>
              <Button
                block
                style={{ marginVertical: paddingHelpers.S, backgroundColor: colors.brandPrimary }}
                onPress={() => this.pushScreen('canvas.Register')}
              >
                <Text style={StyleSheet.btnTextStyle}>
                                    Crear Cuenta
                </Text>
              </Button>
            </View>
          </View>
        </Container>
      );
    }
  }
}

// Maps redux's state variables to this class' props
const mapStateToProps = state => {
  return {};
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
  changeActiveScreen,
  changeSessionToken,
  changeUser,
  changeActiveCompany
})(Welcome);
