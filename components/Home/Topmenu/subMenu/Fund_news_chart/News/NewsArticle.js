import {Image, ScrollView, Text, View} from 'react-native';
import React from 'react';
import BackButton from '../../../../../Analysis/BackButton/BackButton';
import useNewsStyles from './NewsStyles';

const NewsArticle = ({route, navigation}) => {
  const styles = useNewsStyles();
  const item = route.params.item;
  const isStory = route.params.isStory;

  const handleReturn = () => {
    navigation.goBack();
  };

  const formatDate = dateString => {
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

  // Function to extract the title from the summaries, that detects the first sentences within "", using regular expressions, and returns it. It only returns the first because it can happen that is inside the summary text another sentences within "".

  const filterArticleTitle = summary => {
    const match = summary.match(/"([^"]+)"/);

    if (match && match[1]) {
      const title = match[1];
      const content = summary.replace(`"${title}"`, '').trim();

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

  // Function to filter the summary or texts of the article, removing the words that are put by the prompt generated, and aren't necessary in the summary or the title.
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
        for (const keyword of keywords_to_remove) {
          if (line.includes(keyword)) {
            line = line.replace(keyword, '');
          }
        }
        return line.trim();
      })
      .join('\n');

    return filteredText;
  };

  const {title, content} = filterArticleTitle(item.summary);
  return (
    <ScrollView style={[styles.container, styles.backgroundColor]}>
      <View style={styles.marginVertical}>
        <BackButton handleReturn={handleReturn} />
      </View>
      <View style={styles.article}>
        <Image
          style={styles.articleImage}
          resizeMode={'contain'}
          source={{
            uri:
              item.images.length > 0
                ? `data:image/png;base64,${item.images[0].image}`
                : 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
            width: 300,
          }}
        />
        <Text style={styles.articleTitle}>
          {filterText(isStory ? title : item.title)}
        </Text>
        <Text style={styles.articleDate}>{formatDate(item.date)}</Text>
        <Text style={styles.articleSummary}>
          {isStory ? filterText(content) : filterText(item.summary)}
        </Text>
      </View>
    </ScrollView>
  );
};

export default NewsArticle;
