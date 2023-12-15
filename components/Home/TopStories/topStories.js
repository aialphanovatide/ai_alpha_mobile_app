import React, { useState, useEffect } from 'react';
import { List } from 'react-native-paper';
import StoryItem from './Storyitem/storyItem';
import styles from './topStoriesStyles'
import { Image } from 'react-native';
import { getService } from '../../../services/aiAlphaApi';

const TopStories = () => {

  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const [topStories, setTopStories] = useState([]);


  useEffect(() => {
    const fetchTopStories = async () => {
      try {
       
        const data = await getService(`/api/get/allTopStories`);
        setTopStories(data);
      } catch (error) {
        console.error('Error fetching top stories:', error.message);
      }
    };

    fetchTopStories();
  }, []); 

  const stories = topStories.top_stories

  return (
    <List.Section title="Top Stories" titleStyle={styles.mainTitle}>
      <List.Accordion
        titleStyle={styles.titleStyles}
        title={stories ? stories[0].summary: 'Loading'}
        description={stories ? stories[0].summary: 'Loading'}
        left={() => <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg' }} style={styles.imageStyle} />}
        expanded={expanded}
        onPress={handlePress}>
        {stories?.map((story, i) => (
          <StoryItem key={i} title={story.summary} description={story.summary} image={'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'} />
        ))}
      </List.Accordion>
    </List.Section>
  );
};

export default TopStories;
