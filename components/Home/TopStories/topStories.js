import * as React from 'react';
import { List } from 'react-native-paper';
import StoryItem from './Storyitem/storyItem';
import styles from './topStoriesStyles'
import { Image } from 'react-native';

const TopStories = () => {

  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);

  const stories = [
    { id: 1, 
      title: 'Bitcoin Whales Withdraw $1 Billion from Exchanges as Ethereum and XRP Gain Attention', 
      description: '- Around 25,000 BTC, worth nearly $1 billion, has been withdrawn from crypto exchange wallets in the last two weeks. - High-net-worth traders have been accumulating Ethereum for nine consecutive days, signaling a possible upcoming rally. - XRP whales have purchased around 11 million XRP, worth roughly $6.82 million, in the past week.', 
      image: 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg' },
    { id: 2, 
      title: 'Bitcoin Whales Withdraw $1 Billion from Exchanges as Ethereum and XRP Gain Attention', 
      description: '- Around 25,000 BTC, worth nearly $1 billion, has been withdrawn from crypto exchange wallets in the last two weeks. - High-net-worth traders have been accumulating Ethereum for nine consecutive days, signaling a possible upcoming rally. - XRP whales have purchased around 11 million XRP, worth roughly $6.82 million, in the past week.', 
      image: 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg' },
    { id: 3, 
      title: 'Bitcoin Whales Withdraw $1 Billion from Exchanges as Ethereum and XRP Gain Attention', 
      description: '- Around 25,000 BTC, worth nearly $1 billion, has been withdrawn from crypto exchange wallets in the last two weeks. - High-net-worth traders have been accumulating Ethereum for nine consecutive days, signaling a possible upcoming rally. - XRP whales have purchased around 11 million XRP, worth roughly $6.82 million, in the past week.', 
      image: 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg' },
  ];

  return (
    <List.Section title="Top Stories" titleStyle={styles.mainTitle}>
      <List.Accordion
        titleStyle={styles.titleStyles}
        title={stories[0].title}
        description={stories[0].description}
        left={() => <Image source={{ uri: stories[0].image }} style={styles.imageStyle} />}
        expanded={expanded}
        onPress={handlePress}>
        {stories.map((story) => (
          <StoryItem key={story.id} title={story.title} description={story.description} image={story.image} />
        ))}
      </List.Accordion>
    </List.Section>
  );
};

export default TopStories;
