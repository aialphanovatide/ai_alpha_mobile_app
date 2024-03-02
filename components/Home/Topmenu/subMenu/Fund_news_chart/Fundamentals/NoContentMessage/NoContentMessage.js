import React from 'react';
import {Text, View} from 'react-native';
import useNoContentMessageStyles from './NoContentMessageStyles';

const NoContentMessage = ({hasSectionName = false, sectionName = null}) => {
  const styles = useNoContentMessageStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {hasSectionName
          ? `There's no information for ${sectionName}`
          : "There isn't information to show"}
      </Text>
    </View>
  );
};

export default NoContentMessage;
