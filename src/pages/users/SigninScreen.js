import React, {useEffect} from "react";
import { View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";

import theme from "../../theme";

import { updateUserSignin } from "./UsersActions";

const SigninScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const isUserSignedIn = useSelector(state => state.usersReducer.isUserSignedIn)

    useEffect(() => {
        setTimeout(() => {
            dispatch(updateUserSignin(true))
        }, 5000)
    }, [])

    return(
        <View style={{flex: 1}}>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text>Signin Screen</Text>
            </View>
        </View>
    )
}

export default SigninScreen