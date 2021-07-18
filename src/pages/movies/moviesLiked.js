import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";


import theme from "../../theme";

import Header from "../../components/Header";


const MoviesLikedScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const liked = useSelector(state => state.moviesReducer.liked)
    const movies = useSelector(state => state.moviesReducer.movies)

    const renderItem = ({item}) => {
        let movie = movies[item]
        return(
            <View style={{paddingVertical: hp(1), paddingHorizontal: wp(5), borderBottomWidth: .5, borderBottomColor: theme.colors.devider}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: wp(20), height: wp(20),}}>
                        <Image source={{uri: movie.backdrop}} resizeMode="cover" style={{flex: 1}} />
                    </View>
                    <View style={{marginLeft: wp(2)}}> 
                        <View style={{flexDirection: "column"}}>
                            <Text style={{fontFamily: theme.fonts.semiBold, fontSize: 15}}> {movie.title}</Text>
                            <Text style={{fontFamily: theme.fonts.regular, fontSize: 14}}>{movie.genres.join(", ")}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <View style={{flex: 1}}>
            <Header title="Movies Liked" />
            <FlatList 
                data={liked}
                renderItem={renderItem}
                keyExtractor={(iem, idx) => idx}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontFamily: theme.fonts.regular, fontSize: 14}}>You have not liked a movie yet</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}


export default MoviesLikedScreen