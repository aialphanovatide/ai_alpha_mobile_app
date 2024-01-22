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
  onPurchasePress,
  pack,
  onItemPress,
  activeItem,
  isPurchased
}) => {
  return (
    <View style={[styles.itemContainer, activeItem && styles.activeItem]}>
      <View style={styles.row}>
        <Text style={[styles.left, styles.title]}>{item.title}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.left, styles.title]}>{item.priceString}</Text>
      </View>
      <View style={styles.itemDescriptionContainer}>
        <Text style={styles.itemDescription}>
          {activeItem ? `${description}` : `${description.slice(0, 150)}...`}
        </Text>
        {activeItem ? (
          <>
            <TouchableOpacity
              style={styles.purchaseButton}
              onPress={() => onPurchasePress(pack)}>
              <Text style={styles.purchaseButtonText}>{isPurchased ? 'Manage' : 'Purchase'}</Text>
            </TouchableOpacity>
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.alignStart}>
        <BackButton />
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../../assets/images/account/alphalogo.png')}
        />
      </View>
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
