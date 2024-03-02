import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Timeline from './Timeline/Timeline';
import {fundamentalsMock} from '../../fundamentalsMock';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import Loader from '../../../../../../../Loader/Loader';

const Hacks = ({getSectionData, coin}) => {
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
          setEvents(response.message);
        }
      } catch (error) {
        console.log('Error trying to get hacks data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHacksData();
  }, [coin]);

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
