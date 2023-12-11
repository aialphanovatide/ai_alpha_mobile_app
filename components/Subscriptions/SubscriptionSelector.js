import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, Text, View, StyleSheet, Button, ScrollView, Image } from 'react-native';

const SubscriptionSelector = () => {
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);

  const subscriptions = [
    { id: 'bitcoin', name: 'Bitcoin', price: '$50', details: ['Lorem ipsum dolor sit amet.', 'Consectetur adipiscing elit.'] },
    { id: 'ethereum', name: 'Ethereum', price: '$50', details: ['Aenean commodo ligula eget dolor.', 'Aenean massa cum sociis.'] },
    { id: 'layer0s', name: 'Layer 0s', price: '$50', details: ['Cum sociis natoque penatibus.', 'Magnis dis parturient montes.'] },
    { id: 'largeMarketCap', name: 'Layer 1: Large Market Cap', price: '$50', details: ['Nascetur ridiculus mus.', 'Donec quam felis ultricies nec.'] },
    { id: 'midMarketCap', name: 'Layer 1: Mid Market Cap', price: '$50', details: ['Pellentesque eu pretium quis sem.', 'Nulla consequat massa quis enim.'] },
    { id: 'crossBorder', name: 'Cross Border Payments', price: '$50', details: ['Donec pede justo fringilla vel.', 'Aliquet nec vulputate eget.'] },
    { id: 'lsds', name: 'LSDs', price: '$50', details: ['Arcu in enim justo rhoncus.', 'Imperdiet a venenatis vitae.'] },
    { id: 'layer2s', name: 'Layer 2s', price: '$50', details: ['Justo eget felis facilisis.', 'Fermentum et sollicitudin ac orci.'] },
    { id: 'oracles', name: 'Oracles', price: '$50', details: ['Phasellus viverra nulla ut.', 'Metus varius laoreet quam.'] },
    // Add other subscriptions here...
  ];

  const toggleSubscription = (id) => {
    setSelectedSubscriptions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((subId) => subId !== id)
        : [...prevSelected, id]
    );
  };

  const isSubscriptionSelected = (id) => {
    return selectedSubscriptions.includes(id);
  };
  const isButtonEnabled = selectedSubscriptions.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
                  {/* Add your image here */}
                  <Image source={require('../../assets/AIAlphalogonew.png')} style={styles.imageStyle} />

        {/* Centered text below the image */}
        <Text style={styles.centeredText}>
          Choose Your Subscription Choose Your Subscription Choose Your Subscription Choose Your Subscription Choose  
        </Text>

        {/* Purchase button below the text */}
        <TouchableOpacity
          onPress={() => console.log('Selected Subscriptions:', selectedSubscriptions)}
          disabled={!isButtonEnabled}
          style={isButtonEnabled ? styles.purchaseButtonEnabled : styles.purchaseButtonDisabled}
        >
          <Text style={styles.purchaseButtonText}>Purchase</Text>
        </TouchableOpacity>
      {subscriptions.map((subscription) => (
        <TouchableOpacity
        key={subscription.id}
        style={[styles.subscription,
        isSubscriptionSelected(subscription.id) && styles.selectedSubscription,]}
        onPress={() => toggleSubscription(subscription.id)}>
    <View style={styles.subscriptionHeader}>
      <Text style={styles.subscriptionText}>{subscription.name}</Text>
      <Text style={styles.subscriptionPrice}>{subscription.price}</Text>
    </View>
    <View style={styles.bulletPoints}>
      {subscription.details.map((detail, index) => (
        <Text key={index} style={styles.bulletPointText}>
          • {detail}
        </Text>
      ))}
    </View>
  </TouchableOpacity>
))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 24 : 0,
      backgroundColor: '#242526', // Set the background color for the whole area
    },
    scrollView: {
      // If you have specific styles for the ScrollView, they would go here
    },
    subscription: {
      // Style for each subscription
      borderWidth: 1,
      borderColor: 'grey',
      backgroundColor: '#5e6566', // Set the background color for each subscription block
      padding: 10,
      marginVertical: 5,
      marginLeft:10,
      marginRight:10,
      fontFamily: 'Prompt-ExtraLight',
    },
    selectedSubscription: {
      borderColor: 'orange',
      // If you want a different background color when selected, set it here
    },
    imageStyle: {
        width: 170, // Set the width to 70 pixels
        height: 170, // Set the height to 70 pixels
        resizeMode: 'contain', // This will ensure the image's aspect ratio is maintained
        alignSelf: 'center', // This will center the image in the view
        marginVertical: 5, // Optional: adds vertical space above and below the image
      },
    subscriptionText: {
      // Style for the subscription text
      fontWeight: 'bold',
      flex: 1,
      color: 'white', // Set the font color to white
      fontFamily: 'Prompt-ExtraLight',
    },
    subscriptionPrice: {
      // Style for the subscription price
      fontWeight: 'bold',
      textAlign: 'right',
      flex: 0,
      color: 'white', // Set the font color to white
    },
    bulletPoints: {
      marginTop: 5,
    },
    bulletPointText: {
      // Style for bullet point text
      color: 'white', // Set the font color to white
      marginBottom:10,
      fontFamily: 'Prompt-ExtraLight',
    },
    centeredText: {
        textAlign: 'center', // Align text to the center
        color: 'white', // Set the text color to white
        padding: 10, // Add some padding around the text
        fontSize: 18, // Set the font size
        alignSelf: 'center', // Center the text horizontally
        fontFamily: 'Prompt-ExtraLight',
      },
      purchaseButtonEnabled: {
        backgroundColor: '#fc5505', // Orange color for the enabled button
        justifyContent: 'center', // Center the text vertically
        alignItems: 'center', // Center the text horizontally
        paddingVertical: 10,
        borderRadius: 5,
        width: 100, // Set the width to 100 pixels
        alignSelf: 'center', // Center the button horizontally
        marginVertical: 10,
      },
      purchaseButtonDisabled: {
        backgroundColor: '#ccc', // Gray color for the disabled button
        justifyContent: 'center', // Center the text vertically
        alignItems: 'center', // Center the text horizontally
        paddingVertical: 10,
        borderRadius: 5,
        width: 100, // Set the width to 100 pixels
        alignSelf: 'center', // Center the button horizontally
        marginVertical: 10,
      },
      purchaseButtonText: {
        color: 'white', // Text color for the button
        fontSize: 16, // Font size for the button text
        fontWeight: 'bold',
        fontFamily: 'Prompt-ExtraLight',
      },
});

export default SubscriptionSelector;
