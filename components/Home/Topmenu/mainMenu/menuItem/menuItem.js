import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './menuItemStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const MenuItem = ({onPress, icon, category, isActive}) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={isActive ? () => onPress(category) : null}
      disabled={!isActive}>
      <View
        style={
          // [
          styles.button
          // , !isActive && styles.disabledButton]
        }>
        {/* {!isActive && ( 
            <View style={styles.lockIcon}>
               <Icon name="lock" size={25} color="white"/>
            </View>
          */}
        <Image
          source={
            isActive
              ? require('../../../../../assets/images/topMenu/bitcoin.png')
              : require('../../../../../assets/images/topMenu/bitcoin-locked.png')
          }
          resizeMode="contain"
          style={styles.imageIcon}
        />
      </View>

      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.buttonText}>
        {icon}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
