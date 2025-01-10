import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useDailyMacroStyles from '../DailyMacroStyles';
import FastImage from 'react-native-fast-image';

export const MacroNewsCard = ({item, handleCardPress}) => {
  const styles = useDailyMacroStyles();
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
              hasImage === 'verified'
                ? item.image.includes('https://')
                  ? item.image
                  : `https://appanalysisimages.s3.us-east-2.amazonaws.com/${item.image}`
                : hasImage === 'error'
                ? 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'
                : null,
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
