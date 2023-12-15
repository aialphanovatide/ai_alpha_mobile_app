import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import Purchases from 'react-native-purchases';
import { useNavigation } from '@react-navigation/core'
import { ENTITLEMENT_ID } from '../../../src/constants';

const SubscriptionSelector = ({ purchasePackage, setIsPurchasing }) => {
  const {
    product: { title, description, priceString },
  } = purchasePackage;

  const navigation = useNavigation();

  const onSelection = async () => {
    try {
      console.log('purchasePackage', purchasePackage);
      const purchaseMade = await Purchases.purchasePackage(purchasePackage);
      const customerInfo = await Purchases.getCustomerInfo();

      if (typeof purchaseMade.customerInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined"){
        console.log("User is pro");
        navigation.goBack();
      }
      console.log("Customer info:", customerInfo);
    } catch (error) {
      console.error("Error purchasing package:", error);
      Alert.alert("Purchase Error", "There was an error completing your purchase.");
    }
  };
  
  if (!purchasePackage || !purchasePackage.product) {
    return <Text>Subscription information not available</Text>;
}
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

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 24 : 0,
      backgroundColor: '#242526',
    },
    subscription: {
      borderWidth: 1,
      borderColor: 'grey',
      backgroundColor: '#5e6566',
      padding: 10,
      marginVertical: 5,
      marginLeft:10,
      marginRight:10,
      fontFamily: 'Prompt-ExtraLight',
    },
    selectedSubscription: {
      borderColor: 'orange',
    },
    imageStyle: {
        width: 170,
        height: 170,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 5,
      },
    subscriptionText: {
      fontWeight: 'bold',
      flex: 1,
      color: 'white',
      fontFamily: 'Prompt-ExtraLight',
    },
    subscriptionPrice: {
      fontWeight: 'bold',
      textAlign: 'right',
      flex: 0,
      color: 'white',
    },
    bulletPoints: {
      marginTop: 5,
    },
    bulletPointText: {
      color: 'white',
      marginBottom:10,
      fontFamily: 'Prompt-ExtraLight',
    },
    centeredText: {
        textAlign: 'center',
        color: 'white',
        padding: 10,
        fontSize: 18,
        alignSelf: 'center',
        fontFamily: 'Prompt-ExtraLight',
      },
      purchaseButtonEnabled: {
        backgroundColor: '#fc5505',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
        width: 100,
        alignSelf: 'center',
        marginVertical: 10,
      },
      purchaseButtonDisabled: {
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
        width: 100,
        alignSelf: 'center',
        marginVertical: 10,
      },
      purchaseButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Prompt-ExtraLight',
      },
});

export default SubscriptionSelector;
