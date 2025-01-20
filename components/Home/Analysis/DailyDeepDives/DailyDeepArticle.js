import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BackButton from '../../../BackButton/BackButton';
import RenderHTML, {
  defaultSystemFonts,
  useInternalRenderer,
} from 'react-native-render-html';
import {AppThemeContext} from '../../../../context/themeContext';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';
import {RevenueCatContext} from '../../../../context/RevenueCatContext';
import UnsubscribedMessage from '../../UnsubscribedMessage/UnsubscribedMessage';
import {ResumableZoom} from 'react-native-zoom-toolkit';
import useDailyDeepsStyles from './dailyDeepsStyles.js';

// Component used to render the images in the Daily Deep Dives articles. It receives the props from the RenderHTML component and renders the image with a zoom functionality when pressed.
const CustomImageRenderer = props => {
  const {Renderer, rendererProps} = useInternalRenderer('img', props);
  const styles = useDailyDeepsStyles();
  const [isImageZoomVisible, setImageZoomVisible] = useState(false);
  const uri = rendererProps.source.uri;
  const thumbnailSource = {
    ...rendererProps.source,
    uri: uri,
  };

  const [imageDimensions, setImageDimensions] = useState({
    width: 380,
    height: 380,
  });

  const onImageLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    setImageDimensions({width, height});
  };

  const handleBackButtonImageClose = () => {
    setImageZoomVisible(false);
  };

  const images = [{url: thumbnailSource.uri, width: 700, height: 400}];
  return (
    <View style={{alignItems: 'center'}}>
      <Renderer {...rendererProps} onPress={() => setImageZoomVisible(true)} />
      <Modal
        visible={isImageZoomVisible}
        animationType="fade"
        transparent={true}
        style={styles.zoomImageBackground}
        onRequestClose={() => handleBackButtonImageClose()}>
        <View style={[styles.zoomImageBg]} />
        <TouchableOpacity
          onPress={() => handleBackButtonImageClose()}
          style={[styles.zoomImageDismissOverlay]}
        />
        <ResumableZoom maxScale={1.5} minScale={1}>
          <FastImage
            onLayout={onImageLayout}
            style={[
              styles.zoomedImage,
              {width: imageDimensions.width, height: imageDimensions.height},
            ]}
            resizeMode={'contain'}
            source={{
              uri: thumbnailSource.uri,
              priority: FastImage.priority.normal,
            }}
            fallback={true}
          />
        </ResumableZoom>
        <TouchableOpacity
          onPress={() => handleBackButtonImageClose()}
          style={[styles.zoomImageDismissOverlay]}
        />
      </Modal>
    </View>
  );
};

// Component that renders the Daily Deep Dives articles. It receives the route as a prop and renders the article with the corresponding content and image.

const DailyDeepArticle = ({route}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const {analysis_content, analysis_id, date, image, title, isHistoryArticle} =
    route?.params;
  const styles = useDailyDeepsStyles();
  const {theme} = useContext(AppThemeContext);
  const isAndroid = Platform.OS === 'android' ? true : false;
  const systemFonts = [
    ...defaultSystemFonts,
    isAndroid ? 'prompt_regular' : 'Prompt-Regular',
    isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
  ];
  const navigation = useNavigation();
  const {userInfo} = useContext(RevenueCatContext);
  const [isImageZoomVisible, setImageZoomVisible] = useState(false);
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
    checkImageURL(image);
  }, []);

  // Function to simplify the date and time of the article
  const simplifyDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  // Function to find the html content and apply the styles, formatting correctly the bold and bullet list elements, the font color, family and size.
  const findHtmlContent = content => {
    const replacedContent = content.replace(/\\/g, '');
    const strong_changed_content = replacedContent
      .replace(
        /<strong style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
        `<span style="color: ${
          isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
        };" class="bold";>`,
      )
      .replace(/<\/strong>/g, '</span>')
      .replace(/strong/g, 'p');
    const paragraphs_changed = strong_changed_content.replace(
      /p style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);"/g,
      `p style="color: ${
        isDarkMode ? 'rgb(250, 250, 250) ' : 'rgb(64, 64, 64)'
      };"`,
    );

    const span_changed = paragraphs_changed
      .replace(
        /<span style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
        `<span style="color: ${
          isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
        };">`,
      )
      .replace(/style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);"/g, '');

    const bullet_lists_updated_content = span_changed.replace(
      /<ul>/g,
      `<ul style="color: ${
        isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(23, 23, 23)'
      };">`,
    );
    const br_replaced_content = bullet_lists_updated_content.replace(
      /<br>/g,
      '',
    );
    return br_replaced_content;
  };

  // Function to handle the navigation to the subscription screen
  const handleSuscriptionNavigation = () => {
    navigation.navigate('Account', {
      screen: 'Subscriptions',
    });
  };

  // Function to handle the navigation back to the History section
  const handleBackNavigation = () => {
    navigation.goBack();
    navigation.navigate('Home', {
      screen: 'InitialHome',
      params: {},
    });
    navigation.navigate('Analysis', {
      screen: 'History',
      params: {},
    });
  };

  const html_styles = {
    p: {
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    h1: {
      fontSize: theme.responsiveFontSize * 1.5,
      marginVertical: 4,
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    h2: {
      fontSize: theme.responsiveFontSize * 1.25,
      marginVertical: 4,
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    h3: {
      fontSize: theme.responsiveFontSize * 1.25,
      marginVertical: 4,
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_medium' : 'Prompt-Medium',
    },
    h4: {
      fontSize: theme.responsiveFontSize * 1.25,
      marginVertical: 4,
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_medium' : 'Prompt-Medium',
    },

    ul: {
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
      fontSize: theme.responsiveFontSize * 0.85,
    },
    ol: {
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
      fontSize: theme.responsiveFontSize * 0.9,
    },
    span: {
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
      fontSize: theme.responsiveFontSize * 0.85,
    },
    li: {
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
      fontSize: theme.responsiveFontSize * 0.85,
    },
  };

  const classes_styles = {
    'ql-size-huge': {
      fontSize: theme.responsiveFontSize * 1.5,
      marginVertical: 4,
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    'ql-size-large': {
      fontSize: theme.responsiveFontSize * 1.25,
      marginVertical: 4,
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_medium' : 'Prompt-Medium',
    },
    'ql-size-small': {
      fontSize: theme.responsiveFontSize * 0.65,
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
    },
    bold: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
  };

  const html_source = {
    html: findHtmlContent(analysis_content),
  };

  const handleBackButtonImageClose = () => {
    setImageZoomVisible(false);
  };

  const renderers = {
    img: CustomImageRenderer,
  };

  return (
    <ScrollView style={styles.container}>
      <Modal
        visible={isImageZoomVisible}
        transparent={true}
        animationType="fade"
        style={styles.zoomImageBackground}
        onRequestClose={() => handleBackButtonImageClose()}>
        <View style={[styles.zoomImageBg]} />
        <TouchableOpacity
          onPress={() => handleBackButtonImageClose()}
          style={styles.zoomImageDismissOverlay}
        />
        <ResumableZoom maxScale={2} minScale={1}>
          <FastImage
            style={styles.zoomedImage}
            resizeMode={'contain'}
            source={{
              uri:
                hasImage === 'verified'
                  ? image.includes('https://')
                    ? image
                    : `https://appanalysisimages.s3.us-east-2.amazonaws.com/${image}`
                  : hasImage === 'error'
                  ? 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'
                  : null,
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
      <UnsubscribedMessage
        isSubscribed={userInfo?.subscribed}
        handleSubscriptionNavigation={handleSuscriptionNavigation}
      />
      <BackButton
        navigationHandler={isHistoryArticle ? handleBackNavigation : null}
      />
      <View
        style={[styles.article, !userInfo.subscribed ? {height: 1250} : {}]}>
        <View style={styles.articleImageContainer}>
          <TouchableWithoutFeedback onPress={() => setImageZoomVisible(true)}>
            <FastImage
              style={styles.articleImage}
              resizeMode={'cover'}
              source={{
                uri:
                  hasImage === 'verified'
                    ? image.includes('https://')
                      ? image
                      : `https://appanalysisimages.s3.us-east-2.amazonaws.com/${image}`
                    : hasImage === 'error'
                    ? 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'
                    : null,
                priority: FastImage.priority.normal,
              }}
              fallback={true}
            />
          </TouchableWithoutFeedback>
          {!isImageZoomVisible && (
            <TouchableWithoutFeedback onPress={() => setImageZoomVisible(true)}>
              <Image
                source={require('../../../../assets/images/analysis/magnifier.png')}
                resizeMode="contain"
                style={styles.zoomIndicator}
              />
            </TouchableWithoutFeedback>
          )}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.articleDate}>{simplifyDateTime(date)}</Text>
          <RenderHTML
            source={html_source}
            contentWidth={theme.width - 50}
            systemFonts={systemFonts}
            tagsStyles={html_styles}
            classesStyles={classes_styles}
            renderers={renderers}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DailyDeepArticle;
