import React from 'react';
import {
  REVENUECAT_IOS_API_KEY,
  REVENUECAT_ANDROID_API_KEY,
} from '../src/constants';
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
    subscribed: false,
  });

  useEffect(() => {
    const init = async () => {
      if (Platform.OS === 'ios') {
        Purchases.configure({apiKey: REVENUECAT_IOS_API_KEY});
      } else if (Platform.OS === 'android') {
        Purchases.configure({apiKey: REVENUECAT_ANDROID_API_KEY});
      }
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);

      await loadOfferings();
      await getUserSubscriptionData();

      Purchases.addCustomerInfoUpdateListener(async info => {
        updateCustomerInformation(info);
      });
    };
    init();
    return () => {
      console.log('RevenueCat data configured succesfully');
    };
  }, []);

  const updateCustomerInformation = async customerInfo => {
    const updatedUser = {
      id: userInfo.id ? userInfo.id : customerInfo.originalAppUserId,
      email: userInfo.email,
      subscribed: userInfo.entitlements.length > 0 ? 'true' : 'false',
      entitlements: [],
    };

    if (Object.entries(customerInfo.entitlements.active).length > 0) {
      updatedUser.subscribed = true;
      for (const key in customerInfo?.entitlements.active) {
        updatedUser.entitlements.push(
          customerInfo?.entitlements.active[key].productIdentifier,
        );
      }
    }
    console.log(
      `Loaded/Modified user data: \n Id: ${updatedUser.id}, \nEmail: ${
        updatedUser.email
      } \n Has any subscription? : ${
        updatedUser.subscribed
      } \n Subscriptions data: ${updatedUser.entitlements.join('. \n')}`,
    );
    setUserInfo(updatedUser);
  };

  const getUserSubscriptionData = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      console.log('Customer info:', customerInfo);
      updateCustomerInformation(customerInfo);
    } catch (error) {
      console.log('Error purchasing package:', error);
    }
  };

  const loadOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      // console.log('Offerings: ', offerings);

      // const currentOffering = offerings.current;
      // if (currentOffering) {
      //   setPackages(currentOffering.availablePackages);
      // }
      const all_packages = [];

      for (const key in offerings.all) {
        const currentOffering = offerings.all[key];
        const currentPackages = currentOffering?.availablePackages;

        if (currentPackages && Array.isArray(currentPackages)) {
          all_packages.push(...currentPackages);
        }
      }
      console.log('All packages from offerings: ', all_packages);
      setPackages(all_packages);
    } catch (error) {
      console.error('Error trying to get offerings: ', error);
    }
  };

  const purchasePackage = async pack => {
    try {
      const {customerInfo, productIdentifier} = await Purchases.purchasePackage(
        pack,
      );
      // updateCustomerInformation(customerInfo);
      console.log(
        `Purchased: ${productIdentifier}\n New customer data: ${customerInfo.entitlements} `,
      );
      // const updatedUser = {...userInfo};
      // updatedUser.entitlements = {
      //   ...updatedUser.entitlements,
      //   [pack.identifier]: pack,
      // };
      // setUserInfo(updatedUser);
    } catch (error) {
      console.log(
        `[Error trying to purchase the package]\n - Error code: ${error.code}\n - Error message: ${error.message} \n - Error description: ${error.underlyingErrorMessage} `,
      );
    }
  };

  return (
    <RevenueCatContext.Provider value={{packages, purchasePackage, userInfo}}>
      {children}
    </RevenueCatContext.Provider>
  );
};

export {RevenueCatContext, RevenueCatProvider};
