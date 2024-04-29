import React, { useContext, useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import BackButton from '../../Analysis/BackButton/BackButton';
import { AppThemeContext } from '../../../context/themeContext';
import { useNavigation } from '@react-navigation/core';
import useFAQsStyles from './FAQsStyles';
import LinearGradient from 'react-native-linear-gradient';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQs = () => {
    const styles = useFAQsStyles();
    const { theme } = useContext(AppThemeContext);
    const navigation = useNavigation();
    const { isDarkMode } = useContext(AppThemeContext);
    
    const [openedFAQ, setOpenedFAQ] = useState(null);

    const toggleFAQ = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenedFAQ(openedFAQ === index ? null : index);
    };

    const faqs = [
      { question: "How does the free trial period work?", answer: "The free trial period grants you full access to your preferred package for 7 days at no cost. Once acquired, you can cancel anytime through your app store. You won't be charged until after this period." },
      { question: "Can I have multiple subscriptions simultaneously?", answer: "Yes, you can do so by accessing the Subscription Options section and selecting your preferred option. You need to acquire one option at a time; simply choose the one you want and click the Purchase button." },
      { question: "How is my information protected?", answer: "Our team uses only the necessary login information provided to us, to give you the best possible experience while using the application. This information is protected and will not be shared or sold to any third party." },
      { question: "Why are my notifications not working?", answer: "It's possible that your desired notification settings are disabled. You can re-enable them by navigating to the Notifications section within your Account and activating those you wish to receive." },
      { question: "Where can I access tutorials for using the app?", answer: "You can find educational content on our social media platforms that will guide you through the different sections of AI Alpha. We provide information and tips to help you make the most of the application." },
  ];
  

    return (
      <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}
  >
      <SafeAreaView style={styles.backgroundColor}>
          <ScrollView style={[styles.backgroundColor, styles.paddingV]}>
              <BackButton />
              <Text style={styles.title}>FAQs</Text>
              {faqs.map((faq, index) => (
                  <TouchableOpacity
                      key={index}
                      onPress={() => toggleFAQ(index)}
                      style={styles.faqContainer}
                  >
                      <View style={styles.faqTouchable}>
                          <View style={styles.faqQuestionRow}>
                              <Text style={styles.faqQuestionText}>{faq.question}</Text>
                              <Image
                                  source={openedFAQ === index ? require('../../../assets/images/arrow-up.png') : require('../../../assets/images/arrow-down.png')}
                                  style={styles.faqArrow}
                              />
                          </View>
                          {openedFAQ === index && (
                              <View style={styles.faqAnswer}>
                                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                              </View>
                          )}
                      </View>
                  </TouchableOpacity>
              ))}
          </ScrollView>
      </SafeAreaView>
  </LinearGradient>
    );
};

export default FAQs;
