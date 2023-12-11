import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Alert, Platform } from 'react-native';
import * as IAP from 'react-native-iap';

const iosProductID = 'testsubscription2';
const items = Platform.select({
  ios:{skus: "testsubscription1"}
})

const Subscription = () => {
  const [products, setProducts] = useState([]);
  const [purchased, setPurchased] = useState(false);
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
useEffect(() => {
  const fetchSubscriptions = async () => {
    try {
      console.log("Initializing IAP connection...");
      await IAP.initConnection();
      console.log("Connected to store");

      console.log("Fetching subscriptions with:", items);
      IAP.getProducts(items).then((res) => {
        console.log("Got subscriptions", res);
        setProducts(res);
      }).catch((error) => {
        console.error("Error finding purchases", error);
      });
    } catch (error) {
      console.error("Error initializing IAP:", error);
    }
  };

  fetchSubscriptions();

  return () => {
    console.log("Ending IAP connection");
    IAP.endConnection();
  };
}, []);

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
      {purchased ? (
        <Text style={styles.text}>You are subscribed!</Text>
      ) : (
        <>
          {products.length > 0 ? (
            products.map((product, index) => (
              <View key={index} style={styles.productContainer}>
                <Text style={styles.text}>{product.title}</Text>
                <Text style={styles.text}>{product.localizedPrice}</Text>
                <Button title="Subscribe Now" onPress={handleSubscription} />
              </View>
            ))
          ) : (
            <Text style={styles.text}>Fetching products, please wait...</Text>
          )}
        </>
      )}
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
