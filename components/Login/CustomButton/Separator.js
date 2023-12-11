import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, useWindowDimensions, ScrollView, Text, TouchableOpacity } from 'react-native';

const Separator = () => {
    return (
        <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerCircle} />
            <View style={styles.dividerLine} />
        </View>
    );

};

const styles = StyleSheet.create({
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10, // Adjust the spacing as needed
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#5f6567',
    },
    dividerCircle: {
        width: 10,
        height: 10,
        borderRadius: 15,
        backgroundColor: '#5f6567', // Same as the form background
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
});

export default Separator;
