/** @format */

import { COLORS, globalStyles, moderateScale } from "@/utils";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  TextStyle,
  TextInputProps,
  ViewStyle,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  value: string;
  onChangeText: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  containerStyle,
  placeholder = "",
  ...rest
}) => {
  return (
    <View style={[styles.container, globalStyles.flexStart, containerStyle]}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        style={[styles.input]}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: moderateScale(50),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    borderColor: COLORS.lightGrey,
  },
  input: {
    height: "100%",
    width: "100%",
    padding: moderateScale(10),
    color: COLORS.black,
  },
});

export default InputField;
