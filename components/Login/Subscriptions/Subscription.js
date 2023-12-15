import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Alert, Platform } from 'react-native';

const Subscription = () => {

/*
  useEffect(() => {
    const initIAP = async () => {
      try {
        console.log('Fetching all subscriptions...');
        const allSubscriptions = await IAP.getSubscriptions({ skus: ["testsubscription1", "testsubscription2"] });
        console.log('All available subscriptions:', allSubscriptions);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
      
    };

    initIAP();

    return () => {
      console.log('Ending IAP connection');
      IAP.endConnection();
    };
  }, []);
*/

  /*const handleSubscription = async () => {
    try {
      console.log('Handling subscription...');
      console.log(`iOS SKU for subscription: ${iosProductID}`);

      const subscriptionResult = await IAP.requestSubscription(iosProductID);
      console.log('Subscription request result:', subscriptionResult);

      setPurchased(true);
      Alert.alert('Purchase Successful', 'You have successfully subscribed.');
    } catch (err) {
      console.error('Purchase error:', err);
      console.log('Error details:', err.message);
      Alert.alert('Purchase Error', err.message);
    }
  };*/

  return (
    <View style={styles.container}>
      <Text>Abc</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productContainer: {
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default Subscription;
