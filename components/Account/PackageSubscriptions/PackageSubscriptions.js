import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  Animated,
  Platform,
} from 'react-native';
import usePackageSubscriptionStyles from './PackageSubscriptionStyles';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import BackButton from '../../BackButton/BackButton';
import {useNavigation} from '@react-navigation/core';
import SubscriptionsLoader from '../../Loader/SubscriptionsLoader';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../context/themeContext';
import Purchases, {LOG_LEVEL, PurchasesPackage} from 'react-native-purchases';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';
import AboutModal from '../../AboutModal/AboutModal';
import Clipboard from '@react-native-community/clipboard';
import {aialpha2key} from '../../../src/constants';
import {useDispatch, useSelector} from 'react-redux';
import {selectRawUserId} from '../../../actions/userActions';
import {
  handleAboutPress,
  handleClose,
  selectAboutDescription,
  selectAboutTitle,
  selectAboutVisible,
} from '../../../store/aboutSlice';

const TextWithIcon = ({text}) => {
  const styles = usePackageSubscriptionStyles();
  const {theme} = useContext(AppThemeContext);

  const iconStyle =
    text === 'Simple but powerful.'
      ? [styles.smallTickIcon, {marginTop: 0}]
      : text === 'Lead an Alpha Club on campus.'
      ? [styles.smallTickIcon, {marginTop: 0}]
      : [styles.smallTickIcon, {marginTop: -20}];

  const descriptionText = (() => {
    if (
      text === 'Full access to all categories for precise, up-to-date info.'
    ) {
      return [
        styles.secondaryText,
        {fontFamily: theme.fontSemibold, marginRight: 20},
      ];
    } else if (text === 'Access Founder membership at a student rate.') {
      return [
        styles.secondaryText,
        {
          fontFamily: theme.fontSemibold,
          marginRight: 20,
          fontSize: 12.75,
          marginTop: -20,
        },
      ];
    } else if (
      text ===
      'Track crypto projects by category, like stock sectors, to stay informed without the noise.'
    ) {
      return [
        styles.secondaryText,
        {fontFamily: theme.fontSemibold, marginRight: 20},
      ];
    } else if (
      text ===
      'Get full access to each and every AI Alpha package - both current and future.'
    ) {
      return [
        styles.secondaryText,
        {fontFamily: theme.fontSemibold, marginRight: 20},
      ];
    } else if (text === 'Lead an Alpha Club on campus.') {
      return [styles.secondaryText];
    } else {
      return [styles.secondaryText];
    }
  })();

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
  const {isDarkMode} = useContext(AppThemeContext);
  const {packages, purchasePackage, userInfo} = useContext(RevenueCatContext);
  const rawUserId = useSelector(selectRawUserId);

  const scrollIndicator = useRef(new Animated.Value(0)).current;
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? ((visibleScrollBarHeight * 100) / completeScrollBarHeight) * 0.5
      : visibleScrollBarHeight * 0.9;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight - 0.2,
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: 'clamp',
  });

  // Modal visibility state
  const aboutVisible = useSelector(selectAboutVisible);
  const aboutDescription = useSelector(selectAboutDescription);
  const aboutTitle = useSelector(selectAboutTitle);
  const [copiedText, setCopiedText] = useState('');
  const dispatch = useDispatch();

  // Function to handle About button press
  const toggleAbout = (description = null, title = null) => {
    dispatch(handleAboutPress({description, title}));
  };

  const closeAbout = () => {
    dispatch(handleClose());
  };

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

  // Here Starts the code for Current Packages

  // Extract purchased packages from user's entitlements
  const purchasedPackages = userInfo?.entitlements || [];

  // Create a map for user purchased packages
  const userPurchasedOptions = purchasedPackages.reduce((acc, entitlement) => {
    const lowerCaseEntitlement = entitlement.toLowerCase();

    // Check for founders entitlement
    if (lowerCaseEntitlement.includes('founders')) {
      if (!acc.some(item => item.title === 'Founder')) {
        acc.push(subscriptionOptions[0]); // Corrected index for 'Founder'
      }
    }
    // Check for full access entitlement
    else if (lowerCaseEntitlement.includes('fullaccess')) {
      if (!acc.some(item => item.title === 'Full Access')) {
        acc.push(subscriptionOptions[1]); // Corrected index for 'Full Access'
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
            ...subscriptionOptions[2], // Corrected index for 'By Category'
            subOptions: [categoryName],
          });
        }
      }
    }
    return acc;
  }, []);

  // Here Starts the code for Subscription Options

  //console.log("REVENUE CAT PACKAGES", packages);

  // ITERATING THROUGH PACKAGES TO FIND THE PRODUCT IDENTIFIER
  for (let i = 0; i < packages.length; i++) {
    console.log('PACKAGE IDENTIFIER', packages[i].product.identifier);
  }

  const getIdentifierByKeyword = keyword => {
    const foundPackage = packages.find(pkg =>
      pkg.product.title.includes(keyword),
    );
    return foundPackage ? foundPackage.product.identifier : null;
  };

  const hasFoundersPackage = userInfo?.entitlements?.some(subscription =>
    subscription.toLowerCase().includes('founders'),
  );

  const [activeItem, setActiveItem] = useState(subscriptionOptions[0]); // Set "Founder" as default
  const [activeSubOption, setActiveSubOption] = useState('Ethereum'); // Default sub-option to 'Ethereum'
  const [selectedAdditionalOptions, setSelectedAdditionalOptions] = useState(
    [],
  );
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

      await purchasePackage(
        pack,
        packageIdentifier,
        packagePrice,
        userNewestID,
      );
      setMissingMessageActive(false);
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
    //console.log('Sub-option selected:', option);
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

  const copyToClipboard = async () => {
    Clipboard.setString(token);

    // Fetch the copied text to confirm
    //const copiedText = await Clipboard.getString();

    // Alert the copied text
    //Alert.alert('Copied to Clipboard', `Copied text: ${copiedText}`);
  };

  const getDescription = () => {
    switch (activeItem?.title) {
      case 'Founder':
        return (
          <>
            <Text style={styles.textWithIconTitlePushedv3}>
              Community Building & Early Access
            </Text>
            <TextWithIcon text="Full access to all categories for precise, up-to-date info." />
            <TextWithIcon text="Be the first to test new features and products." />
            <TextWithIcon text="Connect with a community that shapes the future with meaningful content daily." />
          </>
        );
      case 'Full Access':
        return (
          <>
            <Text style={styles.textWithIconTitle}>Founder Membership &</Text>
            <Text style={styles.textWithIconTitlePushed}>
              Leadership Opportunities
            </Text>
            <TextWithIcon text="Access Founder membership at a student rate." />
            <TextWithIcon text="Lead an Alpha Club on campus." />
            <TextWithIcon text="Empower others, gain insights, and grow your crypto expertise daily." />
          </>
        );
      case 'By Category':
        return (
          <>
            <Text style={styles.textWithIconTitlePushedv2}>
              Personalised Tracking & Alerts
            </Text>
            <TextWithIcon text="Track crypto projects by category, like stock sectors, to stay informed without the noise." />
            <TextWithIcon text="Get real-time alerts and personalised insights based on your preferences." />
            <TextWithIcon text="Monitor fundamentals, charts, and news efficiently, saving time daily." />
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
    console.log(
      'Expired subscriptions array:',
      customerInfo.allExpirationDates,
    );
    //console.log('Length of expired subscriptions array:', Object.keys(customerInfo.allExpirationDates).length);
    const hasPreviousSubscription =
      Object.keys(customerInfo.allExpirationDates).length > 0;

    if (activeItem.title === 'By Category') {
      let subOptionName = activeSubOption.toLowerCase() + '_4999_m1';
      //console.log('SUB OPTION NAME', subOptionName);

      if (hasPreviousSubscription) {
        //console.log('PREVIOUSLY PURCHASED');
        subOptionName = `${subOptionName}_nofreetrial`;
      } else {
        //console.log('NEVER PURCHASED BEFORE');
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
      let subOptionNamePremium = activeItem.title
        .toLowerCase()
        .replace(/\s+/g, '');

      if (subOptionNamePremium === 'founder' && !hasPreviousSubscription) {
        subOptionNamePremium = subOptionNamePremium + 's_14999_m1';
      } else if (
        subOptionNamePremium === 'founder' &&
        hasPreviousSubscription
      ) {
        console.log('PREVIOUSLY PURCHASED');
        subOptionNamePremium = subOptionNamePremium + 's_14999_m1_nofreetrial';
      } else if (
        subOptionNamePremium === 'fullaccess' &&
        !hasPreviousSubscription
      ) {
        console.log('NEVER PURCHASED BEFORE');
        subOptionNamePremium = subOptionNamePremium + '_5999_m1';
      } else if (
        subOptionNamePremium === 'fullaccess' &&
        hasPreviousSubscription
      ) {
        console.log('PREVIOUSLY PURCHASED');
        subOptionNamePremium = subOptionNamePremium + '_5999_m1_nofreetrial';
      }

      console.log('ACTIVENAME.TITLE->', subOptionNamePremium);

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
        showsVerticalScrollIndicator={false}
        onContentSizeChange={height => {
          setCompleteScrollBarHeight(height);
        }}
        onLayout={({
          nativeEvent: {
            layout: {height},
          },
        }) => {
          setVisibleScrollBarHeight(height);
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollIndicator}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}>
        <BackgroundGradient />
        <SafeAreaView style={styles.innerContainer}>
          <View style={styles.alignStart}>
            <BackButton navigationHandler={navigateBack} />
          </View>
          {/* About Button */}
          <TouchableOpacity
            style={styles.aboutButtonContainer}
            onPress={() =>
              toggleAbout(
                'This is information about the packages.',
                'About Membership',
              )
            }>
            <Image
              style={styles.aboutButton}
              source={require('../../../assets/images/fundamentals/about-icon.png')}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {hasFoundersPackage ? (
            <>
              <Text style={styles.foundersMainTitle}>Membership</Text>
              <Text style={styles.foundersSmallSubtitle}>Current</Text>
              <View style={styles.packagesContainer}>
                {userPurchasedOptions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.itemContainerCurrent}
                    onPress={() => console.log('Package:', item.title)}>
                    <View style={styles.itemRowCurrent}>
                      <Image
                        source={item.icon}
                        style={styles.itemIconCurrent}
                      />
                      <Text style={styles.titleCurrent}>{item.title}</Text>
                      <View style={styles.priceContainer}>
                        <Text style={styles.priceTextCurrent}>
                          {item.price}
                        </Text>
                        <Text style={styles.perMonthTextCurrent}>
                          Per month
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <>
              <Text style={styles.mainTitle}>Membership</Text>

              {userPurchasedOptions.length > 0 ? (
                <>
                  <Text style={styles.smallSubtitle}>Current</Text>
                  <View style={styles.packagesContainer}>
                    {userPurchasedOptions.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.itemContainerCurrent}
                        onPress={() => console.log('Package:', item.title)}>
                        <View style={styles.itemRowCurrent}>
                          <Image
                            source={item.icon}
                            style={styles.itemIconCurrent}
                          />
                          <Text style={styles.titleCurrent}>{item.title}</Text>
                          <View style={styles.priceContainer}>
                            <Text style={styles.priceTextCurrent}>
                              {item.price}
                            </Text>
                            <Text style={styles.perMonthTextCurrent}>
                              Per month
                            </Text>
                          </View>
                        </View>
                        {item.title === 'By Category' && item.subOptions && (
                          <View style={styles.subOptionsContainerCurrent}>
                            {item.subOptions.map((subOption, subIndex) => (
                              <TouchableOpacity
                                key={subIndex}
                                style={styles.subOptionCurrent}
                                onPress={() =>
                                  console.log('Sub-option:', subOption)
                                }>
                                <Text style={styles.subOptionTextCurrent}>
                                  {subOption}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              ) : null}

              <Text style={styles.smallSubtitle}>Upgrade</Text>
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
                          {['Ethereum', 'Bitcoin'].includes(
                            activeSubOption,
                          ) && (
                            <>
                              <TouchableOpacity
                                style={[
                                  styles.subOption,
                                  activeSubOption === 'Ethereum' &&
                                    styles.selectedSubOption,
                                ]}
                                onPress={() =>
                                  handleActiveSubOption('Ethereum')
                                }>
                                <View style={styles.subCircleContainer}>
                                  {activeSubOption === 'Ethereum' && (
                                    <Image
                                      source={require('../../../assets/images/account/subTickV2.png')}
                                      style={styles.subTickImage}
                                    />
                                  )}
                                </View>
                                <Text style={styles.subOptionText}>
                                  Ethereum
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[
                                  styles.subOption,
                                  activeSubOption === 'Bitcoin' &&
                                    styles.selectedSubOption,
                                ]}
                                onPress={() =>
                                  handleActiveSubOption('Bitcoin')
                                }>
                                <View style={styles.subCircleContainer}>
                                  {activeSubOption === 'Bitcoin' && (
                                    <Image
                                      source={require('../../../assets/images/account/subTickV2.png')}
                                      style={styles.subTickImage}
                                    />
                                  )}
                                </View>
                                <Text style={styles.subOptionText}>
                                  Bitcoin
                                </Text>
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
              <LinearGradient
                colors={['#F9AF08', '#FC5B04', '#FC5B04']}
                style={styles.linearGradient}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}>
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
                  Subscription activates post-trial.
                </Text>
                <Text style={styles.tertiaryText}>Cancel anytime.</Text>
              </View>
              <SubscriptionsLoader isLoading={loading} />
            </>
          )}
        </SafeAreaView>
      </ScrollView>

      {/* AboutModal */}
      <AboutModal
        description={aboutDescription}
        onClose={closeAbout}
        visible={aboutVisible}
        title={aboutTitle}
      />

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
      {Platform.OS === 'ios' ? (
        <View style={styles.scrollBarContainer}>
          <Animated.View
            style={[
              styles.scrollBar,
              {
                height: scrollIndicatorSize,
                transform: [{translateY: scrollIndicatorPosition}],
              },
            ]}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default PackageSubscriptions;
