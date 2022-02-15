import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ThemeContext } from "context";
import { ITheme } from "styles";

import ChevronRightIcon from 'assets/icons/chevron-right.svg';

interface IChatRoomItemProps {
  id: string;
  name: string;
  description: string;
  onPress: (roomId: string) => any;
};

/**
 * Presentational component that is used to render chat room
 * items in for example a flatlist.
 * @param id The room id that will be passed to the onPress
 * callback function 
 * @param name Name of the room
 * @param description A string that describes the room
 * @param onPress Callback function to handle when the item
 * has been pressed.
 */
export const ChatRoomItem: React.FC<IChatRoomItemProps> = ({
  id,
  name,
  description,
  onPress
}) => {
  const theme = useContext(ThemeContext);
  const styles = buildStyleSheet(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress(id)}>
        <View style={styles.buttonContentContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              <ChevronRightIcon />
            </View>

            <Text style={styles.name}>
              {name}
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const buildStyleSheet = (theme: ITheme) => StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: theme.colors.light
  },
  buttonContentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    width: 96,
    alignItems: 'flex-end',
    paddingRight: 20
  },
  name: {
    ...theme.textBold,
    color: theme.colors.primary,
  },
  descriptionContainer: {
    marginLeft: 96,
    marginRight: 20
  },
  description: theme.text
});