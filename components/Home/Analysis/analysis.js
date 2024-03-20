import * as React from 'react';
import {List} from 'react-native-paper';
import AnalysisItem from './analysisItem/analysisItem';
import useHomeAnalysisStyles from './analysisStyles';
import {Image, View, Text, TouchableOpacity} from 'react-native';
// import {analysis_mock} from './analysis_mock';
import {getService} from '../../../services/aiAlphaApi';
import {useNavigation} from '@react-navigation/core';
import {AboutIcon} from '../Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutIcon';
import {home_static_data} from '../homeStaticData';
const Analysis = ({handleAboutPress}) => {
  const styles = useHomeAnalysisStyles();
  const [analysisData, setAnalysisData] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const navigation = useNavigation();
  const aboutIconStyles = {
    top: 12.5,
  };

  const handlePress = () => setExpanded(!expanded);
  React.useEffect(() => {
    const getAnalysisData = async () => {
      try {
        const data = await getService(`/get_analysis`);
        if (data.success) {
          const parsed_data = data.message.map(item => {
            return {
              analysis: parseAnalysisContent(item.analysis)[0],
              raw_analysis: item.analysis,
              id: item.analysis_id,
              coin_bot_id: item.coin_bot_id,
              created_at: item.created_at,
              title: extractFirstTitleAndImage(item.analysis).title,
              image: extractFirstTitleAndImage(item.analysis).imageSrc,
            };
          });
          setAnalysisData(parsed_data.slice(0, 10));
        } else {
          setAnalysisData([]);
        }
      } catch (error) {
        console.log('Error trying to get analysis data: ', error);
      }
    };
    getAnalysisData();
  }, []);

  const handleAnalysisNavigation = analysis => {
    navigation.navigate('AnalysisArticleScreen', {
      analysis_content: analysis.raw_analysis,
      coin_bot_id: analysis.coin_bot_id,
    });
  };

  const parseAnalysisContent = content => {
    const replacedContent = content.replace(/<br>/g, '\n');
    const fragments = replacedContent.split(/(<img.*?>|<p>.*?<\/p>)/g);

    const components = fragments.map((fragment, index) => {
      if (fragment.startsWith('<p>')) {
        if (fragment.startsWith('<p><img')) {
          let src = fragment.match(/src="(.*?)"/)[1];
          return src;
        }
        return fragment.replace(/<\/?p>/g, '');
      } else {
        return null;
      }
    });
    const raw_content = components.filter(component => component !== null);
    return [
      raw_content.reduce(
        (acc, current, index) => {
          if (current.startsWith('data:image/')) {
            acc.images = [...acc.images, current];
          } else {
            acc.titles = [...acc.titles, current];
          }
          return acc;
        },
        {titles: [], images: []},
      ),
      raw_content,
    ];
  };

  const extractFirstTitleAndImage = content => {
    let firstTitle = '';
    let firstImageSrc = '';

    const titleMatch = content.match(
      /<(h[1-2])[^>]*>(.*?)<\/\1>|<p[^>]*>(.*?)<\/p>/,
    );
    if (titleMatch) {
      firstTitle = titleMatch[2] || titleMatch[3];
      firstTitle = firstTitle.replace(/<[^>]+>/g, '');
      firstTitle = firstTitle.replace(/&[^\s;]+;?/g, '');
    }

    const imageMatch = content.match(/<img[^>]+src="([^">]+)"/);
    if (imageMatch) {
      firstImageSrc = imageMatch[1];
    }
    return {
      title: firstTitle,
      imageSrc: firstImageSrc,
    };
  };

  return (
    <List.Section title="Analysis" titleStyle={styles.mainTitle}>
      <AboutIcon
        handleAboutPress={handleAboutPress}
        description={home_static_data.analysis.sectionDescription}
        additionalStyles={aboutIconStyles}
      />
      {analysisData?.length === 0 ? (
        <Text style={styles.emptyMessage}>There aren't analysis to show.</Text>
      ) : (
        <View style={styles.itemsContainer}>
          {analysisData?.slice(0,5).map((story, index) => (
            <View
              style={[
                styles.itemWrapper,
                index > 0 && !expanded ? styles.hidden : {},
              ]}
              key={index}>
              <AnalysisItem
                key={story.id}
                title={story.title}
                image={story.image}
                item={story}
                handleAnalysisNavigation={handleAnalysisNavigation}
              />
              <TouchableOpacity
                style={[styles.arrowContainer, index > 0 ? styles.hidden : {}]}
                onPress={() => handlePress()}>
                <Image
                  source={
                    expanded
                      ? require('../../../assets/images/arrow-up.png')
                      : require('../../../assets/images/arrow-down.png')
                  }
                  style={styles.arrowDown}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </List.Section>
  );
};

export default Analysis;
