import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
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
            <View
              style={[
                styles.timelineLine,
                event.hasFinished ? {} : styles.futureEventLine,
              ]}
            />
            <View style={styles.timelineContentContainer}>
              <Text style={styles.dateText}>{event.date}</Text>
              <Text style={styles.descriptionText}>{event.description}</Text>
            </View>
          </View>
        ))
      ) : (
        <Loader />
      )}
      {/* <View style={styles.arrowTail}>
        <Image
          style={styles.arrowImage}
          source={require('../../../../../../../../../assets/images/arrow-down.png')}
          resizeMode="contain"
        />
      </View> */}
      <View style={styles.timelineArrow}>
        <Image
          source={require('../../../../../../../../../assets/images/fundamentals/timeline.png')}
          resizeMode={'stretch'}
          style={styles.arrowImage}
        />
      </View>
      {/* <View style={styles.arrow}>
        <Image
          style={styles.arrowImage}
          source={require('../../../../../../../../../assets/images/arrow-down.png')}
          resizeMode="contain"
        />
      </View> */}
    </ScrollView>
  );
};

export default Timeline;
