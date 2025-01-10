import React, {useContext, useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import useFreeFoundersEndStyles from './FreeFoundersEndStyles';
import {RevenueCatContext} from '../../context/RevenueCatContext';
import Purchases, {LOG_LEVEL, PurchasesPackage} from 'react-native-purchases';
import {selectRawUserId} from '../../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import SubscriptionsLoader from '../Loader/SubscriptionsLoader';

const FreeFoundersEnd = ({onDismiss}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useFreeFoundersEndStyles();
  const {packages, purchasePackage, userInfo} = useContext(RevenueCatContext);
  const rawUserId = useSelector(selectRawUserId);
  const [loading, setLoading] = useState(false);
  const [missingMessageActive, setMissingMessageActive] = useState(false);
  const handlePurchase = async () => {
    const pack = await getPackageToPurchase();
    setLoading(true);

    if (pack === null) {
      console.log('Pack is null');
      setMissingMessageActive(true);
      setLoading(false);
      return;
    }

    try {
      const packageIdentifier = 'founders_14999_m1';
      const packagePrice = '149.99'; // Price has to be correct
      const userNewestID = rawUserId;

      await purchasePackage(
        pack,
        packageIdentifier,
        packagePrice,
        userNewestID,
      );
      setMissingMessageActive(false);
    } catch (error) {
      console.error('Error during purchase:', error);
      console.log('Error during purchase:', error);
      setMissingMessageActive(true);
    } finally {
      setLoading(false);
    }
  };
  const getPackageToPurchase = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    console.log('Customer info IN PACKAGESUBCRIPTIONS:', customerInfo);
    return packages.find(pkg => {
      console.log('Prior to subscription petition');
      const identifier = pkg.product.identifier.toLowerCase();
      console.log('IDENTIFIER', identifier);
      if (identifier === 'founders_14999_m1') {
        console.log('Found matching package:', identifier);
        return true;
      }
      console.log('Returning false');
      return false;
    });
  };

  return (
    <View style={styles.modalContainer}>
      <ImageBackground
        source={
          isDarkMode
            ? require('../../assets/images/popUps/discount-rocket-dark-v2.png')
            : require('../../assets/images/popUps/discount-rocket.png')
        }
        style={styles.imageBackground}
        resizeMode="contain">
        <View style={styles.contentContainer}>
          <Text style={styles.freeText}>Your Founders Trial</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.title}>Ends Soon</Text>
            <Text style={styles.untilText}>Subscribe for $149/year</Text>
            <Text style={styles.untilText}>Billed after January 1, 2026</Text>
          </View>

          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={[styles.featureTitle, {textAlign: 'center'}]}>
              Enjoyed the app?
            </Text>
            <Text style={[styles.featureSubtitle, {textAlign: 'center'}]}>
              Stay subscribed for full access!
            </Text>
          </View>
        </View>

        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.8}
            onPress={handlePurchase}>
            <LinearGradient
              colors={['#F9AF08', '#FC5404', '#FC5404']}
              style={styles.ctaGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.ctaButtonText}>Keep my Subscription</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ctaButtonTwo}
            activeOpacity={0.8}
            onPress={onDismiss}>
            <LinearGradient
              colors={['transparent', 'transparent']}
              style={styles.ctaGradientTwo}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.ctaButtonTextTwo}>I'll Think About It</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            No charges will be made unless you choose to subscribe.
          </Text>
        </View>
        <SubscriptionsLoader isLoading={loading} />
      </ImageBackground>
    </View>
  );
};

export default FreeFoundersEnd;
