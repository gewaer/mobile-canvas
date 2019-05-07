import React from "react";
import styles from "./stylesheet";
import { Item, Label, Input } from "native-base";
import _ from "lodash";

interface Props {
  name: string;
  value: string;
  label: string;
  onChangeText: (name: string) => (text: string) => void;
  onSubmitEditing?: () => void | null;
  secure?: boolean;
}

const GlobalInput = (props: Props) => {
  return (
    <Item floating Label>
      <Label style={styles.formLabel}>{props.label}</Label>
      <Input
        value={props.value}
        onChangeText={props.onChangeText(props.name)}
        style={styles.input}
        secureTextEntry={props.secure}
        onSubmitEditing={
          _.has(props, "onSubmitEditing") && props.onSubmitEditing(props.name)
        }
      />
    </Item>
  );
};

export default GlobalInput;
