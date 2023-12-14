import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet, FlatList, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles.js';


const PaywallScreen = () => {
    const [packages, setPackages] = useState([]);
    const [isPurchasing, setIsPurchasing] = useState(false);

    const header = () => <Text style={styles.text}>Magic Weather Premium</Text>;

    const footer = () => {
      return (
        <Text style={styles.text}>
          Don't forget to add your subscription terms and conditions. Read more about this here:
          https://www.revenuecat.com/blog/schedule-2-section-3-8-b
        </Text>
      );
    };
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
        {/* The paywall flat list displaying each package */}
        <FlatList
          data={packages}
          renderItem={({ item }) => <PackageItem purchasePackage={item} setIsPurchasing={setIsPurchasing} />}
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
