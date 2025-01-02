import React from 'react';
import useSpotlightStyles from '../SpotlightStyles';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

// Component to display a single card in the spotlight section, with the image and title of the article. It receives the data of the item to display and a function to handle the press event on the card, redirecting the user to the DailyDeepScreen
export const SpotlightCard = ({item, handleCardPress}) => {
  const styles = useSpotlightStyles();
  // Function to simplify the date format of the story item to a more readable format
  const simplifyDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
  };
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleCardPress(item, item.bot_id)}>
      <FastImage
        source={{
          uri: item.image
            ? item.image
            : 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
          priority: FastImage.priority.high,
        }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {item.title.length > 50
            ? `${item.title.slice(0, 47)}...`
            : item.title.length}
        </Text>
        <Text style={styles.cardDate}>{simplifyDateTime(item.created_at)}</Text>
      </View>
    </TouchableOpacity>
  );
};
