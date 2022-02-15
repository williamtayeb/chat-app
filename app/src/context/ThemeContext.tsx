import { createContext } from "react";
import { theme } from "styles";
import { Theme } from "styles/types";

export const ThemeContext = createContext<Theme>(theme);