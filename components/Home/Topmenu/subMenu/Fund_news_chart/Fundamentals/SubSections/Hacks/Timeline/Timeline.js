import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import Loader from '../../../../../../../../Loader/Loader';
import useTimelineStyles from './TimelineStyles';

const Timeline = ({events, textPoints}) => {
  const styles = useTimelineStyles();
  const [activeEvent, setActiveEvent] = useState(null);

  const formatDate = dateString => {
    const words = dateString.split(' ');

    const month = words[0];
    const isLargeMonth = month.length > 5;
    const shorted_month = isLargeMonth ? month.slice(0, 3) : month;

    const formatted_date = shorted_month + ' ' + words[1];

    return formatted_date;
  };

  const generateEventInformation = (event, topics) => {
    const eventInformation = [];

    topics.forEach(topic => {
      eventInformation.push(
        <View key={topic.label} style={styles.infoContainer}>
          <Text style={styles.infoTitle}>{topic.label}</Text>
          <Text style={styles.infoContent}>{event[topic.propName]}</Text>
        </View>,
      );
    });
    return eventInformation;
  };

  useEffect(() => {
    setActiveEvent(events[0]);
  }, [events]);

  const handleActiveHack = event => {
    setActiveEvent(event);
  };

  return (
    <ScrollView style={styles.timelineContainer} nestedScrollEnabled={true}>
      {events?.length > 0 ? (
        <>
          {events.map((event, index) => (
            <View key={index} style={styles.timelineEventContainer}>
              <Text
                numberOfLines={2}
                style={[
                  styles.dateText,
                  activeEvent &&
                    event?.id === activeEvent.id &&
                    styles.activeDate,
                ]}>
                {formatDate(event.date)}
              </Text>
              <TouchableOpacity
                style={styles.timelineDot}
                onPress={() => handleActiveHack(event)}
              />
              <View
                style={
                  activeEvent && event?.id === activeEvent.id
                    ? styles.timelineLine
                    : styles.hidden
                }
              />
            </View>
          ))}
          <View style={styles.timelineContentContainer}>
            <Text style={styles.eventName}>
              {activeEvent && activeEvent !== undefined
                ? activeEvent.hack_name || activeEvent.upgrade_name
                : ''}
            </Text>
            {activeEvent &&
              activeEvent !== undefined &&
              generateEventInformation(activeEvent, textPoints)}
          </View>
          <View style={styles.timelineArrow}>
            <Image
              source={require('../../../../../../../../../assets/images/fundamentals/timeline.png')}
              resizeMode={'stretch'}
              style={styles.arrowImage}
            />
          </View>
        </>
      ) : (
        <Loader />
      )}
    </ScrollView>
  );
};

export default Timeline;
