import React, { PureComponent } from "react";
import { View, AsyncStorage, Alert, Image } from "react-native";
import { Text, Button, Container, Spinner, Content } from "native-base";
import { connect } from "react-redux";
const axios = require("../../../src/config/axios");
import { pushDashboard } from "../../config/flows";
import { changeActiveScreen, changeSessionToken, changeUser, changeActiveCompany } from "../../modules/Session";
import styles from "./stylesheet";
import { DASHBOARD, LOGIN, REGISTER } from "..";
import TitleBar from "@components/title-bar";
import SocialLogins from "@components/social-logins";
import { colors } from '@styles/colors';
import { brands } from "@styles/imagesUris";
import { push } from "@utils/nav";
import { IWelcomeProps, IWelcomeState } from "./types";

class Welcome extends PureComponent<IWelcomeProps, IWelcomeState> {
  state = {
    isLoading: true

  };

  componentDidMount() {
    this.props.changeActiveScreen({ activeScreen: "welcome" });
    this.handleSessionData();
  }

  async handleSessionData() {
    try {
      let data = JSON.parse(await AsyncStorage.getItem("sessionData"));
      if (data) {
        this.props.changeSessionToken({ token: data.token });
        this.getUserInfo(data.id, data.token);
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      this.removeSessionData()
      this.setState({ isLoading: false });

    }
  }

  async removeSessionData() {
    try {
      await AsyncStorage.removeItem("sessionData");
    } catch (error) {
      this.setState({ isLoading: false });
      console.error("AsyncStorage error: " + error.message);
    }
  }

  getUserInfo(userId: string, token: string) {
    axios.get(`/users/${userId}`).then(response => {
      this.props.changeUser({ user: response.data });
      this.getUserDefaultCompany(response.data.default_company, token);
    })
      .catch(error => {
        console.log(error.response);
        Alert.alert("Sesión expirada");
        this.removeSessionData();
        this.setState({ isLoading: false });
      });
  }

  getUserDefaultCompany(companyId: string) {
    axios.get(`/companies?q=(id:${companyId})`)
      .then(response => {
        this.props.changeActiveCompany({ company: response.data[0] });
        pushDashboard({ activeScreen: DASHBOARD });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  }

  changeScreen(activeScreen: string) {
    this.props.changeActiveScreen({ activeScreen });
  }

  pushScreen(screen: string) {
    push(this.props.componentId, screen)
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Content contentContainerStyle={styles.centered}>
            <Spinner color={colors.brandPrimary} />
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <TitleBar
          Left={{ content: <View /> }}
          right={{ content: <View /> }}
          body={{
            content:
              <>
                <Text style={styles.title}>canvas</Text>
              </>
          }}
          backgroundColor={colors.white}
        />
        <Content padder>
          <View style={styles.centered}>
            <Image
              source={brands.gewaer.blackUri}
              style={styles.logoBig}
              resizeMode="contain"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button block style={styles.btnSignIn} >
              <Text uppercase style={styles.btnTextStyle} onPress={() => this.pushScreen(REGISTER)} >sign up!</Text>
            </Button>
            <Button block bordered style={styles.btnLogIn} onPress={() => this.pushScreen(LOGIN)}>
              <Text uppercase style={styles.btnTextLogIn} >log in</Text>
            </Button>
          </View>
          <SocialLogins />
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  changeActiveScreen,
  changeSessionToken,
  changeUser,
  changeActiveCompany
}

export default connect(null, mapDispatchToProps)(Welcome);
