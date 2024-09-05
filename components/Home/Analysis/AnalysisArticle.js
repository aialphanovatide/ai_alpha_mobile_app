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
import useHomeAnalysisStyles from './analysisStyles';
import BackButton from '../../Analysis/BackButton/BackButton';
import RenderHTML, {
  defaultSystemFonts,
  useInternalRenderer,
} from 'react-native-render-html';
import {AppThemeContext} from '../../../context/themeContext';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import UnsubscribedMessage from './UnsubscribedMessage/UnsubscribedMessage';
import ImageViewer from 'react-native-image-zoom-viewer';
import {ResumableZoom} from 'react-native-zoom-toolkit';

const CustomImageRenderer = props => {
  const {Renderer, rendererProps} = useInternalRenderer('img', props);
  const styles = useHomeAnalysisStyles();
  const {theme} = useContext(AppThemeContext);
  const [isImageZoomVisible, setImageZoomVisible] = useState(false);
  const uri = rendererProps.source.uri;
  const thumbnailSource = {
    ...rendererProps.source,
    uri: uri,
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
        transparent={true}
        style={styles.zoomImageBackground}
        onRequestClose={() => handleBackButtonImageClose()}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown={true}
          enableImageZoom={true}
          onSwipeDown={() => setImageZoomVisible(false)}
          index={0}
          renderIndicator={() => null}
          backgroundColor={'rgba(0,0,0,0.45)'}
        />
      </Modal>
    </View>
  );
};

const AnalysisArticle = ({route}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const {analysis_content, analysis_id, date, isHistoryArticle} = route?.params;
  const styles = useHomeAnalysisStyles();
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
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    const checkImageURL = async url => {
      try {
        const response = await fetch(url);
        console.log(response.headers)
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
      `https://appanalysisimages.s3.us-east-2.amazonaws.com/${analysis_id}.jpg`,
    );
  }, []);

  console.log('Article has image?: ', hasImage);

  const simplifyDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  // Function to extract the images from the html content received

  const extractImages = htmlContent => {
    const imageMatches = [
      ...htmlContent.matchAll(
        /<img[^>]*src="([^"]+)"[^>]*height="([^"]+)"[^>]*>/g,
      ),
    ];

    const imagesArray = imageMatches.map(match => ({
      source: match[1],
      height: parseInt(match[2], 10),
    }));

    return imagesArray;
  };

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

  const handleSuscriptionNavigation = () => {
    navigation.navigate('Account', {
      screen: 'Subscriptions',
    });
  };

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

  const imageUri = `https://appanalysisimages.s3.us-east-2.amazonaws.com/${analysis_id}.jpg`;

  const images = [{url: imageUri, width: 500, height: 400}];

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
        <TouchableOpacity
          onPress={() => handleBackButtonImageClose()}
          style={styles.zoomImageDismissOverlay}
        />
        <ResumableZoom maxScale={2} minScale={1}>
          <FastImage
            style={styles.zoomedImage}
            resizeMode={'contain'}
            source={{
              uri: `https://appanalysisimages.s3.us-east-2.amazonaws.com/${analysis_id}.jpg`,
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
      <View style={styles.backButtonWrapper}>
        <BackButton
          navigationHandler={isHistoryArticle ? handleBackNavigation : null}
        />
      </View>
      <View
        style={[styles.article, !userInfo.subscribed ? {height: 1250} : {}]}>
        <View style={styles.articleImageContainer}>
          <TouchableWithoutFeedback onPress={() => setImageZoomVisible(true)}>
            <FastImage
              style={styles.articleImage}
              resizeMode={'cover'}
              source={{
                uri: `https://appanalysisimages.s3.us-east-2.amazonaws.com/${analysis_id}.jpg`,
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

export default AnalysisArticle;
