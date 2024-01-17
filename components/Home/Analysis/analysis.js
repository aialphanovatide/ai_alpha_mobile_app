import * as React from 'react';
import {List} from 'react-native-paper';
import AnalysisItem from './analysisItem/analysisItem';
import useHomeAnalysisStyles from './analysisStyles';
import {Image} from 'react-native';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay';
import {useNavigation} from '@react-navigation/core';

const Analysis = () => {
  const styles = useHomeAnalysisStyles();
  const [expanded, setExpanded] = React.useState(false);
  // const [overlayVisible, setOverlayVisible] = React.useState(true);
  // const navigation = useNavigation();

  // const handleOverlayClose = () => {
  //   navigation.navigate('Account');
  //   setOverlayVisible(false);
  // };

  const handlePress = () => setExpanded(!expanded);

  const stories = [
    {
      id: 1,
      title:
        'Navigating the Complexities: An In-Depth Analysis of Urban Development Strategies',
      description:
        'In this comprehensive analysis, we delve into the intricate dynamics of urban development strategies, exploring the multifaceted approaches employed by diverse cities around the globe. Our examination encompasses a wide array of factors, from economic considerations and infrastructure planning to social inclusivity and environmental sustainability.',
      image:
        'https://cdn4.vectorstock.com/i/1000x1000/56/73/data-analysis-concept-vector-25125673.jpg',
    },
    {
      id: 2,
      title:
        'Navigating the Complexities: An In-Depth Analysis of Urban Development Strategies',
      description:
        'In this comprehensive analysis, we delve into the intricate dynamics of urban development strategies, exploring the multifaceted approaches employed by diverse cities around the globe. Our examination encompasses a wide array of factors, from economic considerations and infrastructure planning to social inclusivity and environmental sustainability.',
      image:
        'https://cdn4.vectorstock.com/i/1000x1000/56/73/data-analysis-concept-vector-25125673.jpg',
    },
    {
      id: 3,
      title:
        'Navigating the Complexities: An In-Depth Analysis of Urban Development Strategies',
      description:
        'In this comprehensive analysis, we delve into the intricate dynamics of urban development strategies, exploring the multifaceted approaches employed by diverse cities around the globe. Our examination encompasses a wide array of factors, from economic considerations and infrastructure planning to social inclusivity and environmental sustainability.',
      image:
        'https://cdn4.vectorstock.com/i/1000x1000/56/73/data-analysis-concept-vector-25125673.jpg',
    },
  ];

  return (
    <List.Section title="Analyses" titleStyle={styles.mainTitle}>
      <List.Accordion
        style={styles.item}
        titleStyle={styles.titleStyles}
        title={stories[0].title}
        description={stories[0].description}
        descriptionStyle={styles.description}
        left={() => (
          <Image source={{uri: stories[0].image}} style={styles.imageStyle} />
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
            image={story.image}
          />
        ))}
      </List.Accordion>
      {/* <UpgradeOverlay visible={overlayVisible} onClose={handleOverlayClose} /> */}
    </List.Section>
  );
};

export default Analysis;
