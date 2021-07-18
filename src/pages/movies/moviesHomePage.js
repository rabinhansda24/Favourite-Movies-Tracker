import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import { isEmpty } from "lodash"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";


import APIKit from "../../API";

import { setMovies, updateLike } from "./MoviesActions";

import theme from "../../theme";

import Header from "../../components/Header";
import Stars from "../../components/Stars";
import Icon from "../../components/Icon";

import { ToastContext } from "../../components/Toast/ToastContext";

const { width: screenWidth } = Dimensions.get('window');


const MoviesHomeScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const {Toast} = useContext(ToastContext)

    const clasifications = useSelector(state => state.moviesReducer.clasifications)
    const movies = useSelector(state => state.moviesReducer.movies)
    const liked = useSelector(state => state.moviesReducer.liked)
    const SLIDER_WIDTH = Dimensions.get('window').width + 80
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
    const isCarousel = React.useRef(null)
    const carouselRef = React.useRef(null);


    useEffect(() => {
        if (isEmpty(movies)) {
            try {
                APIKit.get("/movies").then((resp) => {
                    console.log("resp::", resp)
                    let movies = resp.data.movies
                    dispatch(setMovies(movies))
                }).catch((err) => {
                    console.log("Err", err)
                })
            } catch (err) {
                console.log("Err", err)
            }
        }
    }, [])

    const onUpdateLike = (id) => {
        dispatch(updateLike(id))
        Toast({message: "You have liked the movie.", type: "success"})
    }

    const renderItem = ({ item, index }, parallaxProps) => {
        let movie = movies[item]
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("MovieDetailsScreen", {id: item})
                }}
            >
                <View style={styles.item}>
                    <ParallaxImage
                        source={{ uri: movie.poster }}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0.4}
                        {...parallaxProps}
                    />
                    <View style={{position: "absolute", top: hp(2), right: wp(5), }}>
                        <TouchableOpacity
                            onPress={() => onUpdateLike(item)}
                        >
                            <Icon type="AntDesign" name="heart" size={26} color={liked.indexOf(item) > -1 ? theme.colors.primaryColor : "#808080"} />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            backgroundColor: "#FFF",
                            marginTop: hp(-3),
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: hp(2),
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 8,
                        }}
                    >
                        <Text style={{ fontFamily: theme.fonts.medium, paddingVertical: hp(1), fontSize: 18 }} numberOfLines={2}>
                            {movie.title.toUpperCase()}
                        </Text>
                        <Stars rating={movie.imdb_rating} />
                    </View>

                </View>
            </TouchableOpacity>
        );
    };

    const renderClasification = ({ item }) => {

        return (
            <View style={{ marginVertical: hp(2) }}>
                <Carousel
                    ref={carouselRef}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 60}
                    data={clasifications[item]}
                    renderItem={renderItem}
                    hasParallaxImages={true}
                />

            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header title="Movies" />
            <View style={{
                paddingBottom: hp(20)
            }}>
                <FlatList
                    data={Object.keys(clasifications)}
                    renderItem={renderClasification}
                    keyExtractor={(item, idx) => idx}
                    showsVerticalScrollIndicator={false}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,

    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,

    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
        padding: wp(5)
    },
});

export default MoviesHomeScreen