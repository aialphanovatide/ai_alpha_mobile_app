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
import BackButton from '../../BackButton/BackButton';
import RenderHTML, {
  defaultSystemFonts,
  useInternalRenderer,
} from 'react-native-render-html';
import {AppThemeContext} from '../../../context/themeContext';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';
import useHomeNarrativeTradingStyles from './MarketNarrativesStyles';
import {ResumableZoom} from 'react-native-zoom-toolkit';

// Component that renders the image in the market narratives article. It receives the image data as props and renders the image with a zoom functionality. It is used within the article's images or in the main image of the article.

const CustomImageRenderer = props => {
  const {Renderer, rendererProps} = useInternalRenderer('img', props);
  const styles = useHomeNarrativeTradingStyles();
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

  // Function that sets the image dimensions when the image layout is calculated.
  const onImageLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    setImageDimensions({width, height});
  };

  // Function that handles the closing of the image zoom modal when the back button is pressed.
  const handleBackButtonImageClose = () => {
    setImageZoomVisible(false);
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Renderer {...rendererProps} onPress={() => setImageZoomVisible(true)} />
      <Modal
        visible={isImageZoomVisible}
        transparent={true}
        animationType="fade"
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

// Component that renders the article of a market narrative. It receives the article data as props and renders the article's image, date, and content. It also renders the zoom functionality for the images in the article, and uses the RenderHTML component to render the article's content.

const MarketNarrativesArticle = ({route}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const {item_content, id, date, image, title, isNavigateFromHome} = route?.params;
  const styles = useHomeNarrativeTradingStyles();
  const {theme} = useContext(AppThemeContext);
  const isAndroid = Platform.OS === 'android' ? true : false;
  const systemFonts = [
    ...defaultSystemFonts,
    isAndroid ? 'prompt_regular' : 'Prompt-Regular',
    isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
  ];
  const navigation = useNavigation();
  const [isImageZoomVisible, setImageZoomVisible] = useState(false);
  const [hasImage, setHasImage] = useState('unverified');

  // useeffect to check if the image exists in the server
  useEffect(() => {
    const checkImageURL = async url => {
      try {
        const imageUri = url.includes('https://')
          ? url
          : `https://appnarrativetradingimages.s3.us-east-2.amazonaws.com/${id}.jpg`;
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

  // Function to simplify the date and time of the article.

  const simplifyDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  // Function to format the HTML content of the article

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
    return bullet_lists_updated_content;
  };

  // Function that handles the navigation back to the previous screen. If the screen is the InitialHome screen, it navigates to the InitialHome screen. Otherwise, it navigates to the Home screen with the InitialHome and Analysis screens as parameters.
  const handleBackNavigation = () => {
    navigation.goBack();
    if (
      navigation
        .getState()
        .routes.find(historyRoute => historyRoute.name === 'InitialHome')
    ) {
      navigation.navigate('InitialHome');
    } else {
      navigation.navigate('Home', {
        screen: 'InitialHome',
        params: {},
      });
      navigation.navigate('Analysis', {
        screen: 'NarrativeTrading',
        params: {},
      });
    }
  };

  // Styles for the HTML content of the article.
  const html_styles = {
    p: {
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    ul: {
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
      fontSize: theme.responsiveFontSize * 0.85,
    },
    span: {
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
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    bold: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    'ql-size-small': {
      fontSize: theme.responsiveFontSize * 0.65,
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
    },
  };

  const imageUri = `https://sitesnewsposters.s3.us-east-2.amazonaws.com/${id}.jpg`;

  const html_source = {
    html: findHtmlContent(item_content),
  };

  // Function that handles the closing of the image zoom modal when the back button is pressed.
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
        animationType="fade"
        transparent={true}
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
                    : `https://appnarrativetradingimages.s3.us-east-2.amazonaws.com/${id}.jpg`
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
      <BackButton
        navigationHandler={isNavigateFromHome ? null : handleBackNavigation}
      />
      <View style={styles.article}>
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
                      : `https://appnarrativetradingimages.s3.us-east-2.amazonaws.com/${id}.jpg`
                    : hasImage === 'error'
                    ? 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'
                    : null,
                priority: FastImage.priority.normal,
              }}
              defaultSource={require('../../../assets/images/home/default_news.png')}
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

export default MarketNarrativesArticle;
