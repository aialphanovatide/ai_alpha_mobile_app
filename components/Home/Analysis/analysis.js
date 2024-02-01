import * as React from 'react';
import {List} from 'react-native-paper';
import AnalysisItem from './analysisItem/analysisItem';
import useHomeAnalysisStyles from './analysisStyles';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {analysis_mock} from './analysis_mock';
const Analysis = () => {
  const styles = useHomeAnalysisStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  const stories = [
    {
      id: 1,
      title:
        'Navigating the Complexities: An In-Depth Analysis of Urban Development Strategies',
      description:
        'In this comprehensive analysis, we delve into the intricate dynamics of urban development strategies, exploring the multifaceted approaches employed by diverse cities around the globe. Our examination encompasses a wide array of factors, from economic considerations and infrastructure planning to social inclusivity and environmental sustainability.',
      imageBase64: analysis_mock,
    },
    {
      id: 2,
      title:
        'Navigating the Complexities: An In-Depth Analysis of Urban Development Strategies',
      description:
        'In this comprehensive analysis, we delve into the intricate dynamics of urban development strategies, exploring the multifaceted approaches employed by diverse cities around the globe. Our examination encompasses a wide array of factors, from economic considerations and infrastructure planning to social inclusivity and environmental sustainability.',
      imageBase64: analysis_mock,
    },
    {
      id: 3,
      title:
        'Navigating the Complexities: An In-Depth Analysis of Urban Development Strategies',
      description:
        'In this comprehensive analysis, we delve into the intricate dynamics of urban development strategies, exploring the multifaceted approaches employed by diverse cities around the globe. Our examination encompasses a wide array of factors, from economic considerations and infrastructure planning to social inclusivity and environmental sustainability.',
      imageBase64: analysis_mock,
    },
  ];

  return (
    <List.Section title="Analysis" titleStyle={styles.mainTitle}>
      <List.Accordion
        style={styles.item}
        titleStyle={styles.titleStyles}
        title={stories[0].title}
        titleNumberOfLines={2}
        // description={stories[0].description}
        // descriptionStyle={styles.description}
        left={() => (
          <Image
            source={{uri: `data:image/png;base64,${analysis_mock}`}}
            style={styles.imageStyle}
          />
        )}
        right={() => (
          <Image
            source={
              expanded
                ? require('../../../assets/images/arrow-up.png')
                : require('../../../assets/images/arrow-down.png')
            }
            style={styles.arrowDown}
            resizeMode="contain"
          />
        )}
        expanded={expanded}
        onPress={handlePress}>
        {stories.map(story => (
          <AnalysisItem
            key={story.id}
            title={story.title}
            description={story.description}
            imageBase64={story.imageBase64}
          />
        ))}
      </List.Accordion>
      {/* <UpgradeOverlay visible={overlayVisible} onClose={handleOverlayClose} /> */}
    </List.Section>
  );
};

export default Analysis;
