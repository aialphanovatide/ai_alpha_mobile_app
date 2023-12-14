/**
 * @file Restore Purchases Button.
 * @author Vadim Savin
 */

import React from 'react';
import { Pressable, Text, Alert } from 'react-native';
import styles from './styles';
import Purchases from 'react-native-purchases';

const RestorePurchasesButton = () => {
  const restorePurchases = async () => {
    try{
      console.log("here")
      const restore = await Purchases.restorePurchases();
      console.log(restore);
      console.log("after restore")
    } catch (e) {
      Alert.alert('Error restoring purchases', e.message);
    }
  };

  return (
    <Pressable onPress={restorePurchases} style={styles.button}>
      <Text style={styles.text}>Restore Purchases</Text>
    </Pressable>
  );
};

export default RestorePurchasesButton;
