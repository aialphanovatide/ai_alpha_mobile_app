import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import useNoContentMessageStyles from './NoContentMessageStyles';
import {findMessageByCoin} from './staticNoContentDescriptions';

const NoContentMessage = ({
  hasSectionName = false,
  sectionName = null,
  coin = null,
}) => {
  const styles = useNoContentMessageStyles();
  const [foundMessage, setFoundMessage] = useState(null);

  console.log(coin);

  useEffect(() => {
    if (coin && coin !== undefined) {
      setFoundMessage(findMessageByCoin(coin));
    }
  }, [coin]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{foundMessage}</Text>
    </View>
  );
};

export default NoContentMessage;
