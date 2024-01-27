import React from 'react';
import {
  REVENUECAT_IOS_API_KEY,
  REVENUECAT_ANDROID_API_KEY,
} from '../src/constants';
import {createContext, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Purchases, {LOG_LEVEL, PurchasesPackage} from 'react-native-purchases';
import {CustomerInfo} from 'react-native-purchases';
import {useUserId} from './UserIdContext';

const RevenueCatContext = createContext();

const RevenueCatProvider = ({children}) => {
  const [packages, setPackages] = useState([]);
  const [userInfo, setUserInfo] = useState({
    id: '',
    email: '',
    entitlements: [],
    subscribed: false,
  });

  const init = async (userId) => {
    if (Platform.OS === 'ios') {
      Purchases.configure({apiKey: REVENUECAT_IOS_API_KEY, appUserID: userId});
    } else if (Platform.OS === 'android') {
      Purchases.configure({
        apiKey: REVENUECAT_ANDROID_API_KEY,
        appUserID: userId,
      });
    }
    Purchases.setLogLevel(LOG_LEVEL.DEBUG);

    await loadOfferings();
    await getUserSubscriptionData();

    Purchases.addCustomerInfoUpdateListener(async info => {
      updateCustomerInformation(info);
    });
  };

  const updateUserEmail = newEmail => {
    let new_user = {
      id: userInfo.id,
      email: newEmail,
      subscribed: userInfo.subscribed,
      entitlements: userInfo.entitlements,
    };
    setUserInfo(new_user);
  };

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
      console.log('Offerings: ', offerings);
      const all_packages = [];

      for (const key in offerings.all) {
        const currentOffering = offerings.all[key];
        const currentPackages = currentOffering?.availablePackages;
        currentPackages[0].subscriptionDescription =
          currentOffering.metadata.description;

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
      console.log(pack);
      const {customerInfo, productIdentifier} = await Purchases.purchasePackage(
        pack,
      );
      // updateCustomerInformation(customerInfo);
      console.log(
        `Purchased: ${productIdentifier}\n New customer data: ${customerInfo.entitlements} `,
      );
    } catch (error) {
      console.log(
        `[Error trying to purchase the package]\n - Error code: ${error.code}\n - Error message: ${error.message} \n - Error description: ${error.underlyingErrorMessage} `,
      );
    }
  };
  // This function verifies if a package is in the identifiers, comparing the product identifier of the package with all of the entitlements that the user has subscribed.
  const findProductIdInIdentifiers = (productId, identifiers) => {
    if (identifiers.length === 0 || !productId || productId === undefined) {
      return false;
    }

    if (
      identifiers.some(id => {
        const lowercaseId = id.toLowerCase();
        if (lowercaseId.includes('founders')) {
          return true;
        }
      })
    ) {
      return true;
    }

    return identifiers.some(id => {
      const lowercaseId = id.toLowerCase();
      return productId.includes(lowercaseId);
    });
  };

  // This function finds the activeCoin name inside every string of the user entitlements identifiers

  const findCategoryInIdentifiers = (category, identifiers) => {
    if (
      identifiers.length === 0 ||
      category === null ||
      category === undefined
    ) {
      return false;
    }

    const categoryKeyword = category.toLowerCase();
    return identifiers.some(identifier => {
      const lowercaseIdentifier = identifier.toLowerCase();
      if (lowercaseIdentifier.includes('founders')) {
        return true;
      }
      return lowercaseIdentifier.includes(categoryKeyword);
    });
  };

  return (
    <RevenueCatContext.Provider
      value={{
        init,
        packages,
        purchasePackage,
        userInfo,
        updateUserEmail,
        findCategoryInIdentifiers,
        findProductIdInIdentifiers,
      }}>
      {children}
    </RevenueCatContext.Provider>
  );
};

export {RevenueCatContext, RevenueCatProvider};
