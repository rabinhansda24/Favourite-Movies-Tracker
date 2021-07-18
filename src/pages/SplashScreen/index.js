import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, } from "react-native";
import { useNavigation } from '@react-navigation/native';

import theme from "../../theme";

import { updateSplash } from "./SplashscreenActions";

import { setAPIToken } from "../../API";

const SplashScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const displaySplash = useSelector(state => state.SplashScreenReducer.displaySplash)
    const authToken = useSelector(state => state.usersReducer.authToken)


    useEffect(() => {
        setTimeout(() => {
            dispatch(updateSplash(false))
        }, 5000)
        if(authToken !== "") {
            setAPIToken(authToken)
        }
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