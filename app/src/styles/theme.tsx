import { colors } from "./colors";
import { ITheme } from "./ITheme";

const text = {
  fontFamily: 'Montserrat',
  fontSize: 14,
  color: colors.text
};

export const theme: ITheme = {
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