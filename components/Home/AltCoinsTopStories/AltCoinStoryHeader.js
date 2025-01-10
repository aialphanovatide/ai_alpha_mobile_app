import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import useNewTopStoriesStyles from '../TopStories/NewTopStoriesStyles';

// Component to render the main card of the Alt Coins Top stories section. It receives the first alt coin story item, the function to handle the card press, and the function to simplify the date as props. It renders the story image, title, and date.

const AltCardStoryHeader = ({item, handleStoryPress, simplifyDate}) => {
  const styles = useNewTopStoriesStyles();
  const [hasImage, setHasImage] = useState('unverified');

  const verifyImageUrl = image => {
    if (image.toLowerCase().includes('https://')) {
      return true;
    } else {
      return false;
    }
  };

  // UseEffect hook to check if the image URL is valid and if the image exists. If the image exists, the image is displayed in the article. If the image does not exist, the article is displayed without an image.
  useEffect(() => {
    const checkImageURL = async url => {
      try {
        const imageUri = url.includes('https://')
          ? url
          : `https://sitesnewsposters.s3.us-east-2.amazonaws.com/${url}`;
        const response = await fetch(imageUri);
        if (
          (response.headers.map['content-type'] &&
            response.headers.map['content-type'].startsWith('image')) ||
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
  return (
    <>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => handleStoryPress(item, item.bot_id)}>
        <FastImage
          source={{
            uri:
              hasImage === 'verified'
                ? verifyImageUrl(item.image)
                  ? item.image
                  : `https://sitesnewsposters.s3.us-east-2.amazonaws.com/${item.image}`
                : hasImage === 'error'
                ? 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'
                : null,
            priority: FastImage.priority.high,
          }}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{item.title}</Text>
          <Text style={styles.newsDate}>{simplifyDate(item.date)}</Text>
        </View>
      </TouchableOpacity>
      <View style={[styles.horizontalLine, {marginTop: 8, marginBottom: 16}]} />
    </>
  );
};

export default AltCardStoryHeader;
