import React, {useState} from 'react';
import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';

const Icon = ({width, height, xml, isCurrent, handleFillChange}) => {
  const [iconFill, setIconFill] = useState('#F7F7F7');

  return (
    <View style={{width, height}}>
      <SvgXml width="100%" height="100%" xml={xml} fill={iconFill} />
    </View>
  );
};

export default Icon;
