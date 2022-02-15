import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { format } from 'date-fns';

import { ThemeContext } from 'context';
import { ITheme } from 'styles';

interface IMessageItemProps {
  author: string;
  avatarImageUrl: string;
  content: string;
  imageUrl: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  type: 'text' | 'image';
};

export const MessageItem: React.FC<IMessageItemProps> = ({
  author,
  avatarImageUrl,
  content,
  imageUrl,
  createdAt,
  type
}) => {
  const theme = useContext(ThemeContext);
  const styles = buildStyleSheet(theme);

  const dateString = format(createdAt.toDate(), 'dd/MM/yy hh:mm');
  
  return (
    <View style={styles.container}>
      <View>
        {avatarImageUrl ? (
          <Image
            source={{ uri: avatarImageUrl }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatar} />
        )}
      </View>

      <View style={{ marginLeft: 20 }}>
        <Text style={styles.author}>
          {author}
        </Text>

        <Text style={styles.date}>
          {dateString}
        </Text>

        {type === 'text' && (
          <Text style={styles.content}>
            {content}
          </Text>
        )}

        {(type === 'image' && imageUrl) && (
          <View style={{ marginTop: 12 }}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const buildStyleSheet = (theme: ITheme) => StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: theme.colors.dark,
    flexDirection: 'row',
    padding: 20
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 200 / 2,
    backgroundColor: theme.colors.dark
  },
  author: {
    ...theme.textBold,
    color: theme.colors.primary,
  },
  date: {
    ...theme.text,
    color: theme.colors.darkText,
  },
  content: {
    ...theme.text,
    marginTop: 12
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 4,
    backgroundColor: theme.colors.dark
  }
});