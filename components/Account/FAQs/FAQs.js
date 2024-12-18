import React, {useContext, useState, useEffect} from 'react';
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
import BackButton from '../../BackButton/BackButton';
import {AppThemeContext} from '../../../context/themeContext';
import {useNavigation} from '@react-navigation/core';
import useFAQsStyles from './FAQsStyles';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Component used in the Account screen to show the FAQs. It returns a view with the questions and answers. The user can click on a question to see the answer. The component uses LayoutAnimation to animate the opening and closing of the answers.

const FAQs = () => {
  const styles = useFAQsStyles();

  const [openedFAQ, setOpenedFAQ] = useState(null);

  const toggleFAQ = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenedFAQ(openedFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer:
        "You can reset your password by accessing 'Personalise Profile' within Settings, under the Account section. Once there, by clicking on the 'Edit Password' option, you will be sent a link to your email to choose a new password.",
    },
    {
      question: 'How can I update my profile information?',
      answer:
        'You can update your name, username, email, password, and date of birth by accessing “Personalise Profile” within Settings, under the Account section.',
    },
    {
      question: 'How do I ensure my app is up-to-date?',
      answer:
        "If there is a newer version available than the one you have downloaded, you can view it by heading to your app store. Next to the name of AI Alpha, you'll see the 'Update' option. If you don't see this option, it means your app is up to date.",
    },
    {
      question: 'How does the free trial period work?',
      answer:
        "The free trial period grants you full access to your preferred package for 7 days at no cost. Once acquired, you can cancel anytime through your App Store. You won't be charged until after this period.",
    },
    {
      question: 'Can I have multiple subscriptions simultaneously?',
      answer:
        'Yes, you can do so by accessing the Subscription Options section and selecting your preferred option. You need to acquire one option at a time; simply choose the one you want and click the Purchase button.',
    },
    {
      question: 'How is my information protected?',
      answer:
        'Our team uses only the necessary login information provided to us, to give you the best possible experience while using the application. This information is protected and will not be shared or sold to any third party.',
    },
    {
      question: 'Why are my notifications not working?',
      answer:
        "It's possible that your desired notification settings are disabled. You can re-enable them by navigating to the Notifications section within your Account and activating those you wish to receive.",
    },
  ];
  return (
    <View style={styles.flex}>
      <BackgroundGradient />
      <SafeAreaView style={styles.backgroundColor}>
        <ScrollView style={[styles.backgroundColor, styles.paddingV]}>
          <BackButton />
          <Text style={styles.title}>FAQs</Text>
          {faqs.map((faq, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleFAQ(index)}
              style={[
                styles.faqContainer,
                index === faqs.length - 1 && styles.lastFAQContainer,
              ]}>
              <View style={styles.faqTouchable}>
                <View style={styles.faqQuestionRow}>
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <Image
                    source={
                      openedFAQ === index
                        ? require('../../../assets/images/arrow-up.png')
                        : require('../../../assets/images/arrow-down.png')
                    }
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
    </View>
  );
};

export default FAQs;
