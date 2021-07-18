import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


import theme from "../theme";

import Icon from "./Icon";

const InputField = (props) => {
    const { iconName, iconType, onChange, value, placeholder } = props

    const onChangeText = (value) => {
        onChange(value)
    }


    return(
        <View style={{flexDirection: "row", alignItems: "center", borderBottomWidth: .5, borderBottomColor: theme.colors.devider, marginVertical: hp(2)}}>
            { 
                iconName ? <Icon type={iconType ? iconType : "AntDesign"} name={iconName} size={18} color={theme.colors.primaryColor} /> 
                :
                null
            }
            <TextInput style={{paddingLeft: wp(2)}} placeholder={placeholder || ""} onChangeText={onChangeText} />
        </View>
    )
}

export default InputField
