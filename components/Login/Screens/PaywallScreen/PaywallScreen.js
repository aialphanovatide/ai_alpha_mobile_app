import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet, FlatList, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles.js';
import Purchases from 'react-native-purchases';
import SubscriptionSelector from '../../Subscriptions/SubscriptionSelector.js';

const PaywallScreen = () => {
    const [packages, setPackages] = useState([]);
    const [isPurchasing, setIsPurchasing] = useState(false);
    
    useEffect(()=>{
        const getPackages = async ()=>{
            try {
                const offerings = await Purchases.getOfferings();
                if (offerings.current !== null) {  
                    console.log(offerings.current);
                    setPackages(offerings.current.availablePackages);
                }
              } catch (e) {
              console.log(e);
              }
        };
        getPackages();
    },[]);

    return (
        <View style={styles.page}>
        <FlatList
          data={packages}
          renderItem={({ item }) => <SubscriptionSelector purchasePackage={item} setIsPurchasing={setIsPurchasing} />}
          keyExtractor={(item) => item.identifier}
          ListHeaderComponent={header}
          ListHeaderComponentStyle={styles.headerFooterContainer}
          ListFooterComponent={footer}
          ListFooterComponentStyle={styles.headerFooterContainer}
        />
  
        {isPurchasing && <View style={styles.overlay} />}
      </View>
    );
};




export default PaywallScreen;
