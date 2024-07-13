import React, {useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import useLegalStyles from './LegalAndInformationStyles';
import BackButton from '../../Analysis/BackButton/BackButton';
import {AppThemeContext} from '../../../context/themeContext';
import LinearGradient from 'react-native-linear-gradient';

const LegalItem = ({styles, option, handleItemTouch, itemComponent = null}) => {
  return (
    <TouchableOpacity onPress={() => handleItemTouch(option)}>
      <View style={styles.itemContainer}>
        <View style={styles.itemLogoContainer}>
          <Image
            source={option.logo}
            resizeMode="contain"
            style={styles.itemLogo}
          />
        </View>
        <Text style={styles.itemName}>{option.name}</Text>
        {itemComponent !== null ? (
          itemComponent
        ) : (
          <View style={styles.rightArrowContainer}>
            <Image
              style={styles.rightArrow}
              source={require('../../../assets/images/analysis/right-arrow.png')}
              resizeMode={'contain'}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const LegalAndInformation = ({route}) => {
  const styles = useLegalStyles();
  const navigation = useNavigation();
  const {isDarkMode} = useContext(AppThemeContext);

  const options = [
    {
      name: 'Privacy Policy',
      logo: require('../../../assets/images/account/privacypolicyicon.png'),
      screenName: null,
      component: null,
    },
    {
      name: 'Terms and Conditions',
      logo: require('../../../assets/images/account/termsandconditionsicon.png'),
      screenName: null,
      component: null,
    },
    {
      name: 'End User License Agreement',
      logo: require('../../../assets/images/account/eulaicon.png'),
      screenName: null,
      component: null,
    },
  ];

  const handleItemTouch = option => {
    switch (option.name) {
      case 'Privacy Policy':
        navigation.navigate('PrivacyPolicy');
        break;
      case 'Terms and Conditions':
        navigation.navigate('TermsAndConditionsScreen');
        break;
      case 'End User License Agreement':
        navigation.navigate('Eula');
        break;
      default:
        console.log('Option not handled:', option.name);
    }
  };

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <SafeAreaView style={styles.backgroundColor}>
        <ScrollView style={[styles.backgroundColor, styles.paddingV]}>
          <View style={styles.backButtonContainer}>
            <BackButton />
          </View>
          <Text style={styles.title}>Legal and Information</Text>
          <View style={styles.container}>
            <View style={styles.optionsContainer}>
              {options &&
                options.map((option, index) => (
                  <LegalItem
                    key={index}
                    option={option}
                    styles={styles}
                    handleItemTouch={handleItemTouch}
                    itemComponent={option.component && option.component}
                  />
                ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LegalAndInformation;
