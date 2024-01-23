import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import usePrivacyPolicyStyles from './styles';
import BackButton from '../../Analysis/BackButton/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const PrivacyPolicy = () => {
  const styles = usePrivacyPolicyStyles();
  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollview}>
        <BackButton />
        <Text style={styles.title}>Privacy Policy</Text>
        <View style={styles.container}>
          <Text style={styles.privacyPolicyText}>
            {`- Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
            debitis sit doloremque sint temporibus minima omnis dignissimos
            voluptatibus ut veritatis ab dolor maxime officia delectus
            consectetur velit voluptates, consequuntur aliquid. \n
            - Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Necessitatibus, eum!
            Officia nesciunt aperiam accusantium suscipit, iure est laboriosam
            voluptatum rem ut id quod aliquid, ipsam cupiditate provident dolore
            esse! Ea?`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
