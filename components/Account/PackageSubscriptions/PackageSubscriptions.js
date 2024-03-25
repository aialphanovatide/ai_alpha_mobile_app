import React, {useContext, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import usePackageSubscriptionStyles from './PackageSubscriptionStyles';
import Loader from '../../Loader/Loader';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import BackButton from '../../Analysis/BackButton/BackButton';
import {useNavigation} from '@react-navigation/core';
import SubscriptionsLoader from '../../Loader/SubscriptionsLoader';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../context/themeContext';

const SubscriptionItem = ({
  styles,
  item,
  offering,
  description,
  icon,
  onItemPress,
  activeItem,
  isFoundersPackage,
}) => {
  const formatCoinTitles = title => {
    let first_space = title.indexOf(' ');
    let package_display_name = title.slice(0, first_space);
    if (package_display_name == 'Founder'){
      package_display_name = 'AI Alpha Founders';
    }
    return package_display_name;
  };

  const coinNamesMap = {
    BaseBlock: ['ada', 'sol', 'avax'],
    CoreChain: ['near', 'ftm', 'kas'],
    RootLink: ['atom', 'dot', 'qnt'],
    XPayments: ['xlm', 'algo', 'xrp'],
    LSDs: ['ldo', 'rpl', 'fxs'],
    BoostLayer: ['matic', 'arb', 'op'],
    Truthnodes: ['link', 'api3', 'band'],
    CycleSwap: ['dydx', 'velo', 'gmx'],
    Nextrade: ['uni', 'sushi', 'cake'],
    Diversefi: ['aave', 'pendle', '1inch'],
    Intellichain: ['ocean', 'fet', 'rndr'],
  };
  const coinNames = coinNamesMap[formatCoinTitles(item.title)] || [];
  console.log("coin names! -> ", coinNames);
  const [expanded, setExpanded] = useState(false);

  const handleExpand = value => {
    setExpanded(value);
  };

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => onItemPress(offering)}>
      <View
        style={[
          styles.itemContainer,
          activeItem && styles.selectedItem,
          isFoundersPackage && styles.foundersItem,
          isFoundersPackage && activeItem && styles.selectedFounders,
        ]}>
        <View style={styles.row}>
          {icon !== null && icon !== undefined && (
            <View style={styles.itemIcon}>
              <Image
                source={
                  isFoundersPackage
                    ? require('../../../assets/images/account/founders-icon.png')
                    : {
                        uri: icon,
                        width: 40,
                        height: 40,
                      }
                }
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          )}
          <Text
            style={[
              styles.left,
              styles.title,
              isFoundersPackage && styles.foundersText,
            ]}>
            {formatCoinTitles(item.title)}
          </Text>
          <Text
            style={[
              styles.right,
              styles.title,
              isFoundersPackage && styles.foundersText,
            ]}>
            {item.priceString}
          </Text>
          <Text
            style={[
              styles.right,
              styles.secondaryText,
              styles.reference,
              isFoundersPackage && styles.foundersReference,
            ]}>
            Monthly Subscription *
          </Text>
          <View style={styles.subCoinContainer}>
        <Image
          source={{
            uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${coinNames[0]}.png`,
            width: 20,
            height: 20,
          }}
          style={styles.subCoin}
          />
        <Image
          source={{
            uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${coinNames[1]}.png`,
            width: 20,
            height: 20,
          }}
          style={styles.subCoin}
          />
        <Image
          source={{
            uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${coinNames[2]}.png`,
            width: 20,
            height: 20,
          }}
          style={styles.subCoin}
          />
        </View>
        </View>
        <View style={styles.itemDescriptionContainer}>
        <Text
            style={[
              styles.itemDescription,
              isFoundersPackage && styles.foundersText,
            ]}
            numberOfLines={expanded ? 0 : 2}>
            {expanded ? `${description}` : `${description.slice(0, 100)}...`}
          </Text>
          {/* Conditionally render the 'arrow-down' image */}
          {!isFoundersPackage && (
            <>
              {expanded ? (
                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => handleExpand(false)}>
                  <Image
                    source={require('../../../assets/images/arrow-up.png')}
                    resizeMode={'contain'}
                    style={styles.seeMoreIcon}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => handleExpand(true)}>
                  <Image
                    source={require('../../../assets/images/arrow-down.png')}
                    resizeMode={'contain'}
                    style={styles.seeMoreIcon}
                  />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PackageSubscriptions = () => {
  const styles = usePackageSubscriptionStyles();
  const navigation = useNavigation();
  const {isDarkMode} = useContext(AppThemeContext);
  const {packages, purchasePackage, findProductIdInIdentifiers, userInfo} =
    useContext(RevenueCatContext);
  const [activeItem, setActiveItem] = useState(null);
  const [missingMessageActive, setMissingMessageActive] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log('Packages: ', packages);

  const hasFoundersPackage = userInfo?.entitlements?.some(subscription =>
    subscription.toLowerCase().includes('founders'),
  );

  const handlePurchase = async pack => {
    setLoading(true);
    if (pack === null) {
      setMissingMessageActive(true);
      setLoading(false);
      return;
    }
    try {
      await purchasePackage(pack);
      setMissingMessageActive(false);
    } catch (error) {
      setMissingMessageActive(true);
    } finally {
      setActiveItem(null);
      setLoading(false);
    }
  };

  const handleActiveItem = item => {
    setActiveItem(prevActiveItem =>
      prevActiveItem === item ? null : item
    );
  };

  const navigateBack = () => {
    navigation.navigate('AccountMain');
  };

  // const hasFoundersPackage = userInfo?.entitlements?.some(subscription =>
  //   subscription.toLowerCase().includes('founders'),
  // );
  // console.log("HAS A FOUNDER PACKAGE: ", hasFoundersPackage);

  return (
    <ScrollView style={styles.backgroundContainer}>
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
        style={styles.flex}
      >
        <SafeAreaView style={styles.container}>
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
            <View style={styles.textRow}>
              <Text style={styles.textFounders}>
                Exclusive new content
              </Text>
            </View>
            <View>
            <Text style={styles.bigTextFounders}>
                ONLY FOR OUR FOUNDERS
              </Text>
              <View style={styles.textRow}>
              <Text style={styles.secondaryTextFounders}>
              As an OG AI Alpha Founder watch this space for access to exclusive new content and packages
              </Text>
            </View>
            </View>
            </ View>
          ) : (
            <>
              <Text style={styles.mainTitle}>Subscriptions Options</Text>
              <View style={styles.description}>
            <View style={styles.textRow}>
              <Text style={styles.text}>
                Unlock premium features now with a
              </Text>
            </View>
            <View>
            <Text style={styles.bigText}>
                7 DAY FREE TRIAL
              </Text>
            </View>
            <View style={styles.textRowContainer}>
            <View style={styles.textRow}>
              <Text style={styles.secondaryText}>
                Monthly subscription activates post-trial.
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.secondaryText}>
                Cancel anytime hussle-free
              </Text>
            </View>
            </View>
          </View>
          <TouchableOpacity
          style={[
            styles.purchaseButton,
            activeItem ? styles.activePurchaseButton : {},
          ]}
          onPress={() => handlePurchase(activeItem)}>
          <Text
            style={[
              styles.purchaseButtonText,
              activeItem ? styles.activePurchaseButtonText : {},
            ]}>
            Purchase
          </Text>
        </TouchableOpacity>
              <View style={styles.packagesContainer}>
                {packages && packages.length > 0 ? (
                  packages.map((item, index) => (
                    <View key={index}>
                              <SubscriptionItem
            key={index}
            item={item.product}
            styles={styles}
            offering={item}
            icon={item.subscriptionIcon}
            description={item.subscriptionDescription}
            onItemPress={handleActiveItem}
            activeItem={
              activeItem && activeItem.product.title === item.product.title
            }
            isFoundersPackage={false || item.product.identifier.includes('founders')}
          />
                    </View>
                  ))
                ) : (
                  <Loader />
                )}
              </View>
              <SubscriptionsLoader isLoading={loading} />
            </>
          )}
        </SafeAreaView>
      </LinearGradient>
    </ScrollView>
  );
};

export default PackageSubscriptions;