import React from "react";
import styles from "./stylesheet";
import { Button, Text } from "native-base";
import _ from "lodash";
import { titles } from "@styles/types";
import { colors } from "@styles/colors";

interface Props {
  readonly name: string;
  onPress: () => void;
}

function SuccessButton(props: Props) {
  return (
    <Button block style={styles.bgButton} onPress={props.onPress()}>
      <Text uppercase style={[titles.button, { color: colors.white }]}>
        {props.name}
      </Text>
    </Button>
  );
}

SuccessButton.defaultProps = {
  name: "add",
  onPress: () => {}
};

export default SuccessButton;
