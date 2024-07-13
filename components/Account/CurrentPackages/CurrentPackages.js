import React, { useContext, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useCurrentPackagesStyles from './CurrentPackagesStyles';
import Loader from '../../Loader/Loader';
import { RevenueCatContext } from '../../../context/RevenueCatContext';
import BackButton from '../../Analysis/BackButton/BackButton';
import { useNavigation } from '@react-navigation/core';
import SubscriptionsLoader from '../../Loader/SubscriptionsLoader';
import LinearGradient from 'react-native-linear-gradient';
import { AppThemeContext } from '../../../context/themeContext';

const NoPackagesView = ({ styles }) => (
  <View style={styles.noPackagesContainer}>
    <Text style={styles.noPackages}>
      No purchased packages yet.
    </Text>
  </View>
);

const SubscriptionItem = ({
  styles,
  item,
  offering,
  description,
  icon,
  onItemPress,
  activeItem,
  isFoundersPackage,
  packageDisplayName,
}) => {
  const formatCoinTitles = title => {
    let first_space = title.indexOf(' ');
    let package_display_name = title.slice(0, first_space);
    console.log("Word formatting -> ", package_display_name)
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
  return (
      <View
        style={[
          styles.itemContainer,
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
        {isFoundersPackage && (
        <View style={styles.foundersLabelContainer}>
          <Text style={styles.foundersLabel}>
          Congratulations! You are part of the exclusive group of AI Alpha Founders
          </Text>
        </View>
      )}

      </View>
  );
};

const CurrentPackages = () => {
  const styles = useCurrentPackagesStyles();
  const navigation = useNavigation();
  const { isDarkMode } = useContext(AppThemeContext);
  const { packages, purchasePackage, findProductIdInIdentifiers, userInfo } =
    useContext(RevenueCatContext);
  const [activeItem, setActiveItem] = useState(null);
  const [missingMessageActive, setMissingMessageActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateBack = () => {
    navigation.navigate('AccountMain');
  };

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
    setActiveItem(item);
  };

  const purchasedPackages = packages.filter(item => userInfo?.entitlements.includes(item.product.identifier));

  console.log("Purchased Packages:", purchasedPackages);

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={styles.flex}>
      <SafeAreaView style={styles.container}>
        <View style={styles.alignStart}>
          <BackButton navigationHandler={navigateBack} />
        </View>
        <Text style={styles.mainTitle}>My Packages</Text>
        {purchasedPackages.length > 0 ? (
          <ScrollView style={styles.packagesContainer}>
            {purchasedPackages.map((item, index) => (
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
                isFoundersPackage={item.product.identifier.includes('founders')}
                packageDisplayName={item.title}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.flex}>
            <NoPackagesView styles={styles} />
          </View>
        )}
        <SubscriptionsLoader isLoading={loading} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CurrentPackages;
