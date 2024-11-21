import React from 'react';
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
import BackButton from '../../BackButton/BackButton';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';

// Component to display the Legal Item in the Legal and Information screen. It receives the styles, the option to display, a function to handle the touch of the item, and an optional component to display in the item. It returns a view with the logo, name, and an optional component or right arrow that executes the function.

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

// Component to display the Legal and Information screen in the Account section. It displays the options for the user to access the Privacy Policy, Terms and Conditions, and End User License Agreement.

const LegalAndInformation = ({route}) => {
  const styles = useLegalStyles();
  const navigation = useNavigation();

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
        navigation.navigate('TermsAndConditionsInAppScreen');
        break;
      case 'End User License Agreement':
        navigation.navigate('Eula');
        break;
      default:
        console.log('Option not handled:', option.name);
    }
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundGradient />
      <SafeAreaView style={styles.backgroundColor}>
        <ScrollView style={[styles.backgroundColor, styles.paddingV]}>
          <BackButton />
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
    </View>
  );
};

export default LegalAndInformation;
