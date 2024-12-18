import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import useTimelineStyles from './TimelineStyles';

// Component to render a timeline with the most relevant events in the history of a coin. It displays the events in a timeline format, showing the date and the event name. When an event is clicked, it shows the details of the event.

const Timeline = ({events, textPoints}) => {
  const styles = useTimelineStyles();
  const [activeEvent, setActiveEvent] = useState(null);

  // Function to format the date string to show only the month and year, or the full string if it contains special words.

  const formatDate = dateString => {
    const words = dateString.split(/\s|-|\//g);
    const time_words = ['ongoing', 'development', 'long', 'mid', 'early'];
    const month = words[0];
    const has_words = time_words.includes(month.toLowerCase());
    const isLargeMonth = month.length > 5;
    const shorted_month = isLargeMonth ? month.slice(0, 3) : month;
    const formatted_date =
      words.length > 1 ? shorted_month + ' ' + words[1] : dateString;

    return has_words ? dateString : formatted_date;
  };

  // Function to generate the information of the event, showing the title and the content of the event. It receives the event object and the topics to show.
  
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
            onPress={() => handleActiveHack(event)}
            numberOfLines={event.date.trim().split(/\s+/).length === 1 ? 1 : 2}
            style={[
              styles.dateText,
              event.date.trim().split(/\s+/).length === 1
                ? {marginTop: 34,}
                : {},
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
