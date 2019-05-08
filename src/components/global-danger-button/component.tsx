import React from "react";
import styles from "./stylesheet";
import { Item, Label, Input, Button, Text } from "native-base";
import _ from "lodash";

interface Props {
  readonly name: string;
  onPress: () => void;
}

function DangerButton(props: Props) {
  return (
    <Button bordered danger onPress={props.onPress()}>
      <Text>{props.name}</Text>
    </Button>
  );
}

export default DangerButton;
