import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import useChatbotStyles from './ChatbotStyles';

const Chatbot = () => {
  const styles = useChatbotStyles();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.messageText}>Coming soon...</Text>
    </SafeAreaView>
  );
};

export default Chatbot;
