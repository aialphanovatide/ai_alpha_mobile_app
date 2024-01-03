import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomButton from './CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useUserId } from '../../context/UserIdContext';

const AUTH0_DOMAIN = 'dev-zoejuo0jssw5jiid.us.auth0.com';
const CLIENT_ID = 'yxHIEb9OfX0Ax6aXlj5dh4ippqnk3bLs';
const CLIENT_SECRET = 'RT0GEngb2IhR03_AMoIjRPxAQamrTY02B4OG4RPuA8gYgguQ0ua83b509U3W-t68';

const DeleteAccountForm = () => {
    const navigation = useNavigation();
    const [isProcessing, setIsProcessing] = useState(false);
    const { userId } = useUserId();


    const getManagementApiToken = async () => {
        const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                audience: `https://${AUTH0_DOMAIN}/api/v2/`,
                grant_type: 'client_credentials'
            })
        });
        const data = await response.json();
        return data.access_token;
    };

    const deleteUserAccount = async () => {
        setIsProcessing(true);
        try {
            const token = await getManagementApiToken();
            console.log("User Email: ",{userId})

            const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log('Account deletion initiated');
                navigation.navigate('SignIn');
            } else {
                throw new Error('Account deletion failed');
            }
        } catch (error) {
            console.error('Failed to delete account:', error);
            Alert.alert('Error', 'Account deletion failed. Please try again later.');
        }
        setIsProcessing(false);
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to permanently delete your account? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: deleteUserAccount },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Delete Your Account</Text>
            <CustomButton text="Delete Account" onPress={handleDeleteAccount} disabled={isProcessing}/>
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
    // Additional styling as needed
});

export default DeleteAccountForm;
