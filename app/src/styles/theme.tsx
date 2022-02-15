import { colors } from "./colors";
import { Theme } from "./types";

const text = {
  fontFamily: 'Montserrat',
  fontSize: 14,
  color: colors.text
};

export const theme: Theme = {
  colors: {
    ...colors
  },
  text,
  textMedium: {
    ...text,
    fontWeight: '500',
  },
  textBold: {
    ...text,
    fontWeight: '700',
  }
};