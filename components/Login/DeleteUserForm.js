// src/components/DeleteAccountForm.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton/CustomButton';
import auth0 from './auth0.js';
import { useNavigation } from '@react-navigation/native';

const DeleteAccountForm = () => {
    const navigation = useNavigation();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDeleteAccount = async () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to permanently delete your account? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => deleteUserAccount() },
            ]
        );
    };

    const deleteUserAccount = async () => {
        setIsProcessing(true);
        try {
            // Here you would call the Auth0 API to delete the account.
            // As an example, using auth0.auth...
            // await auth0.auth.deleteUserAccount({ ... });
            console.log('Account deletion initiated');

            // Navigate to a safe screen after deletion
            navigation.navigate('Welcome'); // Replace 'Welcome' with the screen you want to navigate to
        } catch (error) {
            console.error('Failed to delete account:', error);
            Alert.alert('Error', 'Failed to delete account. Please try again later.');
        }
        setIsProcessing(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Delete Your Account</Text>
            <CustomButton text="Delete Account" onPress={handleDeleteAccount} disabled={isProcessing}/>
            {/* Include other UI elements as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        marginBottom: 20
    },
    // Add additional styling as needed
});

export default DeleteAccountForm;
