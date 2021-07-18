import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Image } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";


import theme from "../../theme";

import Header from "../../components/Header";
import Icon from "../../components/Icon";

import { updateLike } from "./MoviesActions";

import { ToastContext } from "../../components/Toast/ToastContext";


const MovieDetailsScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const movies = useSelector(state => state.moviesReducer.movies)
    const liked = useSelector(state => state.moviesReducer.liked)
    const id = props.route.params.id
    const [movie, setMovie] = useState({})

    const {Toast} = useContext(ToastContext)

    useEffect(() => {
        setMovie(movies[id])
    }, [])

    const onUpdateLike = () => {
        dispatch(updateLike(id))
        Toast({message: "You have liked the movie.", type: "success"})
    }

    return (
        <View style={{ flex: 1 }}>
            <Header title="Movie Details" goBack={true} />
            <ScrollView>
                <View style={{height: hp(40), width: wp(100)}}>
                    <Image source={{uri: movie.backdrop}} resizeMode="cover" style={{flex: 1}} />
                    <View style={{position: "absolute", top: hp(2), right: wp(5)}}>
                        <TouchableOpacity
                            onPress={onUpdateLike}
                        >
                            <Icon type="AntDesign" name="heart" size={26} color={liked.indexOf(id) > -1 ? theme.colors.primaryColor : "#808080"} />
                        </TouchableOpacity>
                    </View>
                    <View style={{position: "absolute", bottom: hp(1), paddingHorizontal: wp(5)}}>
                        <Text style={{fontFamily: theme.fonts.semiBold, color: theme.colors.secondaryColor, fontSize: 18}}>{movie.title}</Text>
                        <Text style={{fontFamily: theme.fonts.regular, fontSize: 14, color: theme.colors.white}}>{movie.overview}</Text>
                    </View>
                </View>
                <View style={{marginVertical: hp(2), paddingHorizontal: wp(5)}}>
                    <View style={{flexDirection: "column", marginVertical: hp(1)}}>
                        <Text style={styles.heading}>Director</Text>
                        <Text style={styles.text}>{movie.director}</Text>
                    </View>
                    <View style={{flexDirection: "column", marginVertical: hp(1)}}>
                        <Text style={styles.heading}>Clasification</Text>
                        <Text style={styles.text}>{movie.classification}</Text>
                    </View>
                    <View style={{flexDirection: "column", marginVertical: hp(1)}}>
                        <Text style={styles.heading}>Cast</Text>
                        <Text style={styles.text}>{movie && movie.cast && movie.cast.join(", ")}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: hp(1)}}>
                        <Text style={styles.heading}>Runtime</Text>
                        <Text style={styles.text}>{movie.length}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: hp(1)}}>
                        <Text style={styles.heading}>Released on</Text>
                        <Text style={styles.text}>{movie.released_on}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontFamily: theme.fonts.semiBold, 
        fontSize: 15
    },
    text: {
        fontFamily: theme.fonts.regular, 
        fontSize: 14
    }
})


export default MovieDetailsScreen