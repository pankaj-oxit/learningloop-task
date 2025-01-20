/** @format */

import { useUser } from "@/context/UserContext";
import { COLORS, globalStyles, moderateScale } from "@/utils";
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface ButtonTypes {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  fontSize?: number;
  backgroundColor?: string;
}

const Button: React.FC<ButtonTypes> = ({
  title,
  onPress,
  style,
  fontSize = moderateScale(16),
  backgroundColor = COLORS.primary,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.flexCenter,
        styles.container,
        style,
        { backgroundColor: backgroundColor },
      ]}
    >
      <Text style={[styles.btnText, { fontSize: fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: moderateScale(50),
    borderRadius: moderateScale(10),
  },

  btnText: {
    color: COLORS.white,
  },
});

export default Button;
