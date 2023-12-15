import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './menuItemStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const MenuItem = ({ onPress, icon, category, isActive }) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={isActive ? () => onPress(category) : null}
      disabled={!isActive}
    >
      <View style={[styles.button, !isActive && styles.disabledButton]}>
        {!isActive && (
         <View style={styles.lockIcon}>
            <Icon name="lock" size={25} color="white"/>
          </View>
        )}
      </View>
      <Text 
      numberOfLines={1}
      ellipsizeMode="tail"
      style={styles.buttonText}>{icon}</Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
