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
    return package_display_name;
  };
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
          <Text style={[styles.left, styles.title]}>
            {formatCoinTitles(item.title)}
          </Text>
          <Text style={[styles.right, styles.title]}>{item.priceString}</Text>
          <Text
            style={[
              styles.right,
              styles.secondaryText,
              styles.reference,
              isFoundersPackage && styles.foundersReference,
            ]}>
            Monthly Subscription *
          </Text>
        </View>
        <View style={styles.itemDescriptionContainer}>
          <Text style={styles.itemDescription} numberOfLines={expanded ? 0 : 2}>
            {expanded ? `${description}` : `${description.slice(0, 100)}...`}
          </Text>
          {expanded ? (
            <>
              <TouchableOpacity
                style={styles.seeMoreButton}
                onPress={() => handleExpand(false)}>
                <Image
                  source={require('../../../assets/images/arrow-up.png')}
                  resizeMode={'contain'}
                  style={styles.seeMoreIcon}
                />
              </TouchableOpacity>
            </>
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
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PackageSubscriptions = () => {
  const styles = usePackageSubscriptionStyles();
  const navigation = useNavigation();
  const {packages, purchasePackage, findProductIdInIdentifiers, userInfo} =
    useContext(RevenueCatContext);
  const [activeItem, setActiveItem] = useState(null);
  const [missingMessageActive, setMissingMessageActive] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log('Packages: ', packages);

  const handlePurchase = async pack => {
    setLoading(true);
    if (pack === null) {
      setMissingMessageActive(true);
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

  const navigateBack = () => {
    navigation.navigate('AccountMain');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.alignStart}>
        <BackButton navigationHandler={navigateBack} />
      </View>
      <Text style={styles.mainTitle}>Subscription</Text>
      <View style={styles.description}>
        <View style={styles.textRow}>
          <Text style={[styles.text, styles.bold]}>
            Unlock premium features now with a
          </Text>
          <Text style={[styles.text, styles.bold, styles.orange]}>
            7-day free trial
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.secondaryText}>
            Monthly subscription begins after. Cancel anytime hussle-free.
          </Text>
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
      <ScrollView style={styles.packagesContainer}>
        {packages && packages.length >= 0 ? (
          packages.map((item, index) => (
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
            />
          ))
        ) : (
          <Loader />
        )}
      </ScrollView>
      <SubscriptionsLoader isLoading={loading} />
    </SafeAreaView>
  );
};

export default PackageSubscriptions;
