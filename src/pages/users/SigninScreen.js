import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, Keyboard } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import theme from "../../theme";

import Icon from "../../components/Icon";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

import { updateUserSignin, updateAuthToken } from "./UsersActions";
import { updateSplash } from "../SplashScreen/SplashscreenActions";

import { ToastContext } from "../../components/Toast/ToastContext";

import { setAPIToken } from "../../API";

const SigninScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const isUserSignedIn = useSelector(state => state.usersReducer.isUserSignedIn)
    const user = useSelector(state => state.usersReducer.user)
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const {Toast} = useContext(ToastContext)

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [])

    const onUsernameChange = (value) => {
        setUserName(value)
    }
    const onPasswordChange = (value) => {
        setPassword(value)
    }

    const onPressLogin = () => {
        if (userName !== "" && password !== "") {
            if (userName === user.userName && password === user.password) {
                dispatch(updateAuthToken("Wookie2019"))
                dispatch(updateSplash(false))
                setAPIToken("Wookie2019")
                dispatch(updateUserSignin(true))
            } else {
                Toast({message: "Please check your username or password and try again.", type: "error"})
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: hp(20), backgroundColor: theme.colors.primaryColor }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: theme.colors.white, fontFamily: theme.fonts.medium, fontSize: 24 }}>SIGN IN</Text>
                </View>
            </View>
            <View style={{ marginTop: hp(10), paddingHorizontal: wp(15) }}>

                <InputField placeholder="Username" onChange={onUsernameChange} iconName="user" iconType="AntDesign" value={userName} />
                <InputField placeholder="Password" onChange={onPasswordChange} iconName="user-o" iconType="FontAwesome" value={password} />
                <View style={{ marginVertical: hp(2) }}>
                    <Button text="SIGN IN" onPress={onPressLogin} />
                </View>
                <View style={{ marginVertical: hp(3) }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Text>Don't have account with us yet?</Text>
                        <TouchableOpacity
                            style={{ paddingLeft: wp(2) }}
                            onPress={() => {
                                navigation.navigate("Signup")
                            }}
                        >
                            <Text style={{ color: theme.colors.primaryColor }}>Click here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                !isKeyboardVisible ? <View style={{ position: "absolute", bottom: -150, right: -150 }}>
                    <Image source={require("../../assets/blob3.png")} resizeMode="contain" />
                </View>
                :
                null
            }
            
        </View>
    )
}

export default SigninScreen