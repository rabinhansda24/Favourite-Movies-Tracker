import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, } from "react-native";
import { useNavigation } from '@react-navigation/native';

import theme from "../../theme";

import { updateSplash } from "./SplashscreenActions";

const SplashScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const displaySplash = useSelector(state => state.SplashScreenReducer.displaySplash)


    useEffect(() => {
        setTimeout(() => {
            dispatch(updateSplash(false))
        }, 5000)
    }, [])

    return(
        <View style={{flex: 1, backgroundColor: theme.colors.primaryColor}}>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text style={{color: theme.colors.secondaryColor}}>Splash Screen</Text>
            </View>
        </View>
    )
}

export default SplashScreen