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

const SubscriptionItem = ({
  styles,
  item,
  description,
  icon,
  onPurchasePress,
  pack,
  onItemPress,
  activeItem,
  isPurchased,
}) => {
  const formatCoinTitles = title => {
    let first_space = title.indexOf(' ');
    let package_display_name = title.slice(0, first_space);
    return package_display_name;
  };
  return (
    <View style={[styles.itemContainer, activeItem && styles.activeItem]}>
      <View style={styles.row}>
        <Text style={[styles.left, styles.title]}>
          {formatCoinTitles(item.title)}
        </Text>
        {icon !== null && icon !== undefined && (
          <View style={styles.itemIcon}>
            <Image
              source={{
                uri: icon,
                width: 40,
                height: 40,
              }}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        )}
        <Text style={[styles.right, styles.title]}>{item.priceString}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.purchaseButton,
          isPurchased ? styles.activePurchaseButton : {},
        ]}
        onPress={() => onPurchasePress(pack)}>
        <Text
          style={[
            styles.purchaseButtonText,
            isPurchased ? styles.activePurchaseButtonText : {},
          ]}>
          {isPurchased ? 'Active' : 'Purchase'}
        </Text>
      </TouchableOpacity>
      <View style={styles.itemDescriptionContainer}>
        <Text style={styles.itemDescription} numberOfLines={activeItem ? 0 : 2}>
          {activeItem ? `${description}` : `${description.slice(0, 100)}...`}
        </Text>
        {activeItem ? (
          <>
            <TouchableOpacity
              style={styles.seeMoreButton}
              onPress={() => onItemPress(null)}>
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
            onPress={() => onItemPress(item)}>
            <Image
              source={require('../../../assets/images/arrow-down.png')}
              resizeMode={'contain'}
              style={styles.seeMoreIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const PackageSubscriptions = () => {
  const styles = usePackageSubscriptionStyles();
  const navigation = useNavigation();
  const {packages, purchasePackage, findProductIdInIdentifiers, userInfo} =
    useContext(RevenueCatContext);
  const [activeItem, setActiveItem] = useState(null);

  console.log('Packages: ', packages);

  const handlePurchase = async pack => {
    await purchasePackage(pack);
    navigation.goBack();
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
      {/* <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../../assets/images/account/alphalogo.png')}
        />
      </View> */}

      <Text style={styles.mainTitle}>Subscription</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum veniam
        quaerat ipsum quae numquam facere, soluta cum excepturi, adipisci nobis
        culpa ea provident. Excepturi corporis ullam eaque? Earum, modi
        recusandae?
      </Text>
      <ScrollView style={styles.packagesContainer}>
        {packages && packages.length >= 0 ? (
          packages.map((item, index) => (
            <SubscriptionItem
              key={index}
              item={item.product}
              styles={styles}
              onPurchasePress={handlePurchase}
              pack={item}
              icon={item.subscriptionIcon}
              description={item.subscriptionDescription}
              onItemPress={handleActiveItem}
              activeItem={activeItem && activeItem.title === item.product.title}
              isPurchased={findProductIdInIdentifiers(
                item.product.identifier,
                userInfo.entitlements,
              )}
            />
          ))
        ) : (
          <Loader />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackageSubscriptions;
