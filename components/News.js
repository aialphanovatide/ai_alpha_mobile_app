import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const News = ({currentHomeSection}) => {
  // TODO - Function that fetchs the notices from the Current Home Section received (BTC, ETH, SOL), the code on Coin.js will map every new into an instance of this component
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>News</Text>
      <View style={styles.newsItem}>
        <View style={styles.newsDescription}>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, labore quasi dolor architecto expedita, eum quaerat
            consectetur vero, nostrum non eaque error ex impedit? Quam ullam
            quidem voluptas nobis sit!
          </Text>
        </View>
        <View style={styles.newsImage}>
          <Text>News Image</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#33333380'
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  newsDescription: {
    flex: 1,
  },
  newsImage: {
    width: 80,
    height: 80,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default News;
