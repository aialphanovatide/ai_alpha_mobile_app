import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Timeline from './Timeline/Timeline';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import SkeletonLoader from '../../../../../../../Loader/SkeletonLoader';

// Component to render the Hacks section in the Fundamentals tab. It displays a timeline with the most relevant hacks in the history of the coin. It also shows a loader when requesting the data and a message in case there is no content to display.

const Hacks = ({
  coin,
  handleSectionContent,
  globalData,
  loading,
}) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchHacksData = () => {
      if (!globalData || globalData.hacks.status !== 200) {
        setEvents([]);
      } else {
        const ordered_events = globalData.hacks.message.sort((a, b) =>
          compareDates(a.date, b.date),
        );
        setEvents(ordered_events);
      }
    };
    fetchHacksData();
  }, [globalData, coin]);

  // Function to compare two dates in the format "Month-Year" or "Early-Mid-Late Year", used to order the events within the timeline.

  const compareDates = (dateA, dateB) => {
    const monthOrder = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
      Early: 3,
      Mid: 6,
      Late: 12,
    };

    const parseDate = dateStr => {
      const parts = dateStr.split(/[\s-]+/);
      if (parts.length === 1) {
        // "Long-term" or any other word, goes to the end of the array
        return Infinity;
      } else if (parts.length === 2) {
        // First case: Month-Year format
        const month = monthOrder[parts[0]];
        const year = parseInt(parts[1]);
        return new Date(year, month - 1);
      } else {
        // Early-Mid-Late format
        const month = monthOrder[parts[0]];
        const year = parseInt(parts[1]);
        return new Date(year, month - 1);
      }
    };

    const dateAParsed = parseDate(dateA);
    const dateBParsed = parseDate(dateB);

    return dateAParsed - dateBParsed;
  };

  useEffect(() => {
    if (!loading && events?.length === 0) {
      handleSectionContent('hacks', true);
    }
  }, [events, loading, handleSectionContent]);

  return (
    <View style={{flex: 1, minHeight: 500}}>
      {loading ? (
        <SkeletonLoader type="timeline" quantity={4} />
      ) : events?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <Timeline
          events={events}
          textPoints={[
            {label: 'What was the incident?', propName: 'incident_description'},
            {label: 'What were the consequences?', propName: 'consequences'},
            {
              label: 'What risk mitigation measures have been taken?',
              propName: 'mitigation_measure',
            },
          ]}
        />
      )}
    </View>
  );
};

export default Hacks;
