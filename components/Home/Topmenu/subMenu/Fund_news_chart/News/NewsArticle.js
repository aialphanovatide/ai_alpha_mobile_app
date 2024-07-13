import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import BackButton from '../../../../../Analysis/BackButton/BackButton';
import useNewsStyles from './NewsStyles';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import {AppThemeContext} from '../../../../../../context/themeContext';

const {Value, timing} = Animated;

const NewsArticle = ({route, navigation}) => {
  const styles = useNewsStyles();
  const item = route.params.item;
  const isStory = route.params.isStory;
  const storyImages = isStory ? item.images : [];
  const {theme} = useContext(AppThemeContext);
  const [isImageZoomVisible, setImageZoomVisible] = useState(false);

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


  const handleReturn = () => {
    navigation.goBack();
  };

  const formatDate = dateString => {
    if (dateString.includes('ago')) {
      return dateString;
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return (
      `${year}/${month}/${day}` +
      (hours !== '00' || minutes !== '00' ? ` ${hours}:${minutes}` : '')
    );
  };

  const filterArticleTitle = summary => {
    const match = summary.match(/"([^"]+)"/);

    if (match && match[1]) {
      const title = match[1];
      const content = summary.replace(`"${match}"`, '').trim();

      return {
        title,
        content,
      };
    } else {
      const first_line_swap = summary.indexOf('\n');

      return first_line_swap !== -1
        ? {
            title: filterText(summary.slice(0, first_line_swap)),
            content: summary,
          }
        : {title: filterText(summary.slice(0, 100)), content: summary};
    }
  };

  const filterText = summary => {
    const keywords_to_remove = [
      'Headline:',
      'Summary:',
      'Step One:',
      'Step Two:',
      'Step Three:',
      'Secondary Summary:',
      'Secondary ',
      'Points:',
    ];

    const filteredText = summary
      .split('\n')
      .map(line => {
        if (line.trim() === '') {
          return '';
        }
        for (const keyword of keywords_to_remove) {
          if (line.includes(keyword)) {
            line = line.replace(keyword, '');
          }
        }
        return line.trim();
      })
      .filter(line => line !== '')
      .join('\n');

    return filteredText;
  };
  const storyFilteredContent = isStory
    ? filterArticleTitle(item.summary)
    : null;
  const imageUri = isStory
    ? `data:image/jpg;base64,${storyImages[0].image}`
    : `https://appnewsposters.s3.us-east-2.amazonaws.com/${item.image}`;

  const images = [{url: imageUri, width: theme.width, height: 400}];

  const handleBackButtonImageClose = () => {
    setImageZoomVisible(false);
  };

  return (
    <ScrollView style={[styles.container, styles.backgroundColor]}>
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
      <View style={styles.marginVertical}>
        <BackButton handleReturn={handleReturn} />
      </View>
      <View style={styles.article}>
        <TouchableWithoutFeedback onPress={() => setImageZoomVisible(true)}>
          <FastImage
            style={styles.articleImage}
            resizeMode={'contain'}
            source={{
              uri: isStory
                ? `data:image/png;base64,${storyImages[0].image}`
                : imageUri,
              priority: FastImage.priority.normal,
            }}
            fallback={true}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.articleTitle}>{isStory ? storyFilteredContent.title : item.title}</Text>
        <Text style={styles.articleDate}>{formatDate(item.date)}</Text>
        <Text style={styles.articleSummary}>
          {isStory ? storyFilteredContent.content : item.content}
        </Text>
      </View>
    </ScrollView>
  );
};

export default NewsArticle;
