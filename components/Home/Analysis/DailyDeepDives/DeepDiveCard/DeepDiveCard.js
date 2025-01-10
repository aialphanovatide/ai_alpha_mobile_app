import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useNewDailyDeepDivesStyles from '../NewDailyDeepDivesStyles';
import FastImage from 'react-native-fast-image';

// Component to render the Daily Deep Dive card in the New Daily Deep Dives section. It displays the image, title, and date of the Daily Deep Dive. It receives the item data, the function to handle the press on the card, the item number, and the total amount of items as props.

const DeepDiveCard = ({item, handleCardPress, itemNumber, itemsAmount}) => {
  const styles = useNewDailyDeepDivesStyles();
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
      <View
        style={[
          styles.deepDiveCard,
          itemNumber === 0 && {marginLeft: 0},
          itemNumber === itemsAmount - 1 && {marginRight: 48},
        ]}>
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
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardContent}>
          <Text style={styles.date}>{simplifyDateTime(item.created_at)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DeepDiveCard;
