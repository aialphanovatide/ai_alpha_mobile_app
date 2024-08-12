import React, { useContext, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import usePackageSubscriptionStyles from './PackageSubscriptionStyles';
import Loader from '../../Loader/Loader';
import { RevenueCatContext } from '../../../context/RevenueCatContext';
import BackButton from '../../Analysis/BackButton/BackButton';
import { useNavigation } from '@react-navigation/core';
import SubscriptionsLoader from '../../Loader/SubscriptionsLoader';
import LinearGradient from 'react-native-linear-gradient';
import { AppThemeContext } from '../../../context/themeContext';
import { useRawUserId } from '../../../context/RawUserIdContext';
import Purchases, {LOG_LEVEL, PurchasesPackage} from 'react-native-purchases';

const TextWithIcon = ({ text }) => {
  const styles = usePackageSubscriptionStyles();
  const { theme } = useContext(AppThemeContext);

  const iconStyle =
    text === 'Simple but powerful.'
      ? [styles.smallTickIcon, { marginTop: 0 }]
      : text === 'Ideal for a comprehensive market view and convenient if you want to track more than one package.'
        ? [styles.smallTickIcon, { marginTop: -45 }]
        : [styles.smallTickIcon, { marginTop: -21 }];

  const descriptionText =
    text === "Join our exclusive group of pioneers and get full access to AI ALPHA's current and future products." ||
      text === "Get full access to each and every AI Alpha package - both current and future."
      ? [styles.secondaryText, { fontFamily: theme.fontSemibold, marginRight: 20 }]
      : [styles.secondaryText, { fontFamily: theme.font }];

  return (
    <View style={styles.textRow}>
      <Image
        source={require('../../../assets/images/account/orangeSmallTick.png')}
        style={iconStyle}
      />
      <Text style={descriptionText}>{text}</Text>
    </View>
  );
};

const PackageSubscriptions = () => {
  const styles = usePackageSubscriptionStyles();
  const navigation = useNavigation();
  const { isDarkMode } = useContext(AppThemeContext);
  const { packages, purchasePackage, userInfo } = useContext(RevenueCatContext);
  const {rawUserId, setRawUserId} = useRawUserId();

  //console.log("REVENUE CAT PACKAGES", packages);
  
  // ITERATING THROUGH PACKAGES TO FIND THE PRODUCT IDENTIFIER
  for (let i = 0; i < packages.length; i++) {
    console.log("PACKAGE IDENTIFIER", packages[i].product.identifier);
  }


  const getIdentifierByKeyword = (keyword) => {
    const foundPackage = packages.find(pkg => pkg.product.title.includes(keyword));
    return foundPackage ? foundPackage.product.identifier : null;
  };

  const hasFoundersPackage = userInfo?.entitlements?.some(subscription =>
    subscription.toLowerCase().includes('founders'),
  );

  const subscriptionOptions = [
    {
      title: 'Founder',
      price: '$149',
      icon: require('../../../assets/images/account/founder.png'),
    },
    {
      title: 'Full Access',
      price: '$59',
      icon: require('../../../assets/images/account/full-access.png'),
    },
    {
      title: 'By Category',
      price: '$29',
      icon: require('../../../assets/images/account/by-category.png'),
    },
  ];

  const additionalOptions = [
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

  const [activeItem, setActiveItem] = useState(subscriptionOptions[0]); // Set "Founder" as default
  const [activeSubOption, setActiveSubOption] = useState('Ethereum'); // Default sub-option to 'Ethereum'
  const [selectedAdditionalOptions, setSelectedAdditionalOptions] = useState([]);
  const [showMoreVisible, setShowMoreVisible] = useState(false);
  const [missingMessageActive, setMissingMessageActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    const pack = await getPackageToPurchase();
    console.log('Pack in handlePurchase->', pack);
    setLoading(true);
  
    if (pack === null) {
      setMissingMessageActive(true);
      setLoading(false);
      return;
    }
  
    try {
      const packageIdentifier = pack.product.identifier;
      const packagePrice = activeItem.price.replace('$', '');
      const userNewestID = rawUserId;
  
      await purchasePackage(pack, packageIdentifier, packagePrice, userNewestID);
      setMissingMessageActive(false);
      navigation.navigate('CurrentPackages');
    } catch (error) {
      console.error('Error during purchase:', error);
      setMissingMessageActive(true);
    } finally {
      setLoading(false);
    }
  };
  

  const handleActiveItem = item => {
    console.log('Item selected:', item.title);
    // Check if the currently active item is "By Category" and the new item is also "By Category"
    if (activeItem.title === 'By Category' && item.title === 'By Category') {
      return; // Do nothing to keep the current active sub-option
    }
    setActiveItem(item);
    if (item.title === 'By Category') {
      setActiveSubOption(activeSubOption || 'Ethereum'); // Keep the current active sub-option or reset to "Ethereum"
    } else {
      setActiveSubOption(null);
    }
    console.log('Active item set to:', item);
  };

  const handleActiveSubOption = option => {
    console.log('Sub-option selected:', option);
    setActiveSubOption(option);
    if (option !== 'Ethereum') {
      setShowMoreVisible(false);
    }
    if (option !== 'Ethereum' && option !== 'Bitcoin') {
      setSelectedAdditionalOptions([]);
    }
  };

  const handleShowMore = () => {
    setShowMoreVisible(true);
  };

  const handleDone = () => {
    setShowMoreVisible(false);
    if (
      selectedAdditionalOptions.length > 0 &&
      !['Ethereum', 'Bitcoin'].includes(
        selectedAdditionalOptions[selectedAdditionalOptions.length - 1],
      )
    ) {
      setActiveSubOption(
        selectedAdditionalOptions[selectedAdditionalOptions.length - 1],
      );
    }
  };

  const toggleAdditionalOption = option => {
    if (selectedAdditionalOptions.includes(option)) {
      setSelectedAdditionalOptions(
        selectedAdditionalOptions.filter(opt => opt !== option),
      );
    } else {
      setSelectedAdditionalOptions([option]);
    }
  };

  const navigateBack = () => {
    navigation.navigate('AccountMain');
  };

  const getDescription = () => {
    switch (activeItem?.title) {
      case 'Founder':
        return (
          <>
            <TextWithIcon text="Join our exclusive group of pioneers and get full access to AI ALPHA's current and future products." />
            <TextWithIcon text="You'll shape the community experience, test improvements and participate in launches." />
            <TextWithIcon text="We're building a meaningful ecosystem. Let's build, learn and grow together!" />
          </>
        );
      case 'Full Access':
        return (
          <>
            <TextWithIcon text="Get full access to each and every AI Alpha package - both current and future." />
            <TextWithIcon text="Ideal for a comprehensive market view and convenient if you want to track more than one package." />
          </>
        );
      case 'By Category':
        return (
          <>
            <TextWithIcon text="Simple but powerful." />
            <TextWithIcon text="Get real-time price pop-ups and the most curated news and analysis on your chosen package." />
          </>
        );
      default:
        return (
          <>
            <TextWithIcon text="Join our exclusive group of pioneers and get full access to AI ALPHA's current and future products." />
            <TextWithIcon text="You'll shape the community experience, test improvements and participate in launches." />
            <TextWithIcon text="We're building a meaningful ecosystem. Let's build, learn and grow together!" />
          </>
        );
    }
  };

  const getPackageToPurchase = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    console.log('Customer info IN PACKAGESUBCRIPTIONS:', customerInfo);
    console.log('Expired subscriptions array:', customerInfo.allExpirationDates);
    //console.log('Length of expired subscriptions array:', Object.keys(customerInfo.allExpirationDates).length);
    const hasPreviousSubscription = Object.keys(customerInfo.allExpirationDates).length > 0;

    if (activeItem.title === 'By Category') {
      let subOptionName = activeSubOption.toLowerCase() + '_4999_m1';
      console.log('SUB OPTION NAME', subOptionName);
  
      if (hasPreviousSubscription) {
        console.log('PREVIOUSLY PURCHASED');
        subOptionName = `${subOptionName}_nofreetrial`;
      } else {
        console.log('NEVER PURCHASED BEFORE');
      }
      console.log('SUB OPTION NAME AFTER', subOptionName);
  
      return packages.find(pkg => {
        const identifier = pkg.product.identifier.toLowerCase();
        console.log('IDENTIFIER', identifier);
        if (identifier === subOptionName) {
          console.log('Found matching package:', identifier);
          return true;
        }
        return false;
      });
    } else {

      let subOptionNamePremium = activeItem.title.toLowerCase().replace(/\s+/g, '');

      if (subOptionNamePremium === 'founder' && !hasPreviousSubscription) {
        console.log('NEVER PURCHASED BEFORE');
        subOptionNamePremium = subOptionNamePremium + 's_14999_m1';
      } else if (subOptionNamePremium === 'founder' && hasPreviousSubscription) {
        console.log('PREVIOUSLY PURCHASED');
        subOptionNamePremium = subOptionNamePremium + 's_14999_m1_nofreetrial';
      } else if (subOptionNamePremium === 'fullaccess' && !hasPreviousSubscription) {
        console.log('NEVER PURCHASED BEFORE');
        subOptionNamePremium = subOptionNamePremium + '_5999_m1';
      } else if (subOptionNamePremium === 'fullaccess' && hasPreviousSubscription) {
        console.log('PREVIOUSLY PURCHASED');
        subOptionNamePremium = subOptionNamePremium + '_5999_m1_nofreetrial';
      }

      console.log("ACTIVENAME.TITLE->", subOptionNamePremium);

      return packages.find(pkg => {
        const identifier = pkg.product.identifier.toLowerCase();
        console.log('IDENTIFIER', identifier);
        if (identifier === subOptionNamePremium) {
          console.log('Found matching package:', identifier);
          return true;
        }
        return false;
      });

    }
  

  };
  
  
  

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.backgroundContainer}
        contentContainerStyle={styles.scrollViewContent}>
        <LinearGradient
          useAngle={true}
          angle={45}
          colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
          locations={[0.22, 0.97]}
          style={styles.flex}>
          <SafeAreaView style={styles.innerContainer}>
            <View style={styles.alignStart}>
              <BackButton navigationHandler={navigateBack} />
            </View>
            {hasFoundersPackage ? (
              <View style={styles.foundersContainer}>
                <Text style={styles.mainTitle}>Subscriptions Options</Text>
                <Image
                  source={isDarkMode ? require('../../../assets/images/account/subscriptionicondark-removebg.png') : require('../../../assets/images/account/subscriptioniconlight-removebg.png')}
                  resizeMode="contain"
                  style={styles.subscriptionImage}
                />
                <View style={styles.textFoundersRow}>
                  <Text style={styles.textFounders}>
                    Exclusive new content
                  </Text>
                </View>
                <View>
                  <Text style={styles.bigTextFounders}>
                    ONLY FOR OUR FOUNDERS
                  </Text>
                  <View style={styles.textFoundersRow}>
                    <Text style={styles.secondaryTextFounders}>
                      As an OG AI Alpha Founder watch this space for access to exclusive new content and packages
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <>
                <Text style={styles.mainTitle}>Subscription Options</Text>
                <View style={styles.packagesContainer}>
                  {subscriptionOptions.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.itemContainer,
                        activeItem?.title === item.title && styles.selectedItem,
                      ]}
                      onPress={() => {
                        console.log('Pressed item:', item.title);
                        handleActiveItem(item);
                      }}>
                      <View style={styles.itemRow}>
                        <View style={styles.circleContainer}>
                          {activeItem?.title === item.title && (
                            <Image
                              source={require('../../../assets/images/account/whitetickV2.png')}
                              style={styles.tickImage}
                            />
                          )}
                        </View>
                        <Image source={item.icon} style={styles.itemIcon} />
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.priceContainer}>
                          <Text style={styles.priceText}>{item.price}</Text>
                          <Text style={styles.perMonthText}>Per month</Text>
                        </View>
                      </View>
                      {item.title === 'By Category' &&
                        activeItem?.title === 'By Category' && (
                          <View style={styles.subOptionsContainer}>
                            {['Ethereum', 'Bitcoin'].includes(activeSubOption) && (
                              <>
                                <TouchableOpacity
                                  style={[
                                    styles.subOption,
                                    activeSubOption === 'Ethereum' &&
                                    styles.selectedSubOption,
                                  ]}
                                  onPress={() => handleActiveSubOption('Ethereum')}>
                                  <View style={styles.subCircleContainer}>
                                    {activeSubOption === 'Ethereum' && (
                                      <Image
                                        source={require('../../../assets/images/account/subTickV2.png')}
                                        style={styles.subTickImage}
                                      />
                                    )}
                                  </View>
                                  <Text style={styles.subOptionText}>Ethereum</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={[
                                    styles.subOption,
                                    activeSubOption === 'Bitcoin' &&
                                    styles.selectedSubOption,
                                  ]}
                                  onPress={() => handleActiveSubOption('Bitcoin')}>
                                  <View style={styles.subCircleContainer}>
                                    {activeSubOption === 'Bitcoin' && (
                                      <Image
                                        source={require('../../../assets/images/account/subTickV2.png')}
                                        style={styles.subTickImage}
                                      />
                                    )}
                                  </View>
                                  <Text style={styles.subOptionText}>Bitcoin</Text>
                                </TouchableOpacity>
                              </>
                            )}
                            {!['Ethereum', 'Bitcoin'].includes(activeSubOption) &&
                              activeSubOption && (
                                <TouchableOpacity
                                  style={[
                                    styles.subOption,
                                    styles.selectedSubOption,
                                  ]}
                                  onPress={() =>
                                    handleActiveSubOption(activeSubOption)
                                  }>
                                  <View style={styles.subCircleContainer}>
                                    <Image
                                      source={require('../../../assets/images/account/subTickV2.png')}
                                      style={styles.subTickImage}
                                    />
                                  </View>
                                  <Text style={styles.subOptionText}>
                                    {activeSubOption}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            <TouchableOpacity
                              style={styles.subOptionShowMore}
                              onPress={handleShowMore}>
                              <Text style={styles.subOptionTextShowMore}>
                                Show more
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.description}>{getDescription()}</View>
                <SubscriptionsLoader isLoading={loading} />
              </>
            )}
          </SafeAreaView>
        </LinearGradient>
      </ScrollView>

      {/* Conditionally render the fixed footer if the user does not have the Founders Package */}
      {!hasFoundersPackage && (
        <View style={styles.fixedFooter}>
          <LinearGradient
            colors={['#F9AF08', '#FC5B04', '#FC5B04']}
            style={styles.linearGradient}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}>
            <TouchableOpacity
              style={styles.purchaseButton}
              onPress={handlePurchase}>
              <Text style={styles.purchaseButtonText}>
                Start 7 Day Free Trial
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.footerTextContainer}>
            <Text style={styles.preTertiaryText}>
              Valid for first purchase only
            </Text>
            <Text style={styles.tertiaryText}>Pay after the trial period</Text>
            <Text style={styles.tertiaryText}>Cancel at anytime</Text>
          </View>
        </View>
      )}

      <Modal visible={showMoreVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.itemModalRow}>
              <Image
                source={require('../../../assets/images/account/by-category.png')}
                style={styles.itemIcon}
              />
              <Text style={styles.title}>By Category</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>$29</Text>
                <Text style={styles.perMonthText}>Per month</Text>
              </View>
            </View>
            {additionalOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => handleActiveSubOption(option)}>
                <View style={styles.subModalCircleContainer}>
                  {(selectedAdditionalOptions.includes(option) ||
                    activeSubOption === option) && (
                    <Image
                      source={require('../../../assets/images/account/subTickV2.png')}
                      style={styles.tickModalImage}
                    />
                  )}
                </View>
                <Text style={styles.modalTitle}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PackageSubscriptions;
