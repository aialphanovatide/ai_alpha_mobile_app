import React, {useState, useEffect, useContext} from 'react';
import {View, Text, SafeAreaView, ImageBackground} from 'react-native';
import useChatbotStyles from './ChatbotStyles';
import {AppThemeContext} from '../../context/themeContext';

const Chatbot = () => {
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useChatbotStyles();
  const image = {
    light: require('../../assets/images/home/upgradeOverlay/chatbot-blur.png'),
    dark: require('../../assets/images/home/upgradeOverlay/chatbot-dark.png'),
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.overlayImage}
        source={isDarkMode ? image.dark : image.light}
        resizeMode={'cover'}>
        <Text style={styles.messageText}>Coming soon...</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Chatbot;
