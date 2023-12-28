import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const NewsItem = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <Image
        source={{
          uri: 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.summary}>{`${item.summary.substring(
          0,
          100,
        )}...`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: '#282828',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  summary: {
    fontSize: 14,
    margin: 5,
  },
});

export default NewsItem;
