/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Dimensions,
  View
} from 'react-native';

import {
  Button,
  Text,
  Form,
  Item,
  Icon,
  Input,
  Label
} from 'native-base';

import {
  globalStyle,
  colors,
} from '../../config/styles';

import { changeActiveScreen } from '../../actions/SessionActions';
import { connect } from 'react-redux';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import * as axios from 'axios'
import { VUE_APP_BASE_API_URL } from '../../config/env'
import StyleSheet from './stylesheet'
import { Navigation } from 'react-native-navigation';

class AddCompany extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newCompanyName: '',
      newCompanyWebsite: ''
    };
  }

  changeScreen(activeScreen) {
    this.props.changeActiveScreen({ activeScreen });
  }

  createCompany() {
    const { companyCreatedAction } = this.props;

    const headersData = {
      'Authorization': this.props.token,
    };

    let formData = new FormData();
    formData.append('name', this.state.newCompanyName);
    formData.append('website', this.state.newCompanyWebsite);
    formData.append('users_id', this.props.user.id);

    axios.post(`${VUE_APP_BASE_API_URL}/companies`, formData, { headers: headersData })
      .then(() => {
        Navigation.dismissAllModals();
        companyCreatedAction();
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff', maxHeight: deviceHeight - 30, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 5 }}>
        <Icon type={'FontAwesome'} name={'users'} style={{ color: colors.brandGrey, fontSize: 42 }} />
        <Form style={{ width: deviceWidth - 60 }}>
          <Item floatingLabel last style={StyleSheet.formItem} >
            <Label style={[globalStyle.formLabel, { fontSize: 14, color: colors.brandBlack }]}>
                            NEW COMPANY NAME
            </Label>
            <Input
              value={this.state.newCompanyName}
              onChangeText={(companyName) => this.setState({ newCompanyName: companyName })}
              style={{ height: 60, color: 'black' }}
              secureTextEntry={false}
            />
          </Item>
          <Item floatingLabel last style={StyleSheet.formItem} >
            <Label style={[globalStyle.formLabel, { fontSize: 14, color: colors.brandBlack }]}>
                            NEW COMPANY WEBSITE
            </Label>
            <Input
              autoCapitalize={'none'}
              value={this.state.newCompanyWebsite}
              onChangeText={(companyWebsite) => this.setState({ newCompanyWebsite: companyWebsite })}
              style={{ height: 60, color: 'black' }}
              secureTextEntry={false}
            />
          </Item>
          <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <Button
              block
              onPress={() => { Navigation.dismissAllModals(); }}
              style={[StyleSheet.submitBtn, { marginTop: 30, backgroundColor: colors.brandDarkGrey, width: '45%' }]}
            >
              <Text style={{ color: colors.brandWhite }}>
                                CANCEL
              </Text>
            </Button>
            <Button
              disabled={!this.state.newCompanyName}
              onPress={() => this.createCompany()}
              block
              style={[StyleSheet.submitBtn, { marginTop: 30, backgroundColor: colors.brandGreen, width: '45%' }]}
            >
              <Text style={{ color: colors.brandWhite }}>
                                ADD
              </Text>
            </Button>
          </View>
        </Form>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.session.token,
    user: state.session.user,
    selectedCompanyId: state.session.selectedCompanyId,
    company: state.session.company
  };
};

export default connect(mapStateToProps, {
  changeActiveScreen
})(AddCompany);
