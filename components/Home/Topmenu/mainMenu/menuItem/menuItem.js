import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './menuItemStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const MenuItem = ({ onPress, icon, category, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.button, !isActive && styles.disabledButton]}
      onPress={isActive ? () => onPress(category) : null}
      disabled={!isActive}
    >
      <View style={styles.iconContainer}>
        {!isActive && (
          <View style={styles.lockIcon}>
            <Icon name="lock" size={25} color="gray"/>
          </View>
        )}
        <Text style={[styles.buttonText, !isActive && styles.buttonTextDisable]}>{icon}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;
