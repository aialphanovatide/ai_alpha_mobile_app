import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useNewDailyDeepDivesStyles from '../NewDailyDeepDivesStyles';
import FastImage from 'react-native-fast-image';

// Component to render the Daily Deep Dive card in the New Daily Deep Dives section. It displays the image, title, and date of the Daily Deep Dive. It receives the item data, the function to handle the press on the card, the item number, and the total amount of items as props.

const DeepDiveCard = ({item, handleCardPress, itemNumber, itemsAmount}) => {
  const styles = useNewDailyDeepDivesStyles();

  // Function to simplify the date and time of the Daily Deep card
  const simplifyDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
  };

  return (
    <TouchableOpacity style={styles.flex} onPress={() => handleCardPress(item)}>
      <View
        style={[
          styles.deepDiveCard,
          itemNumber === 0 && {marginLeft: 0},
          itemNumber === itemsAmount - 1 && {marginRight: 48},
        ]}>
        <FastImage
          source={{
            uri:
              item.image !== ''
                ? item.image
                : `https://appanalysisimages.s3.us-east-2.amazonaws.com/${item.id}.jpg`,
            priority: FastImage.priority.normal,
          }}
          resizeMode="cover"
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardContent}>
          <Text style={styles.date}>{simplifyDateTime(item.created_at)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DeepDiveCard;
