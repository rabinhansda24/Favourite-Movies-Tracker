import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";

import theme from "../../theme";

import Header from "../../components/Header";


const MoviesHomeScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    return(
        <View style={{flex: 1}}>
            <Header title="Movies" />
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text>Movies Landing</Text>
            </View>
        </View>
    )
}


export default MoviesHomeScreen