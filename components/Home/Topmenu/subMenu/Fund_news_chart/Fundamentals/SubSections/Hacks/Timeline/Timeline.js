import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Loader from '../../../../../../../../Loader/Loader';
import useTimelineStyles from './TimelineStyles';

const Timeline = ({events}) => {
  const styles = useTimelineStyles();
  return (
    <ScrollView style={styles.timelineContainer} nestedScrollEnabled={true}>
      {events ? (
        events.map((event, index) => (
          <View key={index} style={styles.timelineEventContainer}>
            <View
              style={[
                styles.timelineDot,
                event.hasFinished ? {} : styles.futureDot,
              ]}
            />
            <View style={styles.timelineLine} />
            <View style={styles.timelineContentContainer}>
              <Text style={styles.dateText}>{event.date}</Text>
              <Text style={styles.descriptionText}>{event.description}</Text>
            </View>
          </View>
        ))
      ) : (
        <Loader />
      )}
      <View style={styles.timelineArrow} />
    </ScrollView>
  );
};

export default Timeline;
