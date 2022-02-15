import { PathConfigMap } from "@react-navigation/native";
import { StackParamList } from "navigation";

interface LinkingConfig {
  prefixes: string[];
  screens: PathConfigMap<StackParamList>;
}

export const linkingConfig: LinkingConfig = {
  prefixes: ['chatapp://'],
  screens: {
    Room: 'room/:roomId'
  }
}