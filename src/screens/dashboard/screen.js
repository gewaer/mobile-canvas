import React, { PureComponent } from 'react';
import { View, Platform, FlatList } from 'react-native';
import {
  Button,
  Text,
  Icon,
  ListItem,
  Body,
  Right,
  Container,
  Spinner,
  Thumbnail,
  Toast,
  Root
} from 'native-base';
import { colors } from '../../config/styles';
import { changeActiveScreen } from '../../actions/SessionActions';
import { connect } from 'react-redux';
import * as axios from 'axios';
const platform = Platform.OS;
import TitleBar from '../../components/title-bar';
import { Navigation } from 'react-native-navigation';
import { pushSingleScreenApp } from '../../navigation/flows';
import StyleSheet from './stylesheet';


class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: [],
      page: 1,
      itemWasCreated: false
    };
  }

  componentWillMount() {
    this.getItems();
  }

  changeScreen(card) {
    pushSingleScreenApp('canvas.ItemInfo', { item: card });
  }

  onItemCreated = () => {
    this.setState(
      {
        isLoading: true,
        data: [],
        page: 1,
        itemWasCreated: true
      },
      () => {
        this.getItems();
      }
    );
  };

  openAddItemModal() {
    // this.props.navigator.showLightBox({
    //     screen: 'dac.AddItem',
    //     passProps: {
    //         itemCreatedAction: this.onItemCreated
    //     },
    //     style: {
    //         backgroundBlur: 'none',
    //         backgroundColor: 'rgba(34, 34, 34, 0.8)',
    //         width: 320,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         tapBackgroundToDismiss: true
    //     }
    // })
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'canvas.AddItem',
              passProps: {
                itemCreatedAction: this.onItemCreated
              },
              options: {
                topBar: {
                  visible: false
                }
              }
            }
          }
        ]
      }
    });
  }

  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  showDrawer = () => {
    Navigation.mergeOptions('navigation.drawer.left', {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  };

  titleBarLeft() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <Button transparent onPress={() => this.showDrawer()}>
            <Icon
              type={'MaterialIcons'}
              name={'menu'}
              style={{ color: '#fff', fontSize: platform === 'ios' ? 22 : 24 }}
            />
          </Button>
        </View>
      )
    };
  }

  titleBarRight() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <Button transparent onPress={() => this.openAddItemModal()}>
            <Icon
              type={'MaterialIcons'}
              name={'add'}
              style={{ color: '#fff', fontSize: platform === 'ios' ? 22 : 24 }}
            />
          </Button>
        </View>
      )
    };
  }

  titleBarBody() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <Text
            style={{
              color: '#fff',
              paddingLeft: platform === 'ios' ? 0 : 10,
              fontSize: platform === 'ios' ? 18 : 19.64
            }}
          >
            {this.props.company
              ? this.props.company.name
              : 'Familia no disponible'}
          </Text>
        </View>
      )
    };
  }

  getItems = () => {
    this.setState({ isLoading: true });

    axios
      .get(
        `https://apidev.gewaer.io/v1/leads?format=true&limit=20&page=${
          this.state.page
        }&q=(is_deleted:0,is_duplicated:0)`
      )
      .then(response => {
        console.log('Updated');
        if (this.state.itemWasCreated) {
          Toast.show({
            text: 'Item successfully created!',
            buttonText: 'Ok',
            duration: 3000,
            type: 'success'
          });
        }
        this.setState({
          data: [...this.state.data, ...response.data.data],
          isLoading: false,
          itemWasCreated: false
        });
      })
      .catch(error => {
        console.log(error.response);
        Toast.show({
          text: error.response.data.status.message
            ? error.response.data.status.message
            : 'Error',
          buttonText: 'Ok',
          duration: 3000,
          type: 'danger'
        });
      });
  };

  getImageCover() {
    return 'https://banner2.kisspng.com/20180406/sve/kisspng-computer-icons-user-material-design-business-login-dizzy-5ac7f1c61041c2.5160856515230529980666.jpg';
  }

  rowContent(lead) {
    return (
      <ListItem style={StyleSheet.listItem} onPress={() => this.changeScreen(lead)}>
        <View>
          <Thumbnail source={{ uri: this.getImageCover() }} />
        </View>
        <Body>
          <Text>
            {lead.firstname} {lead.lastname}
          </Text>
          <Text note>{lead.email}</Text>
          <Text note>{this.formatPhoneNumber(lead.phone)}</Text>
        </Body>
        <Right>
          <Text note>{lead.id}</Text>
        </Right>
      </ListItem>
    );
  }

  handleLoadMore = () => {
    if (this.state.isLoading) {
      return;
    }

    this.setState(
      {
        page: this.state.page + 1,
        isLoading: true
      },
      () => {
        this.getItems();
      }
    );
  };

  renderFooter = () => {
    if (!this.state.isLoading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}
      >
        <Spinner color={colors.brandPrimary} />
      </View>
    );
  };

  render() {
    return (
      <Root>
        <Container>
          <TitleBar
            left={this.titleBarLeft()}
            body={this.titleBarBody()}
            right={this.titleBarRight()}
          />
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => this.rowContent(item)}
            onEndReachedThreshold={0.5}
            keyExtractor={item => item.id}
            ListFooterComponent={() => this.renderFooter()}
            onEndReached={() => this.handleLoadMore()}
            getItemLayout={(data, index) => ({
              length: 80.5,
              offset: 80.5 * index,
              index
            })}
          />
        </Container>
      </Root>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.session.token,
    company: state.session.company
  };
};

export default connect(
  mapStateToProps,
  {
    changeActiveScreen
  }
)(Dashboard);
