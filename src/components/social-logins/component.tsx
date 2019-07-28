import React from 'react'
import { View, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { globalStyles } from '@styles/globalStyles';
import { titles } from '@styles/types';
import { colors } from '@styles/colors';
import { pmHelpers } from '@styles/marginLayout';

interface ISocialLogin {
  onPressGoogle: () => void,
  onPressFacebook: () => void
}

const SocialLogins = ({ onPressGoogle, onPressFacebook }: ISocialLogin) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Use social login</Text>
      <View style={styles.btnContainer}>
        <Button block bordered style={styles.btnGmail} onPress={onPressGoogle}>
          <Text style={styles.textGmail}>Gmail</Text>
        </Button>
        <Button block style={styles.btnFacebook} onPress={onPressFacebook}>
          <Text style={styles.textFacebook}>Facebook</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.centered,
  },
  text: {
    ...titles.body,
    color: colors.brandPrimary
  },
  btnContainer: {
    flexDirection: 'row',
    paddingTop: pmHelpers.S,
    justifyContent: 'space-around'
  },
  btnGmail: {
    width: 160,
    marginRight: 6,
    borderColor: colors.gmail,
    borderWidth: 2,
  },
  textGmail: {
    ...titles.button,
    color: colors.gmail,
  },
  btnFacebook: {
    width: 160,
    marginLeft: 6,
    backgroundColor: colors.facebook
  },
  textFacebook: {
    ...titles.button,
    color: colors.white
  }
})
SocialLogins.defaultProps = {
  onPressGoogle: () => { },
  onPressFacebook: () => { }

}

export default SocialLogins
