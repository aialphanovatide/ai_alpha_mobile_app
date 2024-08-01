import React, {useContext, useState} from 'react';
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
import BackButton from '../../Analysis/BackButton/BackButton';
import RenderHTML, {
  defaultSystemFonts,
  useInternalRenderer,
} from 'react-native-render-html';
import {AppThemeContext} from '../../../context/themeContext';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';
import useHomeNarrativeTradingStyles from './NarrativeTradingsStyles';
import ImageViewer from 'react-native-image-zoom-viewer';
import {ResumableZoom} from 'react-native-zoom-toolkit';

const CustomImageRenderer = props => {
  const {Renderer, rendererProps} = useInternalRenderer('img', props);
  const styles = useHomeNarrativeTradingStyles();
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

const NarrativeTradingArticle = ({route}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const {item_content, id, date, isNavigateFromHome} = route?.params;
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

  const simplifyDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
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

  const imageUri = `https://appnarrativetradingimages.s3.us-east-2.amazonaws.com/${id}.jpg`;

  const html_source = {
    html: findHtmlContent(item_content),
  };

  const images = [{url: imageUri, width: theme.width, height: 400}];

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
              uri: `https://appnarrativetradingimages.s3.us-east-2.amazonaws.com/${id}.jpg`,
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
      <View style={styles.backButtonWrapper}>
        <BackButton
          navigationHandler={isNavigateFromHome ? null : handleBackNavigation}
        />
      </View>
      <View style={styles.article}>
        <View style={styles.articleImageContainer}>
          <TouchableWithoutFeedback onPress={() => setImageZoomVisible(true)}>
            <FastImage
              style={styles.articleImage}
              resizeMode={'cover'}
              source={{
                uri: `https://appnarrativetradingimages.s3.us-east-2.amazonaws.com/${id}.jpg`,
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

export default NarrativeTradingArticle;
