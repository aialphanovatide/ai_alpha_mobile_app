import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ENTITLEMENT_ID } from '../../constants';
import styles from './styles.js';
import Purchases from 'react-native-purchases';

const PackageItem = ({ purchasePackage, setIsPurchasing }) => {
  const {
    product: { title, description, priceString },
  } = purchasePackage;

  const navigation = useNavigation();

  const onSelection = async () => {
    try {
      const purchaseMade = await Purchases.purchasePackage(purchasePackage);
      const customerInfo = await Purchases.getCustomerInfo();

      if (typeof purchaseMade.customerInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined"){
        console.log("User is pro");
        navigation.navigate('SignIn');
      }
      console.log("\nCustomer info:", customerInfo);
    } catch (error) {
      console.log("Error purchasing package:", error);
      Alert.alert("Purchase Error", "There was an error completing your purchase.");
    }
  };
  

  return (
    <Pressable onPress={onSelection} style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.terms}>{description}</Text>
      </View>
      <Text style={styles.title}>{priceString}</Text>
    </Pressable>
  );
};

export default PackageItem;
