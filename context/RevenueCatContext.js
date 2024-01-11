import React from 'react';
import {IOS_API_KEY, ANDROID_API_KEY} from '@env';
import {createContext, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Purchases, {LOG_LEVEL, PurchasesPackage} from 'react-native-purchases';
import {CustomerInfo} from 'react-native-purchases';

const RevenueCatContext = createContext();

const RevenueCatProvider = ({children}) => {
  const [packages, setPackages] = useState([]);
  const [userInfo, setUserInfo] = useState({
    id: '',
    email: '',
    entitlements: [],
  });

  useEffect(() => {
    const init = async () => {
      if (Platform.OS === 'ios') {
        Purchases.configure({apiKey: IOS_API_KEY});
      } else if (Platform.OS === 'android') {
        Purchases.configure({apiKey: ANDROID_API_KEY});
      }
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      await loadOfferings();
      await getUserSubscriptionData();
    };
    init();
  }, []);

  const getUserSubscriptionData = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      console.log('Customer info:', customerInfo);
      setUserInfo({
        ...userInfo,
        entitlements: customerInfo.entitlements.active,
      });
    } catch (error) {
      console.log('Error purchasing package:', error);
    }
  };

  const loadOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      console.log('Offerings: ', offerings);

      const currentOffering = offerings.current;

      if (currentOffering) {
        setPackages(currentOffering.availablePackages);
      }

      console.log(currentOffering.availablePackages);
    } catch (error) {
      console.error('Error trying to get offerings: ', error);
    }
  };

  const purchasePackage = async pack => {
    try {
      await Purchases.purchasePackage(pack);
      setUserInfo({
        ...userInfo,
        entitlements: [...userInfo.entitlements, pack.identifier],
      });
      console.log('Purchased: ', pack);
    } catch (error) {
      console.log('Error trying to purchase the package: ', error);
    }
  };

  return (
    <RevenueCatContext.Provider value={{packages, purchasePackage, userInfo}}>
      {children}
    </RevenueCatContext.Provider>
  );
};

export {RevenueCatContext, RevenueCatProvider};
