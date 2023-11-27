import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import New from './New';
import {TouchableOpacity} from 'react-native-gesture-handler';

const newsMock = [
  {
    title: 'new#1',
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium, labore quasi dolor architecto expedita, eum quaerat
                consectetur vero, nostrum non eaque error ex impedit? Quam ullam
                quidem voluptas nobis sit!`,
    image: 'image#1',
    date: '00/00/00',
  },
  {
    title: 'new#2',
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium, labore quasi dolor architecto expedita, eum quaerat
                consectetur vero, nostrum non eaque error ex impedit? Quam ullam
                quidem voluptas nobis sit!`,
    image: 'image#2',
    date: '00/00/00',
  },
  {
    title: 'new#3',
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium, labore quasi dolor architecto expedita, eum quaerat
                consectetur vero, nostrum non eaque error ex impedit? Quam ullam
                quidem voluptas nobis sit!`,
    image: 'image#3',
    date: '00/00/00',
  },
  {
    title: 'new#4',
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium, labore quasi dolor architecto expedita, eum quaerat
                consectetur vero, nostrum non eaque error ex impedit? Quam ullam
                quidem voluptas nobis sit!`,
    image: 'image#4',
    date: '00/00/00',
  },
];

const News = ({currentHomeSection}) => {
  const [currentNew, setCurrentNew] = useState(null);
  // TODO - Function that fetchs the notices from the Current Home Section received (BTC, ETH, SOL), the code on Coin.js will map every new into an instance of this component
  const loadNewData = newData => {
    setCurrentNew(newData);
  };

  const returnToNews = () => {
    setCurrentNew(null);
  };

  return (
    <View style={styles.container}>
      {currentNew ? (
        <View>
          <New
            newImage={currentNew.image}
            newTitle={currentNew.title}
            newDescription={currentNew.description}
            newDate={currentNew.date}
            returnToNews={returnToNews}
          />
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>News</Text>

          {newsMock.map(item => (
            <TouchableOpacity
              key={item.title}
              onPress={() => loadNewData(item)}>
              <View style={styles.newsItem}>
                <View style={styles.newsDescription}>
                  <Text style={styles.descriptionText}>{item.title}</Text>
                  {/* <Text style={styles.descriptionText}>{item.description}</Text> */}
                </View>
                <View style={styles.newsImage}>
                  <Text>{item.image}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5F6466',
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: '#D9D9D9',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsDescription: {
    flex: 1,
    height: '50%',
    overflow: 'hidden',
  },
  newsImage: {
    width: 80,
    height: 80,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    color: '#242427',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
export default News;
