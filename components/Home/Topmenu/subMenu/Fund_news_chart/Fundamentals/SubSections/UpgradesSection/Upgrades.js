import {SafeAreaView} from 'react-native';
import React from 'react';
import Timeline from '../Hacks/Timeline/Timeline';
import Loader from '../../../../../../../Loader/Loader';

const Upgrades = ({events}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {events && events !== undefined ? (
        <Timeline
          events={events}
          textPoints={[
            {
              label: 'Event Overview',
              propName: 'upgrade_overview',
            },
            {
              label: 'What is its Impact?',
              propName: 'upgrade_impact',
            },
          ]}
        />
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
};

export default Upgrades;
