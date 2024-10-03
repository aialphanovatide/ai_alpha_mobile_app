import React, {useContext} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import useCurrentPackagesStyles from './CurrentPackagesStyles';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import {AppThemeContext} from '../../../context/themeContext';
import BackButton from '../../Analysis/BackButton/BackButton';
import {useNavigation} from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';

const CurrentPackages = () => {
  const styles = useCurrentPackagesStyles();
  const {userInfo} = useContext(RevenueCatContext);
  const {isDarkMode} = useContext(AppThemeContext);
  const navigation = useNavigation();

  // Define the package options as in the Subscription Options screen
  const subscriptionOptions = {
    founder: {
      title: 'Founder',
      price: '$149',
      icon: require('../../../assets/images/account/founder.png'),
    },
    fullAccess: {
      title: 'Full Access',
      price: '$59',
      icon: require('../../../assets/images/account/full-access.png'),
    },
    byCategory: {
      title: 'By Category',
      price: '$29',
      icon: require('../../../assets/images/account/by-category.png'),
    },
  };

  // Known category names for display
  const categoryNames = [
    'Ethereum',
    'Bitcoin',
    'RootLink',
    'BaseBlock',
    'CoreChain',
    'XPayments',
    'LSDs',
    'BoostLayer',
    'Truthnodes',
    'CycleSwap',
    'Nextrade',
    'Diversefi',
    'Intellichain',
  ];

  // Extract purchased packages from user's entitlements
  const purchasedPackages = userInfo?.entitlements || [];

  // Create a map for user purchased packages
  const userPurchasedOptions = purchasedPackages.reduce((acc, entitlement) => {
    const lowerCaseEntitlement = entitlement.toLowerCase();

    // Check for founders entitlement
    if (lowerCaseEntitlement.includes('founders')) {
      if (!acc.some(item => item.title === 'Founder')) {
        acc.push(subscriptionOptions.founder);
      }
    }
    // Check for full access entitlement
    else if (lowerCaseEntitlement.includes('fullaccess')) {
      if (!acc.some(item => item.title === 'Full Access')) {
        acc.push(subscriptionOptions.fullAccess);
      }
    }
    // Handle by category entitlement
    else {
      const categoryName = categoryNames.find(name =>
        lowerCaseEntitlement.includes(name.toLowerCase()),
      );
      if (categoryName) {
        const categoryPackage = acc.find(item => item.title === 'By Category');
        if (categoryPackage) {
          if (!categoryPackage.subOptions.includes(categoryName)) {
            categoryPackage.subOptions.push(categoryName);
          }
        } else {
          acc.push({
            ...subscriptionOptions.byCategory,
            subOptions: [categoryName],
          });
        }
      }
    }
    return acc;
  }, []);



  const navigateToSubscriptionOptions = () => {
    navigation.navigate('Subscriptions');
  };

  return (
    <View style={styles.flex}>
      <BackgroundGradient />
        <SafeAreaView style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.mainTitle}>My Packages</Text>
            {userPurchasedOptions.length > 0 ? (
              <View style={styles.packagesContainer}>
                {userPurchasedOptions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.itemContainer}
                    onPress={() => console.log('Package:', item.title)}>
                    <View style={styles.itemRow}>
                      <View style={styles.circleContainer}>
                        <Image
                          source={require('../../../assets/images/account/whitetickV2.png')}
                          style={styles.tickImage}
                        />
                      </View>
                      <Image source={item.icon} style={styles.itemIcon} />
                      <Text style={styles.title}>{item.title}</Text>
                      <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>{item.price}</Text>
                        <Text style={styles.perMonthText}>Per month</Text>
                      </View>
                    </View>
                    {item.title === 'By Category' && item.subOptions && (
                      <View style={styles.subOptionsContainer}>
                        {item.subOptions.map((subOption, subIndex) => (
                          <TouchableOpacity
                            key={subIndex}
                            style={styles.subOption}
                            onPress={() =>
                              console.log('Sub-option:', subOption)
                            }>
                            <View style={styles.subCircleContainer}>
                              <Image
                                source={require('../../../assets/images/account/subTickV2.png')}
                                style={styles.subTickImage}
                              />
                            </View>
                            <Text style={styles.subOptionText}>
                              {subOption}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.foundersContainer}>
                <Image
                  source={
                    isDarkMode
                      ? require('../../../assets/images/account/subscriptionicondark-removebg.png')
                      : require('../../../assets/images/account/subscriptioniconlight-removebg.png')
                  }
                  resizeMode="contain"
                  style={styles.subscriptionImage}
                />
                <View style={styles.textFoundersRow}>
                  <Text style={styles.preSecondaryTextFounders}>
                    You haven't purchased any packages yet.
                  </Text>
                </View>
                <View style={styles.textFoundersRow}>
                  <Text style={styles.textFounders}>
                    Unlock premium features now with a
                  </Text>
                </View>
                <View>
                  <Text style={styles.bigTextFounders}>7 DAY FREE TRIAL</Text>
                  <TouchableOpacity
                    style={styles.purchaseButton}
                    onPress={() => navigateToSubscriptionOptions()}>
                    <Text style={styles.purchaseButtonText}>
                      Go to Subscription Options
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.textFoundersRow}>
                    <Text style={styles.secondaryTextFounders}>
                      Monthly subscription activates post-trial
                    </Text>
                  </View>
                  <View style={styles.textFoundersRow}>
                    <Text style={styles.secondaryTextFounders}>
                      Cancel anytime hussle-free
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
    </View>
  );
};

export default CurrentPackages;
