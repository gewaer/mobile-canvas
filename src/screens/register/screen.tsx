// Importing package modules.
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "@config/axios";
import { View, TouchableOpacity, BackHandler, Keyboard } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Button,
  Text,
  Content,
  Container,
  Form,
  Item,
  Input,
  Spinner,
  Icon,
  Root,
  Toast
} from "native-base";
// Importing local assets and components.
import { globalStyle, colors } from "@config/styles";
import TitleBar from "@components/title-bar";
import { changeSessionToken, changeUser, changeActiveCompany } from "@modules/Session";
import StyleSheet from "./stylesheet"
import { popScreen, popToScreen } from "@utils/nav";
import { DASHBOARD } from "..";
import { IState, IProps } from "./types";
import { AxiosResponse, AxiosError } from "axios";
import has from "lodash/has";

/*
	Screen Name: Register.
	Description: This screen is used to let the user create an account.
*/
class Register extends Component<IProps, IState> {
  state = {
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    email: "",
    family: "",
    isLoading: false
  };

  componentDidMount() {
    // Creates an event listener for Android's back button
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid());
  }

  // Handles Android's back button's action
  backAndroid() {
    popScreen(this.props.componentId);
    return true;
  }

  // Defines title bar's left content
  titleBarLeft() {
    if (this.state.isLoading) {
      return;
    }

    return {
      content: (
        <View>
          <TouchableOpacity
            onPress={() => popScreen(this.props.componentId)}
          >
            <Icon
              type={"Ionicons"}
              name={"md-arrow-back"}
              style={{
                color: colors.brandPrimary,
                fontSize: 30,
                marginLeft: 5
              }}
            />
          </TouchableOpacity>
        </View>
      )
    };
  }

  // Defines title bar's body content
  titleBarBody() {
    return;
  }

  // Checks if all required fields are filled
  canCreate() {
    return (
      this.state.firstname &&
      this.state.lastname &&
      this.state.email &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.family
    );
  }

  // Handles user's account creation
  createUser() {
    Keyboard.dismiss();
    // Displays an error notification if the password and confirm password fields are not equal
    if (this.state.password !== this.state.confirmPassword) {
      Toast.show({
        text: "Passwords don't match!",
        buttonText: "Ok",
        duration: 3000,
        type: "danger"
      });
      this.setState({ isLoading: false });
      return;
    }

    // Displays an error notification if any of the required feilds is empty
    if (!this.canCreate()) {
      Toast.show({
        text: "Please, fill empty fields!",
        buttonText: "Ok",
        duration: 3000,
        type: "danger"
      });
      this.setState({ isLoading: false });
      return;
    }

    this.setState({ isLoading: true });

    const data = new FormData();
    data.append("firstname", this.state.firstname);
    data.append("lastname", this.state.lastname);
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    data.append("default_company", this.state.family);
    data.append("verify_password", this.state.confirmPassword);

    axios
      .post(`/users`, data)
      .then((response: AxiosResponse) => {
        this.saveSessionData(
          "sessionData",
          JSON.stringify(response.data.session)
        );
        this.props.changeSessionToken({ token: response.data.session.token });
        this.props.changeUser({ user: response.data.user });
        this.getUserDefaultCompany(response.data.user.default_company);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        this.setState({ isLoading: false });
        Toast.show({
          text: has(error, "response.data.status.message") ?
            error.response.data.status.message : "Error",
          buttonText: "Ok",
          duration: 3000,
          type: "danger"
        });
      });
  }

  // Gets the user's default company.
  getUserDefaultCompany(companyId: string) {
    axios
      .get(`/companies?q=(id:${companyId})`)
      .then((response: AxiosResponse) => {
        this.props.changeActiveCompany({ company: response.data[0] });
        // TODO: Use Function to return to Process
        // pushDashboard({ activeScreen: 'canvas.Dashboard' });
        popToScreen(DASHBOARD);
      })
      .catch((error: AxiosError) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  // Saves user's session data in the local storage.
  async saveSessionData(item: string, value: string) {
    try {
      await AsyncStorage.setItem(item, value);
      let data = JSON.parse(await AsyncStorage.getItem(item));
      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Root>
        <Container style={{ backgroundColor: colors.brandSecondary }}>
          <TitleBar
            noShadow
            left={this.titleBarLeft()}
            body={this.titleBarBody()}
            backgroundColor="white"
          />
          <Content style={{ backgroundColor: "white" }}>
            <View>
              <View>
                <View>
                  <View style={StyleSheet.containerView}>
                    <Text style={StyleSheet.title}>Create an Account</Text>
                    <Form>
                      <Text style={globalStyle.formLabel}>Name</Text>
                      <Item floatingLabel last style={StyleSheet.formItem}>
                        <Input
                          value={this.state.firstname}
                          onChangeText={firstname =>
                            this.setState({ firstname })
                          }
                          style={globalStyle.formInput}
                          onSubmitEditing={() => {
                            this.lastName._root.focus();
                          }}
                        />
                      </Item>
                      <Text style={globalStyle.formLabel}>Lastname</Text>
                      <Item floatingLabel last style={StyleSheet.formItem}>
                        <Input
                          value={this.state.lastname}
                          onChangeText={lastname => this.setState({ lastname })}
                          style={globalStyle.formInput}
                          getRef={input => {
                            this.lastName = input;
                          }}
                          onSubmitEditing={() => {
                            this.email._root.focus();
                          }}
                        />
                      </Item>
                      <Text style={globalStyle.formLabel}>Email</Text>
                      <Item floatingLabel last style={StyleSheet.formItem}>
                        <Input
                          value={this.state.email}
                          onChangeText={email => this.setState({ email })}
                          style={globalStyle.formInput}
                          keyboardType={"email-address"}
                          autoCapitalize={"none"}
                          getRef={input => {
                            this.email = input;
                          }}
                          onSubmitEditing={() => {
                            this.password._root.focus();
                          }}
                        />
                      </Item>
                      <Text style={globalStyle.formLabel}>Password</Text>
                      <Item floatingLabel last style={StyleSheet.formItem}>
                        <Input
                          value={this.state.password}
                          onChangeText={password => this.setState({ password })}
                          style={globalStyle.formInput}
                          secureTextEntry
                          autoCapitalize={"none"}
                          getRef={input => {
                            this.password = input;
                          }}
                          onSubmitEditing={() => {
                            this.confirmPassword._root.focus();
                          }}
                        />
                      </Item>
                      <Text style={globalStyle.formLabel}>
                        Confirm Password
                      </Text>
                      <Item floatingLabel last style={StyleSheet.formItem}>
                        <Input
                          value={this.state.confirmPassword}
                          onChangeText={confirmPassword =>
                            this.setState({ confirmPassword })
                          }
                          style={globalStyle.formInput}
                          secureTextEntry
                          autoCapitalize={"none"}
                          getRef={input => {
                            this.confirmPassword = input;
                          }}
                          onSubmitEditing={() => {
                            this.company._root.focus();
                          }}
                        />
                      </Item>
                      <Text style={globalStyle.formLabel}>Company</Text>
                      <Item floatingLabel last style={StyleSheet.formItem}>
                        <Input
                          value={this.state.family}
                          onChangeText={family => this.setState({ family })}
                          style={globalStyle.formInput}
                          getRef={input => {
                            this.company = input;
                          }}
                          onSubmitEditing={() => {
                            this.createUser();
                          }}
                        />
                      </Item>
                      <View style={StyleSheet.textLabelContainer}>
                        <Text style={StyleSheet.textLabel}>
                          By creating an account you agree to our
                        </Text>
                        <Text style={StyleSheet.textLabel}>
                          Terms of Service and Privacy Policy
                        </Text>
                      </View>
                      {// If the app is creating the user hide the register button and show a loading spinner
                      this.state.isLoading ? (
                        <Spinner color={colors.brandWhite} />
                      ) : (
                        <Button
                          block
                          bordered
                          primary
                          onPress={() => this.createUser()}
                          style={[StyleSheet.submitBtn]}
                        >
                          <Text style={StyleSheet.buttonText}>
                            CREATE ACCOUNT
                          </Text>
                        </Button>
                      )}
                    </Form>
                  </View>
                </View>
              </View>
            </View>
          </Content>
        </Container>
      </Root>
    );
  }
}

// Maps redux's state variables to this class' props
const mapStateToProps = () => {
  return {};
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
  changeSessionToken,
  changeUser,
  changeActiveCompany
})(Register);
