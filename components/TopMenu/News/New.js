import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './NewsStyles';

const New = ({newDescription, newImage, newTitle, newDate, returnToNews}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => returnToNews()}>
        <View style={[styles.backButtonContainer]}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.newContainer]}>
          <View style={styles.newsImage}>
            <Text>{newImage}</Text>
          </View>
          <View style={styles.newTitle}>
            <Text>{newTitle}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{newDate}</Text>
          </View>
          <View style={styles.newsDescription}>
            <Text>{newDescription}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default New;
