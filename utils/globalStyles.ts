/** @format */

import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { screenHeight, screenWidth } from "./responsiveMetrics";

export const globalStyles = StyleSheet.create({
  appContainer: {
    width: screenWidth,
    height: screenHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  flexStart: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  flexEnd: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  flexSpaceBetween: {
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  flexSpaceBetweenRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
