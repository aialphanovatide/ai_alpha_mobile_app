import React from 'react';
import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';

const Icon = ({width, height, svg}) => {
  return (
    <View style={{width, height}}>
      <SvgXml width="100%" height="100%" xml={svg} />
    </View>
  );
};

export default Icon;
