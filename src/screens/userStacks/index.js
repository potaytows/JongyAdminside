import { Text, View, SafeAreaView, StyleSheet, StatusBar, FlatList, TextInput, ActivityIndicator,ToastAndroid, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { StackActions } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';
const apiheader = process.env.EXPO_PUBLIC_apiURI;

const Index = ({ navigation }) => {
    const { container, header, headerTitle, } = styles

    const ClearLogin =()=>{
        SecureStore.deleteItemAsync('userAuth')
        ToastAndroid.showWithGravityAndOffset('Logged out successfully!', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        navigation.dispatch(StackActions.replace('Login'));
    }

    return (
        <SafeAreaView style={container}>
            <TouchableOpacity style={styles.button} onPress={ClearLogin} >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
        justifyContent:'center'
    },button: {
        backgroundColor: '#FF914D',
        width: '40%',
        padding: 10,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 5
    },
    buttonText:{
        textAlign:'center',
        color:'white'
    }
});


export default Index