// Importing package modules.
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "@config/axios";
import { pushDashboard } from "@config/flows";
import { View, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Container, Spinner, Content, Root } from "native-base";
import { colors } from "@config/styles";
import { appImages } from "@styles/imagesUris";
import { changeSessionToken, changeUser, changeActiveCompany } from "@modules/Session";
import { DASHBOARD, LOGIN, REGISTER } from "..";
import { pushScreen } from "@utils/nav"
import { IState, IProps } from "./types";
import { AxiosResponse, AxiosError } from "axios";
import MyCarousel from "@components/carousel";
import { Title, ButtonText, BaseButton, BottomContainer, MainContainer, SpinnerContainer } from './styled-components';

/*
	Screen Name: Welcome.
	Description: This is the first screen that the user will see if there's not session data in the storage.
	It usually contains the company logo and navigation buttons to the Register or Log In screen.
*/
class Welcome extends Component<IProps, IState> {
  state = {
    isLoading: true,
    entries: [
      {
        uri: appImages.carouselPlaceholder.uri
      },
      {
        uri: appImages.carouselPlaceholder.uri
      },
      {
        uri: appImages.carouselPlaceholder.uri
      }
    ],
    sliderActiveSlide: 0
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
    if (this.state.isLoading) {
      return (
        <SpinnerContainer>
          <Spinner color={colors.brandPrimary} />
        </SpinnerContainer>
      );
    }
    return (
      <Root>
        <Container>
          <Content>
            <MainContainer>
              <Title>canvas</Title>
              <MyCarousel
                entries={ this.state.entries }
                activeSlide={ this.state.sliderActiveSlide }
                onSnapToItem={ (index: number) => this.setState({ sliderActiveSlide: index }) }
              />
              <BottomContainer>
                <View>
                  <BaseButton block onPress={() => pushScreen(this.props.componentId, REGISTER)}>
                    <ButtonText uppercase>
                      SIGN UP!
                    </ButtonText>
                  </BaseButton>
                  <BaseButton block bordered onPress={() => pushScreen(this.props.componentId, LOGIN)}>
                    <ButtonText uppercase color={colors.brandPrimary}>
                      LOG IN
                    </ButtonText>
                  </BaseButton>
                </View>
              </BottomContainer>
            </MainContainer>
          </Content>
        </Container>
      </Root>
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
