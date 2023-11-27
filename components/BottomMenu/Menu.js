/* eslint-disable prettier/prettier */
import {React, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './MenuStyles';

const BottomMenu = () => {
  const [currentSection, setCurrentSection] = useState('Home');

  const handleMenuPress = section => {
    setCurrentSection(section);
  };

  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => handleMenuPress('Home')}>
        <View
          style={[
            styles.circle,
            currentSection === 'Home' && styles.activeCircle,
          ]}
        />
        <Text
          style={[
            styles.buttonText,
            currentSection === 'Home' && styles.activeText,
          ]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => handleMenuPress('Alerts')}>
        <View
          style={[
            styles.circle,
            currentSection === 'Alerts' && styles.activeCircle,
          ]}
        />
        <Text
          style={[
            styles.buttonText,
            currentSection === 'Alerts' && styles.activeText,
          ]}>
          Alerts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => handleMenuPress('Chatbot')}>
        <View
          style={[
            styles.circle,
            currentSection === 'Chatbot' && styles.activeCircle,
          ]}
        />
        <Text
          style={[
            styles.buttonText,
            currentSection === 'Chatbot' && styles.activeText,
          ]}>
          Chatbot
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => handleMenuPress('Analysis')}>
        <View
          style={[
            styles.circle,
            currentSection === 'Analysis' && styles.activeCircle,
          ]}
        />
        <Text
          style={[
            styles.buttonText,
            currentSection === 'Analysis' && styles.activeText,
          ]}>
          Analysis
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => handleMenuPress('Account')}>
        <View
          style={[
            styles.circle,
            currentSection === 'Account' && styles.activeCircle,
          ]}
        />
        <Text
          style={[
            styles.buttonText,
            currentSection === 'Account' && styles.activeText,
          ]}>
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default BottomMenu;
