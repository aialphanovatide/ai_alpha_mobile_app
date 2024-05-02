import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Timeline from './Timeline/Timeline';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import Loader from '../../../../../../../Loader/Loader';

const Hacks = ({getSectionData, coin, handleSectionContent}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setEvents([]);

    const fetchHacksData = async () => {
      try {
        const response = await getSectionData(
          `/api/hacks?coin_bot_name=${coin}`,
        );

        if (response.status !== 200) {
          setEvents([]);
        } else {
          const ordered_events = response.message.sort((a, b) =>
            compareDates(a.date, b.date),
          );
          setEvents(ordered_events);
        }
      } catch (error) {
        console.error('Error trying to get hacks data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHacksData();
  }, [coin]);

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
      Early: 2, // Febrero
      Mid: 6, // Junio
      Late: 11, // Noviembre
    };

    const parseDate = dateStr => {
      const parts = dateStr.split(/[\s-]+/); // Split por espacio o guion
      if (parts.length === 1) {
        // "Long-term" o cualquier otra palabra, va al final del array
        return Infinity;
      } else if (parts.length === 2) {
        // Formato: Mes Año
        const month = monthOrder[parts[0]];
        const year = parseInt(parts[1]);
        return new Date(year, month - 1); // Restamos 1 al mes porque los meses en JavaScript son indexados desde 0
      } else {
        // Formato: Early/Mid/Late Año
        const month = monthOrder[parts[0]];
        const year = parseInt(parts[1]);
        return new Date(year, month - 1); // Restamos 1 al mes porque los meses en JavaScript son indexados desde 0
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
        <Loader />
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
