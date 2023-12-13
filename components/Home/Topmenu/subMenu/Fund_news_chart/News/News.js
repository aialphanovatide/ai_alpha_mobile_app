import React, {useState} from 'react';
import {View, Text} from 'react-native';
import New from './New';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './NewsStyles';

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
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionText}>{item.title}</Text>
                  {/* <Text style={styles.descriptionText}>{item.description}</Text> */}
                </View>
                <View style={styles.imagePreview}>
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
export default News;
