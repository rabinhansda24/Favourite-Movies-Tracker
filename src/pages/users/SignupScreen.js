import React, {useEffect, useState, useContext} from "react";
import { View, Text, TouchableOpacity, TextInput, Image, Keyboard } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import theme from "../../theme";

import Icon from "../../components/Icon";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { ToastContext } from "../../components/Toast/ToastContext";

import { addUser } from "./UsersActions";

const SignupScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const isUserSignedIn = useSelector(state => state.usersReducer.isUserSignedIn)
    const {Toast} = useContext(ToastContext)
    
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

    const onPressSignup = () => {
        let payload = {
            userName: userName,
            password: password
        }
        dispatch(addUser(payload))
        Toast({message: "Signup success.", type: "success"})
        //navigation.pop()
    }

    return(
        <View style={{flex: 1}}>
            <View style={{height: hp(20), backgroundColor: theme.colors.primaryColor}}>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Text style={{color: theme.colors.white, fontFamily: theme.fonts.medium, fontSize: 24}}>SIGN UP</Text>
                </View>
            </View>
            <View style={{marginTop: hp(10), paddingHorizontal: wp(15)}}>
                
                <InputField placeholder="Username" onChange={onUsernameChange} iconName="user" iconType="AntDesign" value={userName} />
                <InputField placeholder="Password" onChange={onPasswordChange} iconName="user-o" iconType="FontAwesome" value={password} />
                <View style={{marginVertical: hp(2)}}>
                    <Button text="SIGN UP" onPress={onPressSignup} />
                </View>
                <View style={{marginVertical: hp(3)}}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <Text>Back to</Text>
                        <TouchableOpacity
                            style={{paddingLeft: wp(2)}}
                            onPress={() => {
                                navigation.pop()
                            }}
                        >
                            <Text style={{color: theme.colors.primaryColor}}>Signin</Text>
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

export default SignupScreen