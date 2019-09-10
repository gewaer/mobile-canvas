// Importing package modules.
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "@config/axios";
import { pushDashboard } from "@config/flows";
import {
  View,
  StatusBar,
  ImageBackground,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Text, Button, Container, Spinner } from "native-base";
// Importing local assets.
import { globalStyle, colors, paddingHelpers } from "@config/styles";
import { appImages } from "@config/imagesRoutes";
// Importing Redux's actions
import {
  changeSessionToken,
  changeUser,
  changeActiveCompany
} from "@modules/Session";
import StyleSheet from "./stylesheet";
import { DASHBOARD, LOGIN, REGISTER } from "..";
import { pushScreen } from "@utils/nav"
import { IState, IProps } from "./types";
import { AxiosResponse, AxiosError } from "axios";

/*
	Screen Name: Welcome.
	Description: This is the first screen that the user will see if there's not session data in the storage.
	It usually contains the company logo and navigation buttons to the Register or Log In screen.
*/
class Welcome extends Component<IProps, IState> {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.handleSessionData();
  }

  // Verifies if there's any session data on the local storage.
  // This is used to auto-login the user if the token is not expired.
  async handleSessionData() {
    const data = JSON.parse(await AsyncStorage.getItem("sessionData"));
    if (data && data.token && data.id) {
      // Sets session's token in redux state.
      this.props.changeSessionToken({ token: data.token });
      this.getUserInfo(data.id, data.token);
    } else {
      this.setState({ isLoading: false });
    }
  }

  // Removes any session data in the local storage.
  async removeSessionData() {
    try {
      await AsyncStorage.removeItem("sessionData");
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }

  // Tries to get the user's information using the stored token.
  // If the response is an error then the token is expired and removes the session data.
  getUserInfo(userId: string, token: string) {
    axios
      .get(`/users/${userId}`)
      .then((response: AxiosResponse) => {
        // Sets user's data in redux state.
        this.props.changeUser({ user: response.data });
        this.getUserDefaultCompany(response.data.default_company, token);
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
        Alert.alert("Sesión expirada");
        this.removeSessionData();
        this.setState({ isLoading: false });
      });
  }

  // Get the user's default company.
  getUserDefaultCompany(companyId: string) {
    axios
      .get(`/companies?q=(id:${companyId})`)
      .then((response: AxiosResponse) => {
        // Sets user's active company in redux state.
        this.props.changeActiveCompany({ company: response.data[0] });
        // Since all user and session data are in the redux's state, change to Dashboard screen.
        pushDashboard({ activeScreen: DASHBOARD });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  render() {
    // Displays a loading spinner if the app is loading.
    if (this.state.isLoading) {
      return (
        <Container
          style={[
            StyleSheet.wrapper,
            { justifyContent: "center", alignItems: "center" }
          ]}
        >
          <StatusBar
            backgroundColor={colors.brandGreen}
            barStyle="light-content"
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Spinner color={colors.brandPrimary} />
          </View>
        </Container>
      );
    }
    return (
      <Container style={StyleSheet.wrapper}>
        <StatusBar
          backgroundColor={colors.brandGreen}
          barStyle="light-content"
        />
        <View>
          <View style={StyleSheet.container}>
            <View>
              <ImageBackground
                source={appImages.LogoBig.uri}
                style={globalStyle.logoBig}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={StyleSheet.footerButtomsContainer}>
            <Text style={{ marginBottom: paddingHelpers.S, fontWeight: "200" }}>
              Inicia Sesión con tus Cuentas de Social Media
            </Text>
            <Button
              block
              style={{
                marginVertical: paddingHelpers.S,
                backgroundColor: colors.bradSecondaryAlter
              }}
              onPress={() => pushScreen(this.props.componentId, LOGIN)}
            >
              <Text style={StyleSheet.btnTextStyle}>Ingresar</Text>
            </Button>
            <Button
              block
              style={{
                marginVertical: paddingHelpers.S,
                backgroundColor: colors.brandPrimary
              }}
              onPress={() => pushScreen(this.props.componentId, REGISTER)}
            >
              <Text style={StyleSheet.btnTextStyle}>Crear Cuenta</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  changeSessionToken,
  changeUser,
  changeActiveCompany
}

// Connects redux actions to this class' props
export default connect(
  null,
  mapDispatchToProps
)(Welcome);
