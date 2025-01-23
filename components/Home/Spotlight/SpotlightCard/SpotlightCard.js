import React, {useEffect, useState} from 'react';
import useSpotlightStyles from '../SpotlightStyles';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

// Component to display a single card in the spotlight section, with the image and title of the article. It receives the data of the item to display and a function to handle the press event on the card, redirecting the user to the DailyDeepScreen
export const SpotlightCard = ({item, handleCardPress}) => {
  const styles = useSpotlightStyles();
  const [hasImage, setHasImage] = useState('unverified');
  // useeffect to check if the image exists in the server
  useEffect(() => {
    const checkImageURL = async url => {
      try {
        const imageUri = url.includes('https://')
          ? url
          : `https://appanalysisimages.s3.us-east-2.amazonaws.com/${url}`;
        const response = await fetch(imageUri);
        if (
          (response.headers.map['content-type'] &&
            response.headers.map['content-type'].startsWith('image/jpeg')) ||
          response.headers.map['content-type'].startsWith('binary/octet-stream')
        ) {
          setHasImage('verified');
        }
      } catch (error) {
        console.error('Error verifying the image URL:', error);
        setHasImage('error');
      }
    };
    checkImageURL(item.image);
  }, []);

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
      onPress={() => handleCardPress(item)}>
      <FastImage
        source={{
          uri:
            hasImage === 'verified'
              ? item.image.includes('https://')
                ? item.image
                : `https://appanalysisimages.s3.us-east-2.amazonaws.com/${item.image}`
              : hasImage === 'error'
              ? 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'
              : null,
          priority: FastImage.priority.high,
        }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {item.title.length > 50
            ? `${item.title.slice(0, 47)}...`
            : item.title}
        </Text>
        <Text style={styles.cardDate}>{simplifyDateTime(item.created_at)}</Text>
      </View>
    </TouchableOpacity>
  );
};
