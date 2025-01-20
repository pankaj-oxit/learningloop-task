/** @format */

import { moderateScale } from "./responsiveMetrics";

export const FONT_FAMILIES = {
  bold: "Geologica-Bold",
  light: "Geologica-Light",
  medium: "Geologica-Medium",
  regular: "Geologica-Regular",
  semiBold: "Geologica-SemiBold",
};

export const FONT_SIZE = Object.fromEntries(
  [10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 44, 48].map((size) => [
    size,
    moderateScale(size),
  ])
);
