import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import {
  requestSubscription,
  initConnection,
  endConnection,
  finishTransaction,
  purchaseUpdatedListener,
  purchaseErrorListener,
} from 'react-native-iap';

const subscriptionProductId = "testsubscription1";

const Subscription = () => {
  useEffect(() => {
    let purchaseUpdateSub;
    let purchaseErrorSub;

    const initIAP = async () => {
      try {
        await initConnection();
        purchaseUpdateSub = purchaseUpdatedListener(async (purchase) => {
          if (purchase.transactionReceipt) {
            await finishTransaction(purchase);
            Alert.alert('Purchase Successful', 'Subscription activated.');
          }
        });
        purchaseErrorSub = purchaseErrorListener((error) => {
          Alert.alert('Purchase Error', error.message);
        });
      } catch (error) {
        Alert.alert('IAP Error', error.message);
      }
    };

    initIAP();

    return () => {
      if (purchaseUpdateSub) {
        purchaseUpdateSub.remove();
      }
      if (purchaseErrorSub) {
        purchaseErrorSub.remove();
      }
      endConnection();
    };
  }, []);

  const handleSubscription = useCallback(async () => {
    try {
      // Call requestSubscription with an object containing the sku
      await requestSubscription({ sku: subscriptionProductId });
    } catch (err) {
      console.warn('Request subscription error', err);
      Alert.alert('Subscription Error', err.message);
    }
  }, []);
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Subscribe to our Service!
      </Text>
      <Button title="Subscribe Now" onPress={handleSubscription} />
    </View>
  );
};

export default Subscription;
