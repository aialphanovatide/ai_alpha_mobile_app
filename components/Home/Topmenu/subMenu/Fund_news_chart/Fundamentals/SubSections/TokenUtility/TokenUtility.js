import React, {useContext} from 'react';
import {Image, Text, View} from 'react-native';
import useTokenUtilityStyles from './TokenUtilityStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const TokenUtilityItem = ({styles, data, isDarkMode}) => {
  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataTitle}>{data.title}</Text>
      <View style={styles.dataRow}>
        <View style={styles.dataImageContainer}>
          <Image
            style={styles.dataImage}
            alt={data.name}
            source={isDarkMode ? data.image.dark : data.image.light}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.dataText}>{data.text}</Text>
      </View>
    </View>
  );
};

const TokenUtility = ({content}) => {
  const styles = useTokenUtilityStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <View style={styles.container}>
      {content &&
        content.map((item, index) => (
          <TokenUtilityItem
            key={index}
            data={item}
            styles={styles}
            isDarkMode={isDarkMode}
          />
        ))}
    </View>
  );
};

export default TokenUtility;
