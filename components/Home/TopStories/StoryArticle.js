import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
} from 'react-native';
import BackButton from '../../Analysis/BackButton/BackButton';
import useNewsStyles from '../Topmenu/subMenu/Fund_news_chart/News/NewsStyles';
import FastImage from 'react-native-fast-image';
import {AppThemeContext} from '../../../context/themeContext';
import {ResumableZoom} from 'react-native-zoom-toolkit';

const {Value, timing} = Animated;

const StoryArticle = ({route, navigation}) => {
  const styles = useNewsStyles();
  const item = route.params.item;
  const isStory = route.params.isStory;
  const {theme} = useContext(AppThemeContext);
  const [isImageZoomVisible, setImageZoomVisible] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  // Animation for the whole article component's first rendering, swiping from the right side of the screen

  const translateX = new Value(300);

  useEffect(() => {
    const animation = timing(translateX, {
      toValue: 0,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });

    animation.start();
  }, []);

  useEffect(() => {
    const checkImageURL = async url => {
      try {
        const response = await fetch(url);
        if (
          response.headers.map['content-type'] &&
          response.headers.map['content-type'].startsWith('binary/octet-stream')
        ) {
          setHasImage(true);
        }
      } catch (error) {
        console.error('Error verifying the image URL:', error);
        setHasImage(false);
      }
    };
    checkImageURL(
      `https://sitesnewsposters.s3.us-east-2.amazonaws.com/${item.image}`,
    );
  }, []);

  const handleReturn = () => {
    navigation.goBack();
  };

  const simplifyDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const imageUri = `https://sitesnewsposters.s3.us-east-2.amazonaws.com/${item.image}`;

  const images = [{url: imageUri, width: theme.width, height: 400}];

  const handleBackButtonImageClose = () => {
    setImageZoomVisible(false);
  };

  return (
    <ScrollView style={[styles.container, styles.backgroundColor]}>
      <Modal
        visible={isImageZoomVisible}
        animationType="fade"
        transparent={true}
        style={styles.zoomImageBackground}
        onRequestClose={() => handleBackButtonImageClose()}>
        <TouchableOpacity
          onPress={() => handleBackButtonImageClose()}
          style={styles.zoomImageDismissOverlay}
        />
        <ResumableZoom maxScale={2} minScale={1}>
          <FastImage
            style={styles.zoomedImage}
            resizeMode={'contain'}
            source={{
              uri: imageUri,
              priority: FastImage.priority.normal,
            }}
            fallback={true}
          />
        </ResumableZoom>
        <TouchableOpacity
          onPress={() => handleBackButtonImageClose()}
          style={styles.zoomImageDismissOverlay}
        />
      </Modal>
      <BackButton handleReturn={handleReturn} />
      <View style={styles.article}>
        <View style={styles.articleImageContainer}>
          <TouchableWithoutFeedback onPress={() => setImageZoomVisible(true)}>
            <FastImage
              style={styles.articleImage}
              resizeMode={'cover'}
              source={{
                uri: imageUri,
                priority: FastImage.priority.normal,
              }}
              fallback={true}
            />
          </TouchableWithoutFeedback>
          {!isImageZoomVisible && (
            <TouchableWithoutFeedback onPress={() => setImageZoomVisible(true)}>
              <Image
                source={require('../../../assets/images/analysis/magnifier.png')}
                resizeMode="contain"
                style={styles.zoomIndicator}
              />
            </TouchableWithoutFeedback>
          )}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.articleTitle}>{item.title}</Text>
          <Text style={styles.articleDate}>{simplifyDateTime(item.date)}</Text>
          <Text style={styles.articleSummary}>{item.content}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default StoryArticle;
