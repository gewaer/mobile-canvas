import React, { Component } from "react";
import { Image, FlatList } from "react-native";
import {
  Button,
  Text,
  Form,
  Item,
  Icon,
  Input,
  Label,
  Container,
  Content,
  View
} from "native-base";
import { globalStyle, colors } from "../../config/styles";
import { changeActiveScreen } from "../../modules/Session";
import { icons } from "../../styles/imagesUris";
import { connect } from "react-redux";
import StyleSheet from "./stylesheet";
import _ from "lodash";
import { Navigation } from "react-native-navigation";
const axios = require("../../../src/config/axios");

interface Props {
  userId: string;
  selectedCompanyId: string;
  company: string;
  componentId?: string;
  error?: object;
  changeActiveScreen: (activeScreen: string) => void;
  companyCreatedAction: () => void;
  newCompanyInput: object;
}

interface State {
  data: {
    newCompanyName: string;
    newCompanyWebsite: string;
  };
  isLoading: boolean;
}

class AddCompany extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: {
        newCompanyName: "",
        newCompanyWebsite: ""
      },
      isLoading: true
    };
    this.newCompanyInput = React.createRef();
  }
  // Save Current Screen in Redux
  changeScreen(activeScreen: string) {
    this.props.changeActiveScreen({ activeScreen });
  }

  // Save test from input to state.data
  onChangeInput = (name: string) => (text: string) =>
    this.setState(prevState => ({ data: { ...prevState.data, [name]: text } }));

  // Focus Next Input
  onFocusInput = (name: string): void => {
    if (_.has(this, "current.focus()")) {
      this[`${name}`].current.focus();
    }
  };

  // Get ref to access deep properties for inputs.
  onRefInputs = (name: string) => (element: object) => {
    this[`${name}`] = element;
  };

  createCompany() {
    const { companyCreatedAction } = this.props;
    let formData = new FormData();
    formData.append("name", this.state.data.newCompanyName);
    formData.append("website", this.state.data.newCompanyWebsite);
    formData.append("users_id", this.props.userId);

    axios
      .post(`/companies`, formData)
      .then(() => {
        Navigation.dismissAllModals();
        companyCreatedAction();
      })
      .catch(function(error: object) {
        console.log(error.response);
      });
  }

  render() {
    return (
      //     <View
      //       style={{
      //         backgroundColor: "#fff",
      //         maxHeight: deviceHeight - 30,
      //         paddingHorizontal: 20,
      //         justifyContent: "center",
      //         alignItems: "center",
      //         flexDirection: "column",
      //         paddingVertical: 30,
      //         borderRadius: 5
      //       }}
      //     >
      //       <Icon  type={"FontAwesome"} name={"users"} style={{ color: colors.brandGrey, fontSize: 42 }} >
      //       <Form style={{ width: deviceWidth - 60 }}>
      //         <Item floating Label last style={StyleSheet.formItem}>
      //           <Label style={[ globalStyle.formLabel, { fontSize: 14, color: colors.brandBlack }]}>
      //             NEW COMPANY NAME
      //           </Label>
      //           <Input value={this.state.data.newCompanyName} onChangeText={this.onChangeInput('newCompanyName')}
      //             style={{ height: 60, color: "black" }}
      //             secureTextEntry={false}
      //             onSubmitEditing={() => { this.newCompanyInput.current.focus(); }}
      //           />
      //         </Item>
      //         <Item floating Label last style={StyleSheet.formItem}>
      //           <Label
      //             style={[
      //               globalStyle.formLabel,
      //               { fontSize: 14, color: colors.brandBlack }
      //             ]}
      //           >
      //             NEW COMPANY WEBSITE
      //           </Label>
      //           <Input
      //             autoCapitalize={"none"}
      //             value={this.state.data.newCompanyWebsite}
      //             onChangeText={newCompanyWebsite =>
      //               this.setState({
      //                 data: { ...this.state.data, newCompanyWebsite }
      //               })
      //             }
      //             style={{ height: 60, color: "black" }}
      //             secureTextEntry={false}
      //             red={this.newCompanyInput}
      //             onSubmitEditing={() => {
      //               this.createCompany();
      //             }}
      //           />
      //         </Item>
      //         <View
      //           style={{
      //             justifyContent: "space-between",
      //             alignItems: "center",
      //             flexDirection: "row"
      //           }}
      //         >
      //           <Button
      //             block
      //             onPress={() => {
      //               Navigation.dismissAllModals();
      //             }}
      //             style={[
      //               StyleSheet.submitBtn,
      //               {
      //                 marginTop: 30,
      //                 backgroundColor: colors.brandDarkGrey,
      //                 width: "45%"
      //               }
      //             ]}
      //           >
      //             <Text style={{ color: colors.brandWhite }}>CANCEL</Text>
      //           </Button>
      //           <Button
      //             disabled={!this.state.data.newCompanyName}
      //             onPress={() => this.createCompany()}
      //             block
      //             style={[
      //               StyleSheet.submitBtn,
      //               {
      //                 marginTop: 30,
      //                 backgroundColor: colors.brandGreen,
      //                 width: "45%"
      //               }
      //             ]}
      //           >
      //             <Text style={{ color: colors.brandWhite }}>ADD</Text>
      //           </Button>
      //         </View>
      //       </Form>
      //     </View>
      <Container>
        <Content>
          <View>
            <Image source={icons.family.uri} />
          </View>
          <Form>
            {/* <FlatList
              data={[
                {
                  label: "New Company",
                  propsInput: { value: "", style: "", secure: "" }
                }
              ]}
              renderItem={({ label, name, props }) => (
                <Item floating Label style={StyleSheet.formItem}>
                  <Label
                    style={[
                      globalStyle.formLabel,
                      { fontSize: 14, color: colors.brandBlack }
                    ]}
                  >
                    NEW COMPANY NAME
                  </Label>
                  <Input
                    value={this.state.data.newCompanyName}
                    onChangeText={this.onChangeInput("newCompanyName")}
                    style={{ height: 60, color: "black" }}
                    secureTextEntry={false}
                    onSubmitEditing={() => {
                      this[`${item.name}`].current.focus();
                    }}
                  />
                </Item>
              )}
            /> */}
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    userId: state.session.user.id,
    selectedCompanyId: state.session.selectedCompanyId,
    company: state.session.company
  };
};

const mapPropsToDispatch = {
  changeActiveScreen
};

export default connect(
  mapStateToProps,
  mapPropsToDispatch
)(AddCompany);
