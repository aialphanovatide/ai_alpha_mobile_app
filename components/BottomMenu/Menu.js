import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './MenuStyles';

const menuOptions = [
  { id: 'Home', label: 'Home', icon: 'home' },
  { id: 'Alerts', label: 'Alerts', icon: 'bell-o' },
  { id: 'Chatbot', label: 'Chatbot', icon: 'comment' },
  { id: 'Analysis', label: 'Analysis', icon: 'bar-chart' },
  { id: 'Account', label: 'Account', icon: 'user' }
];

const MenuItem = ({ option, onPress, isActive }) => (
  <TouchableOpacity style={styles.menuButton} onPress={() => onPress(option.id)}>
    <View style={[styles.circle, isActive && styles.activeCircle]}>
      <Icon
        name={option.icon}
        size={23}
        color={isActive?'#FC5404' : '#282828'}
      />
    </View>
    <Text style={[styles.buttonText, isActive && styles.activeText]}>
      {option.label}
    </Text>
  </TouchableOpacity>
);

const BottomMenu = () => {
  const [currentSection, setCurrentSection] = useState('Home');

  const handleMenuPress = (section) => {  
    setCurrentSection(section);
  };

  return (
    <View style={styles.bottomMenu}>
      {menuOptions.map((option) => (
        <MenuItem
          key={option.id}
          option={option}
          onPress={handleMenuPress}
          isActive={currentSection === option.id}
        />
      ))}
    </View>
  );
};

export default BottomMenu;
