import React, { Component } from "react";
import { Image, FlatList } from "react-native";
import { Form, Container, Content, View, Item } from "native-base";
import { changeActiveScreen } from "@redux/Session";
import { icons } from "@styles/imagesUris";
import { connect } from "react-redux";
import StyleSheet from "./stylesheet";
import _ from "lodash";
import { Navigation } from "react-native-navigation";
import GlobalInput from "@components/global-input";
import SuccessButton from "@components/global-success-button";
import DangerButton from "@components/global-danger-button";
import { globalStyles } from "@styles/globalStyles";
import axios from "@config/axios";
import { dismissModal } from "@utils/nav";
import { convertFormData } from "@utils/convertFormData";
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
interface Data {
  label: string;
  name: string;
  secure: boolean;
  value: string;
  keyboardType: string;
}
interface State {
  data: Data[];
  isLoading: boolean;
}

class AddCompany extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: [
        {
          label: "new company name",
          name: "newCompanyName",
          secure: false,
          value: "",
          keyboardType: "default"
        },
        {
          label: "new company website",
          name: "newCompanyWebsite",
          secure: false,
          value: "",
          keyboardType: "default"
        }
      ],
      isLoading: true
    };
  }

  // Save test from input to state.data
  onChangeInput = (name: string) => (text: string) => {
    const data = [...this.state.data];
    const index = data.findIndex(item => item.name === name);
    data[index].value = text;
    this.setState({ data });
  };

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

  // Key extract to handle in which one are here
  keyExtractor = item => item.id;

  // Close modal
  onCancelButton = () => {
    dismissModal(this.props.componentId);
  };

  createCompany = () => {
    const data: object = {
      name: this.state.data[0].value,
      website: this.state.data[1].value,
      users_id: this.props.userId
    };

    axios
      .post(`/companies`, convertFormData(data))
      .then(() => {
        Navigation.dismissAllModals();
        this.props.companyCreatedAction();
      })
      .catch(function(error: object) {
        console.log(error.response);
      });
  };

  render() {
    return (
      <Container>
        <Content
          scrollEnabled={false}
          contentContainerStyle={globalStyles.mainContainer}
        >
          <View style={StyleSheet.imageContainer}>
            <Image source={icons.family.uri} style={StyleSheet.imageSize} />
          </View>
          <Form>
            <FlatList
              data={this.state.data}
              keyExtractor={this.keyExtractor}
              renderItem={({ item }: any) => (
                <GlobalInput
                  key={item.id}
                  label={item.label}
                  name={item.name}
                  onChangeText={this.onChangeInput}
                />
              )}
            />
          </Form>
          <View style={globalStyles.buttonContainer}>
            <DangerButton onPress={this.onCancelButton} />
            <SuccessButton onPress={() => this.createCompany} />
          </View>
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
