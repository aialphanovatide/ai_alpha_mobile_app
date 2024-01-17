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

const SubscriptionItem = ({styles, item, onItemPress, pack}) => {
  return (
    <TouchableOpacity onPress={() => onItemPress(pack)}>
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <Text style={[styles.left, styles.title]}>{item.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.left, styles.title]}>{item.priceString}</Text>
        </View>
        <View style={styles.itemDescriptionContainer}>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PackageSubscriptions = () => {
  const styles = usePackageSubscriptionStyles();
  const navigation = useNavigation();
  const {packages, purchasePackage} = useContext(RevenueCatContext);

  console.log('Packages: ', packages);

  const handlePurchase = async pack => {
    await purchasePackage(pack);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
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
      {/* <TouchableOpacity
        style={styles.purchaseButton}
        onPress={() => handlePurchase()}>
        <Text style={styles.purchaseButtonText}>Purchase</Text>
      </TouchableOpacity> */}
      <ScrollView style={styles.packagesContainer}>
        {packages && packages.length >= 0 ? (
          packages.map((item, index) => (
            <SubscriptionItem
              key={index}
              item={item.product}
              styles={styles}
              onItemPress={handlePurchase}
              pack={item}
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
