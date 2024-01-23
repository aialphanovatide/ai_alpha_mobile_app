import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomButton from './CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useUserId } from '../../context/UserIdContext';
import Auth0 from 'react-native-auth0';

const AUTH0_DOMAIN = 'dev-zoejuo0jssw5jiid.us.auth0.com';
const CLIENT_ID = 'yxHIEb9OfX0Ax6aXlj5dh4ippqnk3bLs';
const CLIENT_SECRET = 'RT0GEngb2IhR03_AMoIjRPxAQamrTY02B4OG4RPuA8gYgguQ0ua83b509U3W-t68';

const DeleteAccountForm = () => {
    const navigation = useNavigation();
    const [isProcessing, setIsProcessing] = useState(false);
    //const { userId } = useUserId();
    //const {userId} = "m.mengo@novatidelabs.com"
    const userId = 'm.mengo@novatidelabs.com'; 

    console.log("User Email: ",{userId})
    console.log("User Email 2: ",userId)



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
    
            // Fetch user ID from Auth0 Management API
            const userInfoResponse = await fetch(`https://${AUTH0_DOMAIN}/api/v2/users?q=email:${encodeURIComponent(userId)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!userInfoResponse.ok) {
                throw new Error('Failed to fetch user information');
            }
    
            const userInfo = await userInfoResponse.json();
    
            if (userInfo.length === 0) {
                throw new Error('User not found');
            }
    
            const auth0UserId = userInfo[0].user_id;
    
            const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(auth0UserId)}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            console.log("Response status:", response.status);
    
            if (response.ok) {
                console.log('Account deletion initiated');
                navigation.navigate('SignIn');
            } else {
                const errorText = await response.text();
                console.error('Account deletion failed:', errorText);
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
    fontSize: 18,
    marginBottom: 20
},);
        

export default DeleteAccountForm;