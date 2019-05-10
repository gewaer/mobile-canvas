import React from "react";
import styles from "./stylesheet";
import { Button, Text } from "native-base";
import _ from "lodash";

interface Props {
  readonly name: string;
  onPress: () => void;
}

const DangerButton = ({ name, onPress }: Props) => {
  return (
    <Button
      bordered
      block
      danger
      onPress={onPress}
      style={styles.buttonContainer}
    >
      <Text uppercase style={styles.buttonText}>
        {name}
      </Text>
    </Button>
  );
};

DangerButton.defaultProps = {
  onPress: () => {},
  name: "cancel"
};

export default DangerButton;
