import React from "react";
import styles from "./stylesheet";
import { Item, Label, Input } from "native-base";
import _ from "lodash";
import { colors } from "../../styles/colors";

interface Props {
  name: string;
  value: string;
  label: string;
  secure?: boolean;
  autoCapitalize?: string;
  autoCorrect?: boolean;
  keyboardAppearance?: string;
  keyboardType?: string;
  maxLength?: number;
  onBlur?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  returnKeyLabel?: string;
  selectionColor?: string;
  onChangeText: (name: string) => (e: string) => any;
}

const GlobalInput = ({ label, onChangeText, name }: Props) => {
  return (
    <Item floatingLabel style={styles.itemContainer}>
      <Label style={styles.formLabel}>{label.toUpperCase()}</Label>
      <Input style={styles.input} onChangeText={onChangeText(name)} />
    </Item>
  );
};

export default GlobalInput;
