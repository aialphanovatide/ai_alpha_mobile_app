import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const New = ({newDescription, newImage, newTitle, newDate, returnToNews}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => returnToNews()}>
        <View style={{paddingHorizontal: 5, paddingVertical: 10}}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View
          style={{
            flex: 1,
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.newsImage}>
            <Text>{newImage}</Text>
          </View>
          <View style={styles.newTitle}>
            <Text>{newTitle}</Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
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

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingHorizontal: 10,
    backgroundColor: '#EFEFEF',
  },
  newTitle: {
    marginBottom: 5,
    color: '#242427',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsDescription: {
    flex: 1,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  textDescription: {
    fontSize: 12,
    color: '#000000',
  },
  newsImage: {
    width: '90%',
    height: 80,
    marginHorizontal: 'auto',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#5F6466',
    textAlign: 'left',
    fontSize: 12,
  },
  backButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B8BBBC',
    textDecorationLine: 'underline',
  },
});

export default New;
