import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Loader from '../../../../../../../../Loader/Loader';
import useTimelineStyles from './TimelineStyles';

const Timeline = ({events, textPoints}) => {
  const styles = useTimelineStyles();
  const [activeEvent, setActiveEvent] = useState(null);

  const formatDate = dateString => {
    const words = dateString.split(/\s|-|\//g);
    const time_words = ['ongoing', 'development', 'long', 'mid', 'early'];
    const month = words[0];
    const has_words = time_words.includes(month.toLowerCase());
    const isLargeMonth = month.length > 5;
    const shorted_month = isLargeMonth ? month.slice(0, 3) : month;
    const formatted_date = shorted_month + ' ' + words[1];

    return has_words ? dateString : formatted_date;
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
    if (events.length > 0) {
      setActiveEvent(events[0]);
    } else {
      setActiveEvent(null);
    }
  }, [events]);

  const handleActiveHack = event => {
    setActiveEvent(event);
  };

  return (
    <View style={styles.timelineContainer} nestedScrollEnabled={true}>
      {events.map((event, index) => (
        <View key={index} style={styles.timelineEventContainer}>
          <Text
            numberOfLines={2}
            style={[
              styles.dateText,
              activeEvent && event?.id === activeEvent.id && styles.activeDate,
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
    </View>
  );
};

export default Timeline;
