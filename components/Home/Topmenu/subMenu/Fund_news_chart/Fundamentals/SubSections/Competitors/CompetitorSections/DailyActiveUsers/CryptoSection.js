// CryptoSection.js
import React from 'react';
import {View, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../CirculatingSupply/CirculatingSupplyStyles';

const CryptoSection = ({name, logo, score, value}) => {
  const renderIcons = score => {
    const totalIcons = 6;
    const filledIcons = Math.floor(score);
    const halfIcon = score - filledIcons > 0 ? 1 : 0;

    const icons = Array.from({length: filledIcons}, (_, index) => (
      <Icon key={index} name="user" size={20} color="orange" />
    ));

    if (halfIcon > 0) {
      icons.push(<Icon key="half" name="user" size={20} color="orange" />);
    }

    const emptyIcons = Array.from(
      {length: totalIcons - filledIcons - halfIcon},
      (_, index) => (
        <Icon key={`empty_${index}`} name="user" size={20} color="gray" />
      ),
    );

    return [...icons, ...emptyIcons];
  };

  return (
    <View style={[styles.row, styles.section]}>
      <Image source={logo} style={{width: 30, height: 30, marginRight: 10}} />
      <View>
        <Text style={styles.labelLeft}>{name}</Text>
        <View style={styles.row}>
          <View style={{flexDirection: 'row'}}>{renderIcons(score)}</View>
        </View>
      </View>
      <Text style={styles.labelRight}>{value}</Text>
    </View>
  );
};

export default CryptoSection;
