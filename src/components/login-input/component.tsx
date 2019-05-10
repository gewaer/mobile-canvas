import React from "react";
import styles from "./stylesheet";
import { Item, Label, Input } from "native-base";

interface Props {
  name: string;
  value: string;
  label: string;
  onChangeText: (name: string) => (text: string) => void;
  keyboardType: string;
  autoCapitalize: string;
  onSubmitEditing: (name: string) => void;
}

const LoginInput = (props: Props) => {
  return (
    <Item stackedLabel regular>
      <Label style={styles.formLabel}>{props.label}</Label>
      <Input
        onChangeText={props.onChangeText(props.name)}
        style={styles.input}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        onSubmitEditing={props.onSubmitEditing(props.name)}
      />
    </Item>
  );
};

export default LoginInput;
