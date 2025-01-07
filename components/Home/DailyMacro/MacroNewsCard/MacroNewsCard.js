import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useDailyMacroStyles from '../DailyMacroStyles';
import FastImage from 'react-native-fast-image';

export const MacroNewsCard = ({item, handleCardPress}) => {
  const styles = useDailyMacroStyles();
  // Function to simplify the date and time of the Daily Deep card
  const simplifyDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
  };

  return (
    <TouchableOpacity style={styles.flex} onPress={() => handleCardPress(item)}>
      <View style={styles.card}>
        <FastImage
          source={{
            uri:
              item.image !== ''
                ? item.image
                : `https://appanalysisimages.s3.us-east-2.amazonaws.com/${item.id}.jpg`,
            priority: FastImage.priority.normal,
          }}
          resizeMode="cover"
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>
          {item.title.length > 45
            ? `${item.title.slice(0, 40)}...`
            : item.title}
        </Text>
        <View style={styles.cardContent}>
          <Text style={styles.date}>{simplifyDateTime(item.created_at)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
