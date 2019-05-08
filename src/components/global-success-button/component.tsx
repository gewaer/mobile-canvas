import React from "react";
import styles from "./stylesheet";
import { Button, Text } from "native-base";
import _ from "lodash";

interface Props {
  readonly name: string;
  onPress: () => void;
}

function SuccessButton(props: Props) {
  return (
    <Button light style={styles.bgButton} onPress={props.onPress()}>
      <Text>{props.name}</Text>
    </Button>
  );
}

export default SuccessButton;
