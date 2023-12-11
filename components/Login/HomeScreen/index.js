import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, useWindowDimensions, ScrollView, Text, TouchableOpacity } from 'react-native';


const HomeScreen = () => {

    return (
        <View style={styles.root}>
            <Text style={styles.text}>Home sweet home</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#242427',
    },
    root:{
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#242427',
        padding: 20,
    },
    text:{
        color:'white',
    }

});

export default HomeScreen;
