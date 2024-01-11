import React, {useContext, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import usePackageSubscriptionStyles from './PackageSubscriptionStyles';
import Loader from '../../Loader/Loader';
import {RevenueCatContext} from '../../../context/RevenueCatContext';

const packages_mock = [
  {
    title: 'Bitcoin',
    price: 50,
    description: `- Lorem ipsum dolor sit amet
    - Consectetuer adipiscing elit, sed diam.`,
  },
  {
    title: 'Ethereum',
    price: 50,
    description: `- Lorem ipsum dolor sit amet
    - Consectetuer adipiscing elit, sed diam.`,
  },
  {
    title: "Layer 0's",
    price: 50,
    description: `- Lorem ipsum dolor sit amet
    - Consectetuer adipiscing elit, sed diam.`,
  },
  {
    title: 'Layer 1: Large Market Cap',
    price: 50,
    description: `- Lorem ipsum dolor sit amet
    - Consectetuer adipiscing elit, sed diam.`,
  },
  {
    title: 'Layer 1: Mid Market Cap',
    price: 50,
    description: `- Lorem ipsum dolor sit amet
    - Consectetuer adipiscing elit, sed diam.`,
  },
  {
    title: 'Cross Border Payments',
    price: 50,
    description: `- Lorem ipsum dolor sit amet
    - Consectetuer adipiscing elit, sed diam.`,
  },
  {
    title: 'LSDs',
    price: 50,
    description: `- Lorem ipsum dolor sit amet
    - Consectetuer adipiscing elit, sed diam.`,
  },
  {
    title: 'Layer 2s',
    price: 50,
    description: `- Lorem ipsum dolor sit amet
    - Consectetuer adipiscing elit, sed diam.`,
  },
  {
    title: 'Oracles',
    price: 50,
    description: `- Lorem ipsum dolor sit amet
    - Consectetuer adipiscing elit, sed diam.`,
  },
];

const SubscriptionItem = ({styles, item, onItemPress, pack}) => {
  return (
    <TouchableOpacity onPress={() => onItemPress(pack)}>
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <Text style={[styles.left, styles.title]}>{item.title}</Text>
          <Text style={[styles.right, styles.title]}>${item.price}</Text>
        </View>
        <View style={styles.itemDescriptionContainer}>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PackageSubscriptions = () => {
  const styles = usePackageSubscriptionStyles();
  // const [packages, setPackages] = useState(packages_mock);
  const {packages, purchasePackage} = useContext(RevenueCatContext);

  console.log('Packages: ', packages);

  const handlePurchase = async pack => {
    // console.log(
    //   'Purchase button pressed, change this to RevenueCat purchasePackage function...',
    // );
    await purchasePackage(pack);
  };

  const onItemPress = item => {
    console.log(
      `Selected the ${item.title} subscription. Configure this with the RevenueCat purchasePackage function.`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../../assets/images/account/alphalogo.png')}
        />
      </View>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum veniam
        quaerat ipsum quae numquam facere, soluta cum excepturi, adipisci nobis
        culpa ea provident. Excepturi corporis ullam eaque? Earum, modi
        recusandae?
      </Text>
      <TouchableOpacity
        style={styles.purchaseButton}
        onPress={() => handlePurchase()}>
        <Text style={styles.purchaseButtonText}>Purchase</Text>
      </TouchableOpacity>
      <ScrollView style={styles.packagesContainer}>
        {packages ? (
          packages.map((item, index) => (
            <SubscriptionItem
              key={index}
              item={item.product}
              styles={styles}
              onItemPress={handlePurchase}
              pack={item}
            />
          ))
        ) : (
          <Loader />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackageSubscriptions;
